import { put, call, all } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { ADVERT } from 'constants/advertisment';
import { formatShopifyConnectData } from 'formatters/connections';
import queryString from 'query-string';
import { finishConnectFail, finishConnectSuccsess } from 'sagas/actions/confirmConnection';
import * as Storage from 'helpers/services/storage';
import confirmConnectionSaga, {
  initConfirmConnectionWorker,
  connectShopify,
  connectGoogleAds,
  connectFacebook,
  connectGoogleAnalytics,
  connectInstagram,
} from './confirmConnection';

jest.mock('helpers/services/storage');

describe('LogIn logic tests', () => {
  it('connect Shopify call should happen', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      search: `code=123456&state=${ADVERT.SHOPIFY}`,
    };
    const parsedQuery = queryString.parse(window.location.search);

    const gen = cloneableGenerator(initConfirmConnectionWorker)();
    gen.next();
    gen.next(); // wait for data stored
    const result = gen.next().value;
    expect(result).toEqual(call(connectShopify, formatShopifyConnectData(parsedQuery)));
  });

  it('connect Shopify and put success', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      search: `code=123456&state=${ADVERT.SHOPIFY}`,
    };

    const gen = cloneableGenerator(initConfirmConnectionWorker)();
    gen.next();
    gen.next(); // wait for data stored
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual(put(finishConnectSuccsess()));
  });

  it('default case (parsedQuery.state is invalid)', () => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      search: `code=123456&state=invalid`,
    };

    const gen = cloneableGenerator(initConfirmConnectionWorker)();
    gen.next();
    gen.next(); // wait for data stored
    const result = gen.next().value;
    expect(result).toEqual(put(finishConnectFail()));
  });
});

describe('confirmConnection generators tests', () => {
  beforeAll(() => {
    Storage.getAccessToken.mockReturnValue('1234');
  });

  it('should call all watchers and init.', () => {
    const gen = confirmConnectionSaga();
    const result = gen.next().value;
    expect(result).toEqual(all([initConfirmConnectionWorker()]));
  });

  it('should connect Shopify, and return data.', () => {
    const gen = connectShopify({ id: 1 });
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual({ error: undefined, success: {} });
  });

  it('should connect GoogleAds, and return data.', () => {
    const gen = cloneableGenerator(connectGoogleAds)();
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual({ error: undefined, success: {} });
  });

  it('should connect google Analytics, and return data.', () => {
    const gen = cloneableGenerator(connectGoogleAnalytics)();
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual({ error: undefined, success: {} });
  });

  it('should connect Facebook, and return data.', () => {
    const gen = cloneableGenerator(connectFacebook)();
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual({ error: undefined, success: {} });
  });

  it('should connect Instagram, and return data.', () => {
    const gen = cloneableGenerator(connectInstagram)();
    gen.next();
    gen.next();
    const result = gen.next({ success: {} }).value;
    expect(result).toEqual({ error: undefined, success: {} });
  });
});
