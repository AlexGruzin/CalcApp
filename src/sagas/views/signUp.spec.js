import { all, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import ActionTypes from 'sagas/actionTypes/signUp';
import signUpPageSaga, { successSignUpWorker, successSignUpWatcher } from './signUp';

describe('SignUp generators tests', () => {
  it('should call all watchers and init.', () => {
    const gen = cloneableGenerator(signUpPageSaga)();
    const result = gen.next().value;
    expect(result).toEqual(all([successSignUpWatcher()]));
  });

  it('should watch for successSignUp action.', () => {
    const generator = cloneableGenerator(successSignUpWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.SIGN_UP_SUCCESS, successSignUpWorker));
  });
});
