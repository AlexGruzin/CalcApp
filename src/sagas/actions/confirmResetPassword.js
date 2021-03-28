import { createAction } from 'redux-actions';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/confirmResetPassword';

export const initConfirmPassword = createAction(ActionTypes.INIT_REQUEST_CONFIRM_RESET_PASSWORD);

const resetPasswordRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/password/reset?password=${payload.password}&resetPasswordCode=${payload.resetPasswordCode}`,
    method: 'POST',
    types: [ActionTypes.RESET_PASSWORD_REQUEST, ActionTypes.RESET_PASSWORD_SUCCESS, ActionTypes.RESET_PASSWORD_FAILURE],
  });
export const resetPassword = props => makeRequest(resetPasswordRequest(props));
