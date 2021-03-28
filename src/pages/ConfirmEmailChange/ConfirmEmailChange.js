import React from 'react';
import PropTypes from 'prop-types';
import { CONFIRMATION_STATUS } from 'constants/auth';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';

import './ConfirmEmailChange.styles.less';

const ConfirmEmailChange = ({ emailChangeStatus }) => {
  const { t } = useTranslation();

  return (
    <div className="email-chn">
      {!emailChangeStatus && (
        <>
          <Spinner />
          <div className="email-chn__text">{t('confirm:email.processing')}</div>
        </>
      )}
      {emailChangeStatus === CONFIRMATION_STATUS.SUCCESS && (
        <div className="email-chn__done">{t('confirm:success')}</div>
      )}
      {emailChangeStatus === CONFIRMATION_STATUS.ERROR && <div className="email-chn__block">{t('confirm:error')}</div>}
    </div>
  );
};

ConfirmEmailChange.propTypes = {
  emailChangeStatus: PropTypes.string,
};

ConfirmEmailChange.defaultProps = {
  emailChangeStatus: '',
};

export default ConfirmEmailChange;
