import { createAction } from 'redux-actions';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/confirmUser';
import * as Routing from 'constants/routing';

export const initConfirmUser = createAction(ActionTypes.INIT_REQUEST_CONFIRM_USER);

const confirmUserRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/register?redirectUrl=${window.location.origin}${Routing.CONFIRM_SIGN_UP}`,
    method: 'POST',
    body: payload,
    types: [ActionTypes.CONFIRM_USER_REQUEST, ActionTypes.CONFIRM_USER_SUCCESS, ActionTypes.CONFIRM_USER_FAILURE],
  });
export const confirmUser = props => makeRequest(confirmUserRequest(props));
