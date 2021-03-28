import { call, race, put, take } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as Routing from 'constants/routing';
import { ActionsTypes as AuthActionsTypes } from 'domains/auth';
import * as Storage from 'helpers/services/storage';

import { push } from 'connected-react-router';
import initializeSaga, { authorizeUserSaga } from './initialize';

jest.mock('helpers/services/storage');

describe('Initilize logic tests', () => {
  it('Access token existing initializeSaga', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      pathname: Routing.PROFILE_BUILDER,
    };
    Storage.getAccessToken.mockReturnValue('1234');

    const gen = cloneableGenerator(initializeSaga)();
    gen.next();
    const result = gen.next(true).done;
    expect(result).toEqual(true);
  });

  it('Access token is missing, should authorise user', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      pathname: Routing.PROFILE_BUILDER,
    };
    Storage.getAccessToken.mockReturnValue('');

    const gen = cloneableGenerator(initializeSaga)();
    gen.next();
    const result = gen.next(true).value;
    expect(result).toEqual(call(authorizeUserSaga));
  });

  it('Redirect from home route', async () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      pathname: Routing.HOME,
    };

    const gen = cloneableGenerator(initializeSaga)();
    const result = gen.next().value;
    expect(result).toEqual(put(push(Routing.LOG_IN)));
  });
});

describe('authorizeUserSaga logic tests', () => {
  it('authorizeUserSaga should wait for user data stored or fail', () => {
    Storage.getAccessToken.mockReturnValue('1234');
    Storage.getRefreshToken.mockReturnValue('1234');

    const gen = cloneableGenerator(authorizeUserSaga)();
    gen.next();
    const result = gen.next().value;
    expect(result).toEqual(
      race({
        success: take(AuthActionsTypes.STORE_USER_DATA),
        error: take(AuthActionsTypes.USER_INFO_FAILURE),
      })
    );
  });
});
