import React from 'react';
import PropTypes from 'prop-types';
import { CONFIRMATION_STATUS } from 'constants/auth';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';

import './ConfirmRegistration.styles.less';

const ConfirmRegistration = ({ registrationStatus }) => {
  const { t } = useTranslation();

  return (
    <div className="confirm-reg">
      {!registrationStatus && (
        <>
          <Spinner />
          <div className="confirm-reg__text">{t('confirm:registration.processing')}</div>
        </>
      )}
      {registrationStatus === CONFIRMATION_STATUS.SUCCESS && (
        <div className="confirm-reg__done">{t('confirm:success')}</div>
      )}
      {registrationStatus === CONFIRMATION_STATUS.ERROR && (
        <div className="confirm-reg__block">{t('confirm:error')}</div>
      )}
    </div>
  );
};

ConfirmRegistration.propTypes = {
  registrationStatus: PropTypes.string,
};

ConfirmRegistration.defaultProps = {
  registrationStatus: '',
};

export default ConfirmRegistration;
