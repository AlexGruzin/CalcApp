import { cloneableGenerator } from '@redux-saga/testing-utils';
import { all, takeEvery } from 'redux-saga/effects';
import signUpPageSaga, { makeRequestWatcher, makeRequestWorker, makeUnsafeRequestWatcher } from 'sagas/callApi';
import ActionTypes from 'sagas/actionTypes/callApi';

describe('SignUp generators tests', () => {
  it('should call all watchers and init.', () => {
    const gen = cloneableGenerator(signUpPageSaga)();
    const result = gen.next().value;
    expect(result).toEqual(all([makeRequestWatcher(), makeUnsafeRequestWatcher()]));
  });

  it('should watch for make Request action.', () => {
    const generator = cloneableGenerator(makeRequestWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.MAKE_REQUEST, makeRequestWorker, false));
  });
});
