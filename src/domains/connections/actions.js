import { createAction as createAPIAction } from 'redux-api-middleware';
import { createAction } from 'redux-actions';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { getAccessToken } from 'helpers/services/storage';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from './actionTypes';

export const integrateShopify = createAction(ActionTypes.INIT_SHOPIFY_INTEGRATION);
export const integrateGoogleAnalytics = createAction(ActionTypes.INIT_GA_INTEGRATION);
export const integrateGoogleAds = createAction(ActionTypes.INIT_G_ADS_INTEGRATION);
export const initFacebookIntegration = createAction(ActionTypes.POST_FACEBOOK_CONNECT_REQUEST);
export const initInstagramIntegration = createAction(ActionTypes.POST_INSTAGRAM_CONNECT_REQUEST);

export const postShopifyOauthData = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/shopify/put`,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      ActionTypes.POST_SHOPIFY_CONNECT_REQUEST,
      ActionTypes.POST_SHOPIFY_CONNECT_SUCCESS,
      ActionTypes.POST_SHOPIFY_CONNECT_FAILURE,
    ],
  });

export const postGoogleAdsOauthData = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/google-ads/put`,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      ActionTypes.POST_GOOGLE_ADS_CONNECT_REQUEST,
      ActionTypes.POST_GOOGLE_ADS_CONNECT_SUCCESS,
      ActionTypes.POST_GOOGLE_ADS_CONNECT_FAILURE,
    ],
  });

export const postGoogleAnalyticsOauthData = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/google-analytics/put`,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      ActionTypes.POST_GOOGLE_ANALYTICS_CONNECT_REQUEST,
      ActionTypes.POST_GOOGLE_ANALYTICS_CONNECT_SUCCESS,
      ActionTypes.POST_GOOGLE_ANALYTICS_CONNECT_FAILURE,
    ],
  });

export const postFacebookOauthData = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/facebook/put`,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      ActionTypes.POST_FACEBOOK_CONNECT_REQUEST,
      ActionTypes.POST_FACEBOOK_CONNECT_SUCCESS,
      ActionTypes.POST_FACEBOOK_CONNECT_FAILURE,
    ],
  });

const getAllConnectionsRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/connections`,
    method: 'GET',
    types: [
      ActionTypes.GET_ALL_CONNECTIONS_REQUEST,
      ActionTypes.GET_ALL_CONNECTIONS_SUCCESS,
      ActionTypes.GET_ALL_CONNECTIONS_FAILURE,
    ],
  });
export const getAllConnections = () => makeRequest(getAllConnectionsRequest());
