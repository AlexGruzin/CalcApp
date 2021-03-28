import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'router';
import { useLocation } from 'react-router-dom';
import SideNavigation from 'components/SideNavigation';
import { HEADER_FREE_PAGES } from 'constants/auth';
import { getSessionToken } from '@shopify/app-bridge-utils';
import { useAppBridge } from '@shopify/app-bridge-react';
import { storeSessionToken as storeSessionTokenRequest } from 'domains/auth/actions';
import selector from './selector';

import './styles/index.less';

const ShopifyApp = ({ storeSessionToken }) => {
  const { pathname } = useLocation();
  const isHeaderHidden = HEADER_FREE_PAGES.includes(pathname);
  const app = useAppBridge();

  useEffect(() => {
    const getToken = async () => {
      const sessionToken = await getSessionToken(app);
      storeSessionToken(sessionToken);
    };
    getToken();
  }, []);

  return (
    <Fragment>
      {!isHeaderHidden && <SideNavigation />}
      <Router />
    </Fragment>
  );
};

export default connect(selector, { storeSessionToken: storeSessionTokenRequest })(ShopifyApp);
