import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Router from 'router';
import { useLocation } from 'react-router-dom';
import SideNavigation from 'components/SideNavigation';
import { HEADER_FREE_PAGES } from 'constants/auth';
import selector from './selector';

import './styles/index.less';

const App = () => {
  const { pathname } = useLocation();
  const isHeaderHidden = HEADER_FREE_PAGES.includes(pathname);

  return (
    <Fragment>
      {!isHeaderHidden && <SideNavigation />}
      <Router />
    </Fragment>
  );
};

export default connect(selector)(App);
