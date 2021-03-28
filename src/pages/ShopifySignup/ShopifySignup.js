import React from 'react';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';

import './ShopifySignup.styles.less';

const ShopifySignup = () => {
  const { t } = useTranslation();

  return (
    <div className="shopify-sup">
      <img className="shopify-sup__logo" src="/svg/logo.svg" alt="Calc_logo" />
      <div className="shopify-sup__content">
        <div className="shopify-sup__form">
          <h1 className="shopify-sup__welcome">{t('Welcome')}</h1>
          <Spinner />
          <h5 className="shopify-sup__description">{t('Signing you in...')}</h5>
        </div>
      </div>
    </div>
  );
};

export default ShopifySignup;
