import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { passwordValidation } from 'helpers/validation/auth';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';

import './ConfirmResetPassword.styles.less';

const ConfirmResetPassword = ({ confirmPassword }) => {
  const { t } = useTranslation();
  const { register, handleSubmit: handleSubmitForm, errors } = useForm({ mode: 'onChange', shouldUnregister: true });
  const [password, setPassword] = useState({});

  const handleSubmit = () => {
    confirmPassword(password);
  };

  const onChangeField = useCallback(e => {
    const { value } = e.target;
    setPassword(value);
  }, []);

  const validationErrorMsg = errors[Object.keys(errors)[0]]?.message;

  return (
    <div className="confirm-psw">
      <img className="confirm-psw__logo" src="/svg/logo.svg" alt="Calc logo" />
      <div className="confirm-psw__content">
        <form onSubmit={handleSubmitForm(handleSubmit)} name="confirm-psw-form" className="confirm-psw__form">
          <CustomInput
            onChange={onChangeField}
            type="password"
            name="password"
            ref={register(passwordValidation())}
            className="confirm-psw__password"
            placeholder={t('confirm:reset.password')}
            isError={!!validationErrorMsg}
            errMessage={validationErrorMsg}
            required
          />
          <Button
            disabled={!!validationErrorMsg}
            className="confirm-psw__submit"
            type="submit"
            title={t('confirm:reset.confirm')}
          />
        </form>
      </div>
    </div>
  );
};

ConfirmResetPassword.propTypes = {
  confirmPassword: PropTypes.func.isRequired,
};

export default ConfirmResetPassword;
