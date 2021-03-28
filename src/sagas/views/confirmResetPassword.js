import { all, put, race, take, takeEvery } from 'redux-saga/effects';

import ActionsTypes from 'sagas/actionTypes/confirmResetPassword';
import { resetPassword } from 'sagas/actions/confirmResetPassword';
import { formatConfirmPassword } from 'formatters/confirmations';
import * as Routing from 'constants/routing';

export function* confirmResetPasswordWorker({ payload }) {
  const resetPasswordCode = new URLSearchParams(window.location.search).get('code');

  const formattedData = formatConfirmPassword({ password: payload, resetPasswordCode });
  yield put(resetPassword(formattedData));

  const { success } = yield race({
    success: take(ActionsTypes.RESET_PASSWORD_SUCCESS),
    error: take(ActionsTypes.RESET_PASSWORD_FAILURE),
  });

  if (success) window.location.href = Routing.LOG_IN;
}

function* requestResetPasswordWatcher() {
  yield takeEvery(ActionsTypes.INIT_REQUEST_CONFIRM_RESET_PASSWORD, confirmResetPasswordWorker);
}

export default function* confirmResetPasswordSaga() {
  yield all([requestResetPasswordWatcher()]);
}
