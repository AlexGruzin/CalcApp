import { put, take, race, all, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { ActionsTypes as AuthActionsTypes } from 'domains/auth';
import * as Routing from 'constants/routing';
import { push } from 'connected-react-router';
import ActionTypes from 'sagas/actionTypes/logIn';
import logInPageSaga, { successLogInWorker, successLogInWatcher, initLogInPageWorker } from './logIn';

const payload = {
  refresh_token: '',
  access_token: '',
  roles: '',
};

describe('LogIn logic tests', () => {
  let globGen;
  beforeAll(() => {
    globGen = cloneableGenerator(successLogInWorker)({ payload });
    globGen.next(); // store tokens
    globGen.next(); // request user data
  });

  it('successLogInWorker user stored', () => {
    const gen = globGen.clone();
    const result = gen.next().value; // wait for user data stored or error
    expect(result).toEqual(
      race({
        success: take(AuthActionsTypes.STORE_USER_DATA),
        error: take(AuthActionsTypes.USER_INFO_FAILURE),
      })
    );
  });

  it.skip('successLogInWorker user redirect', () => {
    const gen = globGen.clone();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual(put(push(Routing.WELCOME_FIRST_TIME)));
  });

  // TODO add tests to check if survey stored when api appears
});

describe('LogIn generators tests', () => {
  it('should call all watchers and init.', () => {
    const gen = cloneableGenerator(logInPageSaga)();
    const result = gen.next().value;
    expect(result).toEqual(all([successLogInWatcher(), initLogInPageWorker()]));
  });

  it('should watch for successLogIn action.', () => {
    const generator = cloneableGenerator(successLogInWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.LOG_IN_SUCCESS, successLogInWorker));
  });
});
