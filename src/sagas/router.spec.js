import { call, fork, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { LOCATION_CHANGE } from 'connected-react-router';
import auditPageSaga from 'sagas/views/audit';
import { checkRedirectIsAllowed, onChange, routerChangeWatcher } from './router';
import initializeSaga from './initialize';

const defaultAction = {
  payload: {
    location: {
      hash: '',
      pathname: '/audit',
      search: '',
    },
  },
};

describe('onChange worker tests', () => {
  it('call onChange saga, Initilize should be called', () => {
    const gen = cloneableGenerator(onChange)(defaultAction);

    const check = gen.next().value;

    expect(check).toEqual(call(initializeSaga));
  });

  it('call checkRedirectIsAllowed saga, route check should be called', () => {
    const gen = cloneableGenerator(onChange)(defaultAction);

    gen.next();
    const check = gen.next().value;

    expect(check).toEqual(call(checkRedirectIsAllowed, defaultAction.payload.location.pathname));
  });

  it('fork task for /audit page', () => {
    const gen = cloneableGenerator(onChange)(defaultAction);

    gen.next();
    gen.next();
    const task = gen.next().value;

    expect(task).toEqual(
      fork(auditPageSaga, defaultAction.payload.location.search, defaultAction.payload.location.hash)
    );
  });

  it('check task canceled on unknown route', () => {
    const action = {
      payload: {
        location: {
          hash: '',
          pathname: 'unknown',
          search: '',
        },
      },
    };
    const gen = cloneableGenerator(onChange)(action);

    gen.next();
    gen.next();
    const task = gen.next().value;

    expect(task).toBeUndefined();
  });
});

describe('locationChangeWatcher', () => {
  it('should take every LOCATION_CHANGE action', () => {
    const generator = routerChangeWatcher();
    const result = generator.next().value;
    expect(result).toEqual(takeEvery(LOCATION_CHANGE, onChange));
  });
});
