import { createAction } from 'redux-actions';
import ActionTypes from 'sagas/actionTypes/callApi';

export const makeRequest = createAction(ActionTypes.MAKE_REQUEST);

export const makeUnsafeRequest = createAction(ActionTypes.MAKE_UNSAFE_REQUEST);

export const handleRequestFailed = createAction(ActionTypes.REQUEST_FAILED);
