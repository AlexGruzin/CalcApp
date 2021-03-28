import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/confirmRegistration';

const confirmRegistrationRequest = confirmCode =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/register/confirm/${confirmCode}`,
    method: 'POST',
    types: [
      ActionTypes.CONFIRM_REGISTRATION_REQUEST,
      ActionTypes.CONFIRM_REGISTRATION_SUCCESS,
      ActionTypes.CONFIRM_REGISTRATION_FAILURE,
    ],
  });
export const confirmRegistration = props => makeRequest(confirmRegistrationRequest(props));
