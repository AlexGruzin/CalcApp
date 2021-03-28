import { all, takeEvery, put } from 'redux-saga/effects';
import ActionTypes from 'domains/connections/actionTypes';
import { SHOPIFY_CLIENT_ID, REDIRECT_URI, GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from 'constants/envConstants';
import { ADVERT } from 'constants/advertisment';
import { ActionsCreators as ConnectActions } from 'domains/connections';
import {
  FACEBOOK_SCOPE,
  GOOGLE_ADS_SCOPE,
  GOOGLE_ANALYTICS_SCOPE,
  INSTAGRAM_SCOPE,
  SHOPIFY_SCOPE,
} from 'constants/connections';

const openNewTab = url => {
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
};

export function* initShopifyWorker({ payload }) {
  const { storeName, accessToken } = payload;

  if (accessToken) {
    yield put(
      ConnectActions.postShopifyOauthData({ client_id: SHOPIFY_CLIENT_ID, access_token: accessToken, shop: storeName })
    );
  } else {
    openNewTab(
      `https://${storeName}.myshopify.com/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&` +
        `scope=${SHOPIFY_SCOPE}&redirect_uri=${REDIRECT_URI}&state=${ADVERT.SHOPIFY}`
    );
  }
}

export function* initGoogleAnalyticsWorker() {
  openNewTab(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&response_type=code&state=${ADVERT.GOOGlE_ANALYTICS}&` +
      `scope=${GOOGLE_ANALYTICS_SCOPE}&prompt=consent&access_type=offline&include_granted_scopes=true`
  );
}

export function* initGoogleAdsWorker() {
  openNewTab(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&response_type=code&state=${ADVERT.GOOGLE_ADS}&` +
      `scope=${GOOGLE_ADS_SCOPE}&prompt=consent&access_type=offline&include_granted_scopes=true`
  );
}

export function* initInstagramWorker() {
  // Graph Api related
  // TODO Article from guide could be shown as modal
  // https://developers.facebook.com/docs/instagram-api/overview
  openNewTab(
    `https://www.facebook.com/v8.0/dialog/oauth?scope=${INSTAGRAM_SCOPE}& +
  response_type=code&client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${ADVERT.INSTAGRAM}`
  );
}

export function* initFacebookWorker() {
  openNewTab(
    `https://www.facebook.com/v8.0/dialog/oauth?scopes=${FACEBOOK_SCOPE}&` +
      `response_type=code&client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${ADVERT.FACEBOOK}`
  );
}

export function* initShopifyWatcher() {
  yield takeEvery(ActionTypes.INIT_SHOPIFY_INTEGRATION, initShopifyWorker);
}

export function* initGoogleAnalyticsWatcher() {
  yield takeEvery(ActionTypes.INIT_GA_INTEGRATION, initGoogleAnalyticsWorker);
}

export function* initGoogleAdsWatcher() {
  yield takeEvery(ActionTypes.INIT_G_ADS_INTEGRATION, initGoogleAdsWorker);
}

export default function* connectionsDomainSaga() {
  yield all([initShopifyWatcher(), initGoogleAnalyticsWatcher(), initGoogleAdsWatcher()]);
}
