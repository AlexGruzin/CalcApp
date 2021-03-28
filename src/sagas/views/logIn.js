import ActionTypes from 'sagas/actionTypes/logIn';
import { all, takeEvery, put, take, race } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as Routing from 'constants/routing';
import { ActionsCreators as AuthActions, ActionsTypes as AuthActionsTypes } from 'domains/auth';
import { getAccessToken, getRefreshToken } from 'helpers/services/storage';
import { isInIframe } from 'helpers/routing';

export function* successLogInWorker({ payload }) {
  const { refresh_token, access_token } = payload;

  yield put(AuthActions.storeTokens({ refresh_token, access_token }));

  yield put(AuthActions.getUserInfoByToken());
  const { success } = yield race({
    success: take(AuthActionsTypes.STORE_USER_DATA),
    error: take(AuthActionsTypes.USER_INFO_FAILURE),
  });
  if (success) {
    yield put(push(Routing.WELCOME_FIRST_TIME));
  }
}

export function* successLogInWatcher() {
  yield takeEvery(ActionTypes.LOG_IN_SUCCESS, successLogInWorker);
}

export function* initLogInPageWorker() {
  if (getAccessToken() && getRefreshToken()) {
    yield put(push(Routing.DASHBOARD));
  } else if (isInIframe()) {
    yield put(push(Routing.SHOPIFY_SIGNUP));
  }
}

export default function* logInPageSaga() {
  yield all([successLogInWatcher(), initLogInPageWorker()]);
}
