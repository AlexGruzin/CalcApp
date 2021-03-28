import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeUnsafeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/shopifySignup';

const shopifySignUpRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/shopify/register?hmac=${payload.hmac}&shop=${payload.shop}`,
    method: 'POST',
    types: [ActionTypes.SIGN_UP_REQUEST, ActionTypes.SIGN_UP_SUCCESS, ActionTypes.SIGN_UP_FAILURE],
  });
export const shopifySignUp = props => makeUnsafeRequest(shopifySignUpRequest(props));

const validateSessionRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/shopify/validate-session?sessionToken=${payload.sessionToken}&shop=${payload.shop}`,
    method: 'GET',
    types: [
      ActionTypes.VALIDATE_SESSION_REQUEST,
      ActionTypes.VALIDATE_SESSION_SUCCESS,
      ActionTypes.VALIDATE_SESSION_FAILURE,
    ],
  });
export const validateSession = props => makeUnsafeRequest(validateSessionRequest(props));
