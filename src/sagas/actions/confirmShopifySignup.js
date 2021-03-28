import { createAction as createAPIAction } from 'redux-api-middleware';
import { createAction } from 'redux-actions';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeUnsafeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/confirmShopifySignup';

export const signUpUnresolvedFailure = createAction(ActionTypes.SHOPIFY_SIGNUP_UNRESOLVED_FAILURE);

export const confirmShopifyRegistrationRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/shopify/inapp-authorize?userId=${payload.userId}`,
    method: 'POST',
    body: {
      code: payload.code,
      shop: payload.shop,
    },
    types: [
      ActionTypes.CONFIRM_SIGN_UP_REQUEST,
      ActionTypes.CONFIRM_SIGN_UP_SUCCESS,
      ActionTypes.CONFIRM_SIGN_UP_FAILURE,
    ],
  });
export const confirmShopifyRegistration = props => makeUnsafeRequest(confirmShopifyRegistrationRequest(props));

export const deleteTemporaryUserRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/delete/${payload}`,
    method: 'DELETE',
    types: [
      ActionTypes.DELETE_TEMP_USER_REQUEST,
      ActionTypes.DELETE_TEMP_USER_SUCCESS,
      ActionTypes.DELETE_TEMP_USER_FAILURE,
    ],
  });
export const deleteTemporaryUser = props => makeUnsafeRequest(deleteTemporaryUserRequest(props));
