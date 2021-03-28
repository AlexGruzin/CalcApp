import { all, put, race, take, takeEvery } from 'redux-saga/effects';

import ActionsTypes from 'sagas/actionTypes/confirmUser';
import { confirmUser } from 'sagas/actions/confirmUser';
import { formatUser } from 'formatters/confirmations';
import * as Routing from 'constants/routing';

export function* confirmUserWorker({ payload }) {
  const invitedUserId = new URLSearchParams(window.location.search).get('invitedUserId');
  const email = new URLSearchParams(window.location.search).get('email');

  const formattedUser = formatUser({ ...payload, invitedUserId, email });
  yield put(confirmUser(formattedUser));

  const { success } = yield race({
    success: take(ActionsTypes.CONFIRM_USER_SUCCESS),
    error: take(ActionsTypes.CONFIRM_USER_FAILURE),
  });

  if (success) {
    window.location.href = Routing.LOG_IN;
  }
}

function* requestNewUserWatcher() {
  yield takeEvery(ActionsTypes.INIT_REQUEST_CONFIRM_USER, confirmUserWorker);
}

export default function* confirmUserSaga() {
  yield all([requestNewUserWatcher()]);
}
