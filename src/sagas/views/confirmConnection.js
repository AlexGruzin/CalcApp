import { all, put, race, take, call, delay } from 'redux-saga/effects';
import queryString from 'query-string';
import { isJson } from 'helpers/generic';
import {
  formatGoogleConnectData,
  formatShopifyConnectData,
  formatFacebookConnectData,
  formatInstagramConnectData,
} from 'formatters/connections';
import { finishConnectSuccsess, finishConnectFail } from 'sagas/actions/confirmConnection';
import { ActionsTypes as AuthActionsTypes, ActionsCreators as AuthActions } from 'domains/auth';
import { ActionsCreators as ConnectActions, ActionsTypes as ConnectActionTypes } from 'domains/connections';
import { DELAY_TO_SEE_AND_READ_REQUEST_STATUS } from 'constants/auth';
import { ADVERT } from 'constants/advertisment';
import { closeThisTab } from 'helpers/routing';

export function* connectShopify(data) {
  yield put(ConnectActions.postShopifyOauthData(data));

  const { success, error } = yield race({
    success: take(ConnectActionTypes.POST_SHOPIFY_CONNECT_SUCCESS),
    error: take(ConnectActionTypes.POST_SHOPIFY_CONNECT_FAILURE),
  });
  return { success, error };
}

export function* connectGoogleAds(data) {
  yield put(ConnectActions.postGoogleAdsOauthData(data));

  const { success, error } = yield race({
    success: take(ConnectActionTypes.POST_GOOGLE_ADS_CONNECT_SUCCESS),
    error: take(ConnectActionTypes.POST_GOOGLE_ADS_CONNECT_FAILURE),
  });
  return { success, error };
}

export function* connectGoogleAnalytics(data) {
  yield put(ConnectActions.postGoogleAnalyticsOauthData(data));

  const { success, error } = yield race({
    success: take(ConnectActionTypes.POST_GOOGLE_ANALYTICS_CONNECT_SUCCESS),
    error: take(ConnectActionTypes.POST_GOOGLE_ANALYTICS_CONNECT_FAILURE),
  });
  return { success, error };
}

export function* connectFacebook(data) {
  yield put(ConnectActions.postFacebookOauthData(data));

  const { success, error } = yield race({
    success: take(ConnectActionTypes.POST_FACEBOOK_CONNECT_SUCCESS),
    error: take(ConnectActionTypes.POST_FACEBOOK_CONNECT_FAILURE),
  });
  return { success, error };
}

export function* connectInstagram(data) {
  yield put(ConnectActions.postFacebookOauthData(data)); // instagram and facebook share same app

  const { success, error } = yield race({
    success: take(ConnectActionTypes.POST_INSTAGRAM_CONNECT_SUCCESS),
    error: take(ConnectActionTypes.POST_INSTAGRAM_CONNECT_FAILURE),
  });
  return { success, error };
}

export function* initConfirmConnectionWorker() {
  yield put(AuthActions.getUserInfoByToken());
  yield race({
    success: take(AuthActionsTypes.STORE_USER_DATA),
    error: take(AuthActionsTypes.USER_INFO_FAILURE),
  });

  const parsedQuery = queryString.parse(window.location.search);

  let connectionType = parsedQuery.state;
  const possibleObject = isJson(parsedQuery.state);
  if (possibleObject) {
    connectionType = possibleObject.type; // way to send extra data through Oauth2
  }

  let result;
  switch (connectionType) {
    case ADVERT.SHOPIFY: {
      result = yield call(connectShopify, formatShopifyConnectData(parsedQuery));
      break;
    }
    case ADVERT.GOOGLE_ADS: {
      result = yield call(connectGoogleAds, formatGoogleConnectData(parsedQuery));
      break;
    }
    case ADVERT.GOOGlE_ANALYTICS: {
      result = yield call(connectGoogleAnalytics, formatGoogleConnectData(parsedQuery));
      break;
    }
    case ADVERT.FACEBOOK: {
      result = yield call(connectFacebook, formatFacebookConnectData(parsedQuery));
      break;
    }
    case ADVERT.INSTAGRAM: {
      result = yield call(connectInstagram, formatInstagramConnectData(parsedQuery));
      break;
    }
    default: {
      result = { error: 1 };
    }
  }
  const { success } = result;

  if (success) {
    localStorage.setItem('recentlyConnected', parsedQuery.state);
    if (parsedQuery.state === ADVERT.GOOGlE_ANALYTICS || parsedQuery.state === ADVERT.GOOGLE_ADS) {
      localStorage.setItem('ga_tkn', success.payload.access_token);
    }
    yield put(finishConnectSuccsess());
    yield delay(DELAY_TO_SEE_AND_READ_REQUEST_STATUS);
    closeThisTab();
  } else {
    yield put(finishConnectFail());
    yield delay(DELAY_TO_SEE_AND_READ_REQUEST_STATUS);
    closeThisTab();
  }
}

export default function* confirmConnectionSaga() {
  yield all([initConfirmConnectionWorker()]);
}
