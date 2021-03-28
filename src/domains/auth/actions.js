import { createAction } from 'redux-actions';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { getAccessToken } from 'helpers/services/storage';
import ActionTypes from './actionTypes';

export const userLogout = createAction(ActionTypes.LOG_OUT);
export const userForceLogout = createAction(ActionTypes.LOG_OUT_FORCE);
export const storeTokens = createAction(ActionTypes.STORE_TOKENS);
export const storeUserData = createAction(ActionTypes.STORE_USER_DATA);
export const getUserInfoByToken = createAction(ActionTypes.INIT_USER_INFO_REQUEST);
export const storeSessionToken = createAction(ActionTypes.STORE_SESSION_TOKEN);
export const userInfoRequestError = createAction(ActionTypes.USER_INFO_FAILURE, () => {});

export const requestLogout = () =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/logout`,
    method: 'GET',
    types: [ActionTypes.SEND_LOGOUT_REQUEST, ActionTypes.SEND_LOGOUT_SUCCESS, ActionTypes.SEND_LOGOUT_FAILURE],
  });

export const userInfo = () =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/me`,
    method: 'GET',
    types: [ActionTypes.USER_INFO_REQUEST, ActionTypes.USER_INFO_SUCCESS, ActionTypes.USER_INFO_FAILURE],
  });
