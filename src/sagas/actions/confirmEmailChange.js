import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/confirmEmailChange';

const confirmEmailChangeRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/email/change/confirm?changeEmailCode=${payload}`,
    method: 'POST',
    types: [
      ActionTypes.CONFIRM_EMAIL_CHANGE_REQUEST,
      ActionTypes.CONFIRM_EMAIL_CHANGE_SUCCESS,
      ActionTypes.CONFIRM_EMAIL_CHANGE_FAILURE,
    ],
  });
export const confirmEmailChange = props => makeRequest(confirmEmailChangeRequest(props));
