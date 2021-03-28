import { LOCATION_CHANGE, push } from 'connected-react-router';
import { takeEvery, cancel, fork, all, call, select, put } from 'redux-saga/effects';
import { pathToRegexp } from 'path-to-regexp';
import find from 'lodash/find';
import { selectors as AuthSelectors } from 'domains/auth';
import { checkAvailabilityPathByRoles } from 'helpers/routing';

// constants
import * as Routing from 'constants/routing';
import { ROUTES_FULLY_ACCESSIBLE } from 'constants/routing';

// domains sagas

// view sagas
import signUp from './views/signUp';
import logIn from './views/logIn';
import confirmConnection from './views/confirmConnection';
import confirmRegistration from './views/confirmRegistration';
import confirmResetPassword from './views/confirmResetPassword';
import confirmUser from './views/confirmUser';
import confirmEmailChange from './views/confirmEmailChange';
import shopifySignUp from './views/shopifySignup';
import confirmShopifySignUp from './views/confirmShopifySignup';
import surveyPageSaga from './views/survey';
import auditDashboardPageSaga from './views/auditDashboard';
import auditPageSaga from './views/audit';

import initializeSaga from './initialize';
import settings from './views/settings';

const viewSagas = {
  [Routing.LOG_IN]: logIn,
  [Routing.SIGN_UP]: signUp,
  [Routing.SETTINGS]: settings,
  [Routing.CONFIRM_OAUTH]: confirmConnection,
  [Routing.CONFIRM_PASSWORD]: confirmResetPassword,
  [Routing.CONFIRM_SIGN_UP]: confirmRegistration,
  [Routing.CONFIRM_USER]: confirmUser,
  [Routing.CONFIRM_EMAIL_CHANGE]: confirmEmailChange,
  [Routing.SHOPIFY_SIGNUP]: shopifySignUp,
  [Routing.CONFIRM_SHOPIFY_SIGNUP]: confirmShopifySignUp,
  [Routing.AUDIT]: auditPageSaga,
  [Routing.AUDIT_DASHBOARD]: auditDashboardPageSaga,
  [Routing.SURVEY]: surveyPageSaga,
  [Routing.AUDIT]: auditPageSaga,
};

export function* checkRedirectIsAllowed(targetRoute) {
  const isAuthorized = yield select(AuthSelectors.isAuthorized);
  if (!isAuthorized) {
    if (ROUTES_FULLY_ACCESSIBLE.includes(targetRoute)) return;
    yield put(push(Routing.LOG_IN));
    return;
  }

  const userRoles = yield select(AuthSelectors.userRole);

  const { error } = checkAvailabilityPathByRoles(targetRoute, userRoles);

  if (error) {
    yield put(push(Routing.FORBIDDEN));
  }
}

let task = null;
export function* onChange(action) {
  const { hash, pathname, search } = action.payload.location;

  yield call(initializeSaga);
  yield call(checkRedirectIsAllowed, pathname);

  if (task) {
    yield cancel(task);
  }
  const taskRoute = find(Object.keys(viewSagas), path => pathname.match(pathToRegexp(path)));

  if (taskRoute) {
    task = yield fork(viewSagas[taskRoute], search, hash);
  }
}

export function* routerChangeWatcher() {
  yield takeEvery(LOCATION_CHANGE, onChange);
}

export default function* routerSaga() {
  yield all([routerChangeWatcher()]);
}
