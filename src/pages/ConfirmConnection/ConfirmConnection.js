import React from 'react';
import PropTypes from 'prop-types';
import { OAUTH_ACCESS_STATUS } from 'constants/connections';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';

import './ConfirmConnection.styles.less';

const ConfirmConnection = ({ integrationStatus }) => {
  const { t } = useTranslation();

  return (
    <div className="confirm-connection">
      {!integrationStatus && (
        <>
          <Spinner />
          <div className="confirm-connection__text">{t('confirm:connection.processing')}</div>
        </>
      )}
      {integrationStatus === OAUTH_ACCESS_STATUS.SUCCESS && (
        <div className="confirm-connection__done">{t('confirm:success')}</div>
      )}
      {integrationStatus === OAUTH_ACCESS_STATUS.ERROR && (
        <div className="confirm-connection__block">{t('confirm:error')}</div>
      )}
    </div>
  );
};

ConfirmConnection.propTypes = {
  integrationStatus: PropTypes.string,
};

ConfirmConnection.defaultProps = {
  integrationStatus: '',
};

export default ConfirmConnection;
