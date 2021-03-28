import { all, takeEvery, put, race, take } from 'redux-saga/effects';
import { makeRequest } from 'sagas/actions/callApi';
import { push } from 'connected-react-router';
import * as Routing from 'constants/routing';
import ActionTypes from './actionTypes';
// import { setCookie } from 'helpers/cookies';
import { requestLogout, storeUserData, userInfo } from './actions';
// import { EXPIRE_DEFAULT } from 'constants/envConstants';

export function* handleLogOutWorker() {
  yield put(requestLogout());

  // TODO swap with cookie when EXPIRE_DEFAULT would be defined
  // document.cookie = `${access_token}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  // document.cookie = `${refresh_token}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  window.localStorage.setItem('access_token', '');
  window.localStorage.setItem('refresh_token', '');

  yield put(push(Routing.LOG_IN));
}

export function* handleForceLogOutWorker() {
  window.localStorage.setItem('access_token', '');
  window.localStorage.setItem('refresh_token', '');

  yield put(push(Routing.LOG_IN));
}

export function* handleStoreTokensWorker({ payload }) {
  const { access_token, refresh_token } = payload;

  // setCookie('access_token', access_token, EXPIRE_DEFAULT);
  // setCookie('refresh_token', refresh_token, EXPIRE_DEFAULT);

  window.localStorage.setItem('access_token', access_token);
  window.localStorage.setItem('refresh_token', refresh_token);
}

export function* getUserInfoByTokenWorker() {
  yield put(makeRequest(userInfo()));

  const { success } = yield race({
    success: take(ActionTypes.USER_INFO_SUCCESS),
    error: take(ActionTypes.USER_INFO_FAILURE),
  });

  if (success) {
    yield put(storeUserData(success.payload));
  }
}

export function* getUserInfoByTokenWatcher() {
  yield takeEvery(ActionTypes.INIT_USER_INFO_REQUEST, getUserInfoByTokenWorker);
}

export function* handleLogOutWatcher() {
  yield takeEvery(ActionTypes.LOG_OUT, handleLogOutWorker);
}

export function* handleForceLogOutWatcher() {
  yield takeEvery(ActionTypes.LOG_OUT_FORCE, handleForceLogOutWorker);
}

export function* handleStoreTokens() {
  yield takeEvery(ActionTypes.STORE_TOKENS, handleStoreTokensWorker);
}

export default function* authPageSaga() {
  yield all([handleLogOutWatcher(), handleForceLogOutWatcher(), handleStoreTokens(), getUserInfoByTokenWatcher()]);
}
