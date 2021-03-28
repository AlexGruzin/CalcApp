import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { emailValidation, passwordValidation, getErrorMsgByResponse } from 'helpers/validation/auth';
import { Link, useHistory } from 'react-router-dom';
import * as Routing from 'constants/routing';
import CustomInput from 'components/CustomInput';

import './LogInForm.styles.less';
import { formatLogInUser } from 'formatters/logIn';

const LogInForm = ({ t, switchTab, handleSubmit: handleSubmitRequest }) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange', shouldUnregister: true });
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [authorizationErrorMsg, setAuthorizationErrorMsg] = useState('');
  const history = useHistory();

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
    const loginData = formatLogInUser({ login, password });
    handleSubmitRequest(loginData)
      .then(res => {
        if (!res.error) {
          history.push(Routing.WELCOME_FIRST_TIME);
        } else {
          const message = getErrorMsgByResponse(res.payload);
          setAuthorizationErrorMsg(t(message));
          setIsLoading(false);
        }
      })
      .catch(e => e);
  };

  const validationErrorMsg = errors[Object.keys(errors)[0]]?.message;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} name="login-form" className="login-form">
      {isLoading && 'Loading...'}
      <h1 className="login-form__welcome">{t('auth:logIn')}</h1>
      <h5 className="login-form__description">{t('auth:description')}</h5>

      <CustomInput
        type="email"
        name="email"
        ref={register(emailValidation())}
        className="login-form__email"
        onChange={onChangeEmail}
        placeholder={t('auth:emailAddress')}
        isError={!!errors.email || !!authorizationErrorMsg}
        required
      />
      <CustomInput
        type="password"
        name="password"
        ref={register(passwordValidation())}
        className="login-form__password"
        onChange={onChangePassword}
        placeholder={t('auth:password')}
        isError={!!errors.password || !!authorizationErrorMsg}
        required
      />
      <Button className="login-form__submit" disabled={!!validationErrorMsg} type="submit" title={t('auth:logIn')} />
      <p className="login-form__error">{validationErrorMsg || authorizationErrorMsg}</p>
      <span className="login-form__forgot-password">
        {t('auth:forgot')}
        <Link to={Routing.RESET_PASSWORD} className="login-form__forgot-link">
          {t('auth:passwordReset')}
        </Link>
      </span>
      <span className="login-form__new-user">
        {t('auth:logInForm.newUser')}
        <Link className="login-form__signup-link" to={Routing.SIGN_UP} onClick={switchTab}>
          {t('auth:signUp')}
        </Link>
      </span>

      <span className="login-form__terms">
        {`${t('auth:termsDescriptionPartOne')} `}
        <Link to={Routing.TERMS_LINK}>{t('auth:terms')}</Link>
        {` ${t('auth:termsDescriptionPartTwo')} `}
        <Link to={Routing.PRIVACY_STATEMENT_LINK}>{t('auth:privacyStatement')}</Link>
      </span>
    </form>
  );
};

LogInForm.propTypes = {
  t: PropTypes.func.isRequired,
  switchTab: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

LogInForm.defaultProps = {
  switchTab: () => undefined,
};

export default LogInForm;
