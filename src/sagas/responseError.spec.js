import { takeEvery, all, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import CallApiActionTypes from 'sagas/actionTypes/callApi';
import { ActionsCreators as AuthActions } from 'domains/auth';
import * as Routing from 'constants/routing';
import responseErrorSagaWatcher, { handleResponseErrorWatcher, handleResponseErrorWorker } from './responseError';

describe('Response error watchers tests', () => {
  it('Should init all watchers ', () => {
    const gen = cloneableGenerator(responseErrorSagaWatcher)();
    const result = gen.next().value;
    expect(result).toEqual(all([handleResponseErrorWatcher()]));
  });

  it('Should watch for Response Error action ', () => {
    const gen = cloneableGenerator(handleResponseErrorWatcher)();
    const result = gen.next().value;
    expect(result).toEqual(takeEvery(CallApiActionTypes.REQUEST_FAILED, handleResponseErrorWorker));
  });

  it('Should clear tokens when 401 status met', () => {
    const gen = cloneableGenerator(handleResponseErrorWorker)({ payload: { response: { payload: { status: 401 } } } });
    const result = gen.next().value;
    expect(result).toEqual(put(AuthActions.userForceLogout()));
  });

  it('Should not redirect when 401 status met, on "allowed" pages', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      pathname: Routing.RESET_PASSWORD,
    };

    const gen = cloneableGenerator(handleResponseErrorWorker)({ payload: { response: { payload: { status: 401 } } } });
    gen.next();
    const result = gen.next().done;
    expect(result).toEqual(true);
    expect(global.window.location.pathname).toEqual(Routing.RESET_PASSWORD);
  });
});
