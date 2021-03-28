import { all, delay, put, race, take } from 'redux-saga/effects';

import ActionsTypes from 'sagas/actionTypes/confirmEmailChange';
import { confirmEmailChange } from 'sagas/actions/confirmEmailChange';
import * as Routing from 'constants/routing';
import { ActionsCreators as AuthActions } from 'domains/auth';
import { DELAY_TO_SEE_AND_READ_REQUEST_STATUS } from 'constants/auth';

export function* initConfirmEmailChangeWorker() {
  const code = new URLSearchParams(window.location.search).get('code');

  yield put(confirmEmailChange(code));

  const { success } = yield race({
    success: take(ActionsTypes.CONFIRM_EMAIL_CHANGE_SUCCESS),
    error: take(ActionsTypes.CONFIRM_EMAIL_CHANGE_FAILURE),
  });

  yield delay(DELAY_TO_SEE_AND_READ_REQUEST_STATUS);
  if (success) {
    yield put(AuthActions.userForceLogout());
    window.location.href = Routing.LOG_IN; // redirect user to login with new password
  } else {
    window.location.href = Routing.DASHBOARD;
  }
}

export default function* confirmEmailChangeSaga() {
  yield all([initConfirmEmailChangeWorker()]);
}
