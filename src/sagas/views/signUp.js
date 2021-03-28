import ActionTypes from 'sagas/actionTypes/signUp';

import { all, takeEvery } from 'redux-saga/effects';

export function* successSignUpWorker() {
  // we are showing success screen
}

export function* successSignUpWatcher() {
  yield takeEvery(ActionTypes.SIGN_UP_SUCCESS, successSignUpWorker);
}

export default function* signUpPageSaga() {
  yield all([successSignUpWatcher()]);
}
