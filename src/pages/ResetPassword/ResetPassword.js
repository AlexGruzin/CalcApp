import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { emailValidation, getErrorMsgByResponse } from 'helpers/validation/auth';
import Button from 'components/Button';

import CustomInput from 'components/CustomInput';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from 'constants/routing';

import './ResetPassword.styles.less';

const ResetPassword = ({ t, sendEmailResetPassword }) => {
  const { register, handleSubmit: handleSubmitForm, errors } = useForm({ mode: 'onChange', shouldUnregister: true });
  const [email, setEmail] = useState('');
  const [authorizationErrorMsg, setAuthorizationErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const routeBack = params.get('routeBack');

  const onChangeEmail = e => {
    setEmail(e.target.value);
    setAuthorizationErrorMsg('');
  };

  const handleSubmit = () => {
    setIsLoading(true);
    sendEmailResetPassword(email)
      .then(res => {
        if (!res.error) {
          setIsSuccess(true);
        } else {
          const message = getErrorMsgByResponse(res.payload);
          setAuthorizationErrorMsg(t(message));
        }
      })
      .catch(e => e);
    setIsLoading(false);
  };

  return (
    <div className="reset-page">
      <img className="reset-page__logo" src="/svg/logo.svg" alt="Calc logo" />
      <div className="reset-page__content">
        <form onSubmit={handleSubmitForm(handleSubmit)} name="reset-password-form" className="reset-page__form">
          {isLoading && 'Loading...'}
          {isSuccess && (
            <div className="reset-page__success-block">
              <h2 className="reset-page__welcome">{t('resetPassword:sent')}</h2>
              <h5 className="reset-page__success-line">{t('resetPassword:visitMail')}</h5>
              <h5 className="reset-page__success-line email">{email}</h5>
              <h5 className="reset-page__success-line">{t('auth:signUpForm.complete')}</h5>
              <div className="reset-page__success-actions">
                <button type="button" className="reset-page__success-link" onClick={() => setIsSuccess(false)}>
                  {t('auth:resend')}
                </button>
              </div>
            </div>
          )}
          {!isSuccess && (
            <>
              <h1 className="reset-page__welcome">{[`${t('resetPassword:welcome')}`, <span key="dot">.</span>]}</h1>
              <h5 className="reset-page__description">{t('resetPassword:description')}</h5>

              <CustomInput
                onChange={onChangeEmail}
                type="email"
                name="email"
                ref={register(emailValidation())}
                className="reset-page__password"
                placeholder={t('auth:emailAddress')}
                isError={!!errors.email || !!authorizationErrorMsg}
                required
              />
              <Button className="reset-page__submit" type="submit" title={t('resetPassword:submit')} />
              <p className="reset-page__error">{errors.email?.message || authorizationErrorMsg}</p>
              <Link className="reset-page__home-link" to={routeBack || ROUTES.LOG_IN}>
                {t('resetPassword:back')}
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  t: PropTypes.func.isRequired,
  sendEmailResetPassword: PropTypes.func.isRequired,
};

export default ResetPassword;
