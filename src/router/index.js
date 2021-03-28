import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Routes from 'constants/routing';
import Spinner from 'components/Spinner';

// views
const LogIn = React.lazy(() => import('pages/LogIn'));
const SignUp = React.lazy(() => import('pages/SignUp'));
const ResetPassword = React.lazy(() => import('pages/ResetPassword'));
const Dashboard = React.lazy(() => import('pages/Dashboard'));
const Audit = React.lazy(() => import('pages/Audit'));
const Forecast = React.lazy(() => import('pages/Forecast'));
const Campaigns = React.lazy(() => import('pages/Campaigns'));
const Settings = React.lazy(() => import('pages/Settings'));
const ConfirmOauth = React.lazy(() => import('pages/ConfirmConnection'));
const ConfirmRegistration = React.lazy(() => import('pages/ConfirmRegistration'));
const ConfirmUser = React.lazy(() => import('pages/ConfirmUser'));
const ConfirmPassword = React.lazy(() => import('pages/ConfirmResetPassword'));
const ConfirmEmailChange = React.lazy(() => import('pages/ConfirmEmailChange'));
const AuditDashboard = React.lazy(() => import('pages/AuditDashboard'));
const Loader = React.lazy(() => import('pages/Loader'));
const ShopifySignup = React.lazy(() => import('pages/ShopifySignup'));
const ConfirmShopifySignUp = React.lazy(() => import('pages/ConfirmShopifySignup'));
const Survey = React.lazy(() => import('pages/Survey'));
const Welcome = React.lazy(() => import('pages/Welcome'));

const Router = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route exact path={Routes.LOG_IN} component={LogIn} />
      <Route exact path={Routes.SIGN_UP} component={SignUp} />
      <Route exact path={Routes.RESET_PASSWORD} component={ResetPassword} />
      <Route exact path={Routes.DASHBOARD} component={Dashboard} />
      <Route exact path={Routes.AUDIT} component={Audit} />
      <Route exact path={Routes.AUDIT_DASHBOARD} component={AuditDashboard} />
      <Route exact path={Routes.FORECAST} component={Forecast} />
      <Route exact path={Routes.SETTINGS} component={Settings} />
      <Route exact path={Routes.CONFIRM_OAUTH} component={ConfirmOauth} />
      <Route exact path={Routes.CAMPAIGNS} component={Campaigns} />
      <Route exact path={Routes.CONFIRM_SIGN_UP} component={ConfirmRegistration} />
      <Route exact path={Routes.CONFIRM_USER} component={ConfirmUser} />
      <Route exact path={Routes.CONFIRM_PASSWORD} component={ConfirmPassword} />
      <Route exact path={Routes.CONFIRM_EMAIL_CHANGE} component={ConfirmEmailChange} />
      <Route exact path={Routes.LOADER} component={Loader} />
      <Route exact path={Routes.SHOPIFY_SIGNUP} component={ShopifySignup} />
      <Route exact path={Routes.CONFIRM_SHOPIFY_SIGNUP} component={ConfirmShopifySignUp} />
      <Route exact path={Routes.SURVEY} component={Survey} />
      <Route exact path={Routes.WELCOME} component={Welcome} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  </Suspense>
);

export default Router;
