import { put, take, select, call, race } from 'redux-saga/effects';
import * as Routing from 'constants/routing';
import { getAccessToken, getRefreshToken } from 'helpers/services/storage';
import {
  ActionsCreators as AuthActions,
  ActionsTypes as AuthActionsTypes,
  selectors as AuthSelectors,
} from 'domains/auth';
import { push } from 'connected-react-router';

export function* authorizeUserSaga() {
  if (getAccessToken() && getRefreshToken()) {
    yield put(AuthActions.getUserInfoByToken());

    const { error } = yield race({
      success: take(AuthActionsTypes.STORE_USER_DATA),
      error: take(AuthActionsTypes.USER_INFO_FAILURE),
    });

    if (error) {
      // prevents blinking on CORS errors but also log outs
      window.localStorage.setItem('access_token', '');
      window.localStorage.setItem('refresh_token', '');
    }
  } else {
    yield put(AuthActions.userInfoRequestError());
  }
}

export default function* initializeSaga() {
  if (window.location.pathname === Routing.HOME) {
    yield put(push(Routing.LOG_IN));
    return;
  }

  if (window.location.pathname === Routing.SHOPIFY_SIGNUP) return;

  const accessToken = getAccessToken();
  const isAuthorized = yield select(AuthSelectors.isAuthorized);

  const isAuthorizationPassed = !!accessToken && isAuthorized;

  if (!isAuthorizationPassed) {
    yield call(authorizeUserSaga);
  }
}
