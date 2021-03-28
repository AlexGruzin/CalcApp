import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { emailValidation, passwordValidation, getErrorMsgByResponse } from 'helpers/validation/auth';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import CustomInput from 'components/CustomInput';
import { formatSignUpUser } from 'formatters/signUp';
import * as Routing from 'constants/routing';

import './SignUpForm.styles.less';

const SignUpForm = ({ switchTab, handleSubmit: handleSubmitRequest }) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange', shouldUnregister: true });
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [authorizationErrorMsg, setAuthorizationErrorMsg] = useState('');
  const { t } = useTranslation();

  const onChangeEmail = useCallback(e => {
    setLogin(e.target.value);
    setAuthorizationErrorMsg('');
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
    setAuthorizationErrorMsg('');
  }, []);

  const handleFormSubmit = () => {
    setIsLoading(true);
    const signUpUser = formatSignUpUser({ login, password });
    handleSubmitRequest(signUpUser)
      .then(res => {
        if (!res.error) {
          setIsSuccess(true);
        } else {
          const message = getErrorMsgByResponse(res.payload);
          setAuthorizationErrorMsg(t(message));
        }
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
    setIsLoading(false);
  };

  const validationErrorMsg = errors[Object.keys(errors)[0]]?.message;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} name="signup-form" className="signup-form">
      {isLoading && 'Loading...'}
      {isSuccess && (
        <div className="signup-form__success-block">
          <h2 className="signup-form__welcome">{t('auth:signUpForm.oneStep')}</h2>
          <h5 className="signup-form__success-line">{t('auth:signUpForm.visitMail')}</h5>
          <h5 className="signup-form__success-line email">{login}</h5>
          <h5 className="signup-form__success-line">{t('auth:signUpForm.complete')}</h5>
          <div className="signup-form__success-actions">
            <Link className="signup-form__success-link" to={Routing.LOG_IN}>
              {t('auth:logIn')}
            </Link>
            <button type="button" className="signup-form__success-link" onClick={() => setIsSuccess(false)}>
              {t('auth:back')}
            </button>
          </div>
        </div>
      )}
      {!isSuccess && (
        <>
          <h1 className="signup-form__welcome">{t('auth:welcome')}</h1>
          <h5 className="signup-form__description">{t('auth:createAccount')}</h5>

          <CustomInput
            type="email"
            name="email"
            ref={register(emailValidation())}
            className="signup-form__email"
            onChange={onChangeEmail}
            placeholder={t('auth:emailAddress')}
            isError={!!errors.email || !!authorizationErrorMsg}
            required
          />
          <CustomInput
            type="password"
            name="password"
            ref={register(passwordValidation())}
            className="signup-form__password"
            onChange={onChangePassword}
            placeholder={t('auth:password')}
            isError={!!errors.password || !!authorizationErrorMsg}
            required
          />
          <Button
            className="signup-form__submit"
            disabled={!!validationErrorMsg}
            type="submit"
            title={t('auth:signUp')}
          />
          <p className="signup-form__error">{validationErrorMsg || authorizationErrorMsg}</p>
          <span className="signup-form__login-user">
            {t('auth:signUpForm.haveAccount')}
            <Link className="signup-form__login-link" to={Routing.LOG_IN} onClick={switchTab}>
              {t('auth:logIn')}
            </Link>
          </span>
        </>
      )}
      <span className="signup-form__terms">
        {`${t('auth:termsDescriptionPartOneSign')} `}
        <Link to={Routing.TERMS_LINK}>{t('auth:terms')}</Link>
        {` ${t('auth:termsDescriptionPartTwo')} `}
        <Link to={Routing.PRIVACY_STATEMENT_LINK}>{t('auth:privacyStatement')}</Link>
      </span>
    </form>
  );
};

SignUpForm.propTypes = {
  switchTab: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

SignUpForm.defaultProps = {
  switchTab: () => undefined,
};

export default SignUpForm;
