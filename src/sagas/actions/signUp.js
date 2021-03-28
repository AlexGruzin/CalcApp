import ActionTypes from 'sagas/actionTypes/signUp';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_PATH, API_DOMAIN } from 'constants/envConstants';
import * as Routing from 'constants/routing';

export const postSignUp = payload =>
  createAPIAction({
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    endpoint: `${API_DOMAIN}${API_PATH}/user/register?redirectUrl=${window.location.origin}${Routing.CONFIRM_SIGN_UP}`,
    method: 'POST',
    body: JSON.stringify(payload),
    types: [
      ActionTypes.SIGN_UP_REQUEST,
      {
        type: ActionTypes.SIGN_UP_SUCCESS, // In that request be return invalid json despite the fact res.type is json
        payload: (action, state, res) => {
          const contentType = res.headers.get('Content-Type');
          if (contentType && ~contentType.indexOf('json')) {
            return res;
          }
        },
      },
      ActionTypes.SIGN_UP_FAILURE,
    ],
  });
