import { all, takeEvery, put } from 'redux-saga/effects';
import * as Routes from 'constants/routing';
import CallApiActionTypes from 'sagas/actionTypes/callApi';
import { CODES } from 'constants/request';
import { ROUTES_FULLY_ACCESSIBLE } from 'constants/routing';

import { ActionsCreators as AuthActions } from 'domains/auth';

export function* handleResponseErrorWorker({ payload: { response } }) {
  const status = response?.payload?.status;
  switch (true) {
    case status === CODES.UNAUTHORIZED: {
      yield put(AuthActions.userForceLogout());
      if (!ROUTES_FULLY_ACCESSIBLE.includes(window.location.pathname)) {
        window.location.href = Routes.LOG_IN;
      }
      break;
    }
    default: {
      break;
    }
  }
}

export function* handleResponseErrorWatcher() {
  yield takeEvery(CallApiActionTypes.REQUEST_FAILED, handleResponseErrorWorker);
}

export default function* responseErrorSagaWatcher() {
  yield all([handleResponseErrorWatcher()]);
}
