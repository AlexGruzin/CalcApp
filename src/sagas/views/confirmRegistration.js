import { all, put, race, take, delay } from 'redux-saga/effects';

import ActionsTypes from 'sagas/actionTypes/confirmRegistration';
import { confirmRegistration } from 'sagas/actions/confirmRegistration';
import { DELAY_TO_SEE_AND_READ_REQUEST_STATUS } from 'constants/auth';
import * as Routing from 'constants/routing';

export function* initConfirmRegistrationWorker() {
  const code = new URLSearchParams(window.location.search).get('code');

  yield put(confirmRegistration(code));

  yield race({
    success: take(ActionsTypes.CONFIRM_REGISTRATION_SUCCESS),
    error: take(ActionsTypes.CONFIRM_REGISTRATION_FAILURE),
  });

  yield delay(DELAY_TO_SEE_AND_READ_REQUEST_STATUS);
  window.location.href = Routing.LOG_IN;
}

export default function* confirmRegistrationSaga() {
  yield all([initConfirmRegistrationWorker()]);
}
