import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { requestLogout, storeUserData } from './actions';

import { handleLogOutWorker, getUserInfoByTokenWorker } from './saga';

describe('Generic `auth` tests ', () => {
  it('handleLogOutWorker logs out user', () => {
    const gen = cloneableGenerator(handleLogOutWorker)();
    const result = gen.next().value;
    expect(result).toEqual(put(requestLogout()));
  });

  it('getUserInfoByTokenWorker success', () => {
    const gen = cloneableGenerator(getUserInfoByTokenWorker)();
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual(put(storeUserData()));
  });

  it('getUserInfoByTokenWorker error', () => {
    const gen = cloneableGenerator(getUserInfoByTokenWorker)();
    gen.next();
    gen.next();
    const result = gen.next({ error: {} }).done;
    expect(result).toEqual(true);
  });
});
