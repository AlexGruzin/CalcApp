import ActionTypes from 'sagas/actionTypes/resetPassword';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH, LOG_IN_TOKEN } from 'constants/envConstants';
import * as Routing from 'constants/routing';

export const sendEmailResetPassword = payload =>
  createAPIAction({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${LOG_IN_TOKEN}`,
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/password/email?email=${payload}&redirectUrl=${window.location.origin}${Routing.CONFIRM_PASSWORD}`,
    method: 'POST',
    types: [
      ActionTypes.SEND_RESET_EMAIL_REQUEST,
      ActionTypes.SEND_RESET_EMAIL_SUCCESS,
      ActionTypes.SEND_RESET_EMAIL_FAILURE,
    ],
  });
