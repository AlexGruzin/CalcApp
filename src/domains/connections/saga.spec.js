import { all, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import ActionTypes from './actionTypes';
import connectionsDomainSaga, {
  initShopifyWorker,
  initShopifyWatcher,
  initGoogleAnalyticsWatcher,
  initGoogleAdsWatcher,
  initGoogleAdsWorker,
  initGoogleAnalyticsWorker,
} from './saga';

describe('Connections generators tests', () => {
  it('should call all watchers and init.', () => {
    const gen = cloneableGenerator(connectionsDomainSaga)();
    const result = gen.next().value;
    expect(result).toEqual(all([initShopifyWatcher(), initGoogleAnalyticsWatcher(), initGoogleAdsWatcher()]));
  });

  it('should watch for connectShopify action.', () => {
    const generator = cloneableGenerator(initShopifyWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.INIT_SHOPIFY_INTEGRATION, initShopifyWorker));
  });

  it('should watch for connectGoogleAnalytics action.', () => {
    const generator = cloneableGenerator(initGoogleAnalyticsWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.INIT_GA_INTEGRATION, initGoogleAnalyticsWorker));
  });

  it('should watch for connectGoogleAds action.', () => {
    const generator = cloneableGenerator(initGoogleAdsWatcher)();
    const result = generator.next().value;

    expect(result).toEqual(takeEvery(ActionTypes.INIT_G_ADS_INTEGRATION, initGoogleAdsWorker));
  });
});

describe('Connections redirects to services tests', () => {
  const payload = {
    storeName: 'mystore',
  };

  it('initShopifyWorker redirect', () => {
    const gen = cloneableGenerator(initShopifyWorker)({ payload });
    const result = gen.next().done;
    expect(result).toEqual(true);
  });

  it('initGoogleAdsWorker redirect', () => {
    const gen = cloneableGenerator(initGoogleAdsWorker)();
    const result = gen.next().done;
    expect(result).toEqual(true);
  });

  it('initGoogleAnalyticsWorker redirect', () => {
    const gen = cloneableGenerator(initGoogleAnalyticsWorker)();
    const result = gen.next().done;
    expect(result).toEqual(true);
  });
});
