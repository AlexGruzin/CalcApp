import React from 'react';
import PropTypes from 'prop-types';
import { OAUTH_ACCESS_STATUS } from 'constants/connections';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';

import './ConfirmShopifySignup.styles.less';

const ConfirmShopifySignUp = ({ shopifySignUpStatus }) => {
  const { t } = useTranslation();

  return (
    <div className="shopify-cnf">
      {!shopifySignUpStatus && (
        <>
          <Spinner />
          <div className="shopify-cnf__text">{t('confirm:connection.processing')}</div>
        </>
      )}
      {shopifySignUpStatus === OAUTH_ACCESS_STATUS.SUCCESS && (
        <div className="shopify-cnf__done">{t('confirm:success')}</div>
      )}
      {shopifySignUpStatus === OAUTH_ACCESS_STATUS.ERROR && (
        <div className="shopify-cnf__block">{t('confirm:error')}</div>
      )}
    </div>
  );
};

ConfirmShopifySignUp.propTypes = {
  shopifySignUpStatus: PropTypes.string,
};

ConfirmShopifySignUp.defaultProps = {
  shopifySignUpStatus: '',
};

export default ConfirmShopifySignUp;
