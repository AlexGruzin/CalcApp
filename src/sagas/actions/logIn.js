import ActionTypes from 'sagas/actionTypes/logIn';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_PATH, API_DOMAIN, LOG_IN_TOKEN } from 'constants/envConstants';

export const postLogIn = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${LOG_IN_TOKEN}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/oauth/token`,
    method: 'POST',
    body: new URLSearchParams(payload),
    types: [ActionTypes.LOG_IN_REQUEST, ActionTypes.LOG_IN_SUCCESS, ActionTypes.LOG_IN_FAILURE],
  });
