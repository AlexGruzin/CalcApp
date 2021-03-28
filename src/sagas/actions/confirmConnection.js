import { createAction } from 'redux-actions';
import ActionTypes from 'sagas/actionTypes/confirmConnection';

export const finishConnectSuccsess = createAction(ActionTypes.CONNECTION_SETUP_SUCCESS);
export const finishConnectFail = createAction(ActionTypes.CONNECTION_SETUP_FAILURE);
