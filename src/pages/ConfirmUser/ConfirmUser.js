import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { passwordValidation } from 'helpers/validation/auth';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import CustomInput from 'components/CustomInput';

import './ConfirmUser.styles.less';

const ConfirmUser = ({ confirmUser }) => {
  const { t } = useTranslation();
  const { register, handleSubmit: handleSubmitForm } = useForm({ mode: 'onChange', shouldUnregister: true });
  const [user, setUser] = useState({});
  const email = new URLSearchParams(window.location.search).get('email');

  const handleSubmit = () => {
    confirmUser(user);
  };

  const onChangeField = useCallback(e => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <div className="confirm-user">
      <img className="confirm-user__logo" src="/svg/logo.svg" alt="Calc logo" />
      <div className="confirm-user__content">
        <form onSubmit={handleSubmitForm(handleSubmit)} name="confirm-user-form" className="confirm-user__form">
          <CustomInput value={email} disabled type="email" name="email" className="confirm-user__field" />
          <CustomInput
            onChange={onChangeField}
            type="password"
            name="password"
            ref={register(passwordValidation())}
            className="confirm-user__field"
            placeholder={t('confirm:user.password')}
            required
          />
          <CustomInput
            onChange={onChangeField}
            type="text"
            name="firstName"
            className="confirm-user__field"
            placeholder={t('confirm:user.firstName')}
          />
          <CustomInput
            onChange={onChangeField}
            type="text"
            name="lastName"
            className="confirm-user__field"
            placeholder={t('confirm:user.lastName')}
          />
          <Button className="confirm-user__submit" type="submit" title={t('confirm:user.confirm')} />
        </form>
      </div>
    </div>
  );
};

ConfirmUser.propTypes = {
  confirmUser: PropTypes.func.isRequired,
};

export default ConfirmUser;
