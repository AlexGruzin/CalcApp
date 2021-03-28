import { createAction } from 'redux-actions';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/settings';
import * as Routing from 'constants/routing';

export const pageReady = createAction(ActionTypes.PAGE_READY);
export const initUpdateConnection = createAction(ActionTypes.INIT_UPDATE_CONNECTION);

export const initUpdateGeneralDetails = createAction(ActionTypes.INIT_UPDATE_DETAILS);
export const initUpdateEmailOnly = createAction(ActionTypes.INIT_UPDATE_EMAIL);

const getGeneralDetailsRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/general-details`,
    method: 'GET',
    types: [
      ActionTypes.GET_GENERAL_DETAILS_REQUEST,
      ActionTypes.GET_GENERAL_DETAILS_SUCCESS,
      ActionTypes.GET_GENERAL_DETAILS_FAILURE,
    ],
  });
export const getGeneralDetails = () => makeRequest(getGeneralDetailsRequest());

const updateGeneralDetailsRequest = (
  payload // email changes not handled there, use updateEmailOnly
) =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/general-details`,
    method: 'POST',
    body: payload,
    types: [
      ActionTypes.UPDATE_GENERAL_DETAILS_REQUEST,
      ActionTypes.UPDATE_GENERAL_DETAILS_SUCCESS,
      ActionTypes.UPDATE_GENERAL_DETAILS_FAILURE,
    ],
  });
export const updateGeneralDetails = props => makeRequest(updateGeneralDetailsRequest(props));

const updateEmailOnlyRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/email/change?email=${payload}&redirectUrl=${window.location.origin}${Routing.CONFIRM_EMAIL_CHANGE}`,
    method: 'POST',
    types: [ActionTypes.SET_EMAIL_REQUEST, ActionTypes.SET_EMAIL_SUCCESS, ActionTypes.SET_EMAIL_FAILURE],
  });
export const updateEmailOnly = props => makeRequest(updateEmailOnlyRequest(props));

const confirmUpdateEmailRequestRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/email/change/confirm`,
    method: 'POST',
    types: [ActionTypes.SET_EMAIL_REQUEST, ActionTypes.SET_EMAIL_SUCCESS, ActionTypes.SET_EMAIL_FAILURE],
  });
export const confirmUpdateEmail = props => makeRequest(confirmUpdateEmailRequestRequest(props));

const getStoreDetailsRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/store-details`,
    method: 'GET',
    types: [
      ActionTypes.GET_STORE_DETAILS_REQUEST,
      ActionTypes.GET_STORE_DETAILS_SUCCESS,
      ActionTypes.GET_STORE_DETAILS_FAILURE,
    ],
  });
export const getStoreDetails = () => makeRequest(getStoreDetailsRequest());

const updateStoreDetailsRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/store-details`,
    method: 'POST',
    body: payload,
    types: [
      ActionTypes.UPDATE_STORE_DETAILS_REQUEST,
      ActionTypes.UPDATE_STORE_DETAILS_SUCCESS,
      ActionTypes.UPDATE_STORE_DETAILS_FAILURE,
    ],
  });
export const updateStoreDetails = props => makeRequest(updateStoreDetailsRequest(props));

const updateTeamRequest = payload =>
  // TODO refactor this on be
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/team?redirectUrl=${window.location.origin}${Routing.CONFIRM_USER}`,
    method: 'POST',
    body: payload,
    types: [ActionTypes.UPDATE_TEAM_REQUEST, ActionTypes.UPDATE_TEAM_SUCCESS, ActionTypes.UPDATE_TEAM_FAILURE],
  });
export const updateTeam = props => makeRequest(updateTeamRequest(props));

const getTeamRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/team`,
    method: 'GET',
    body: payload,
    types: [ActionTypes.GET_TEAM_REQUEST, ActionTypes.GET_TEAM_SUCCESS, ActionTypes.GET_TEAM_FAILURE],
  });
export const getTeam = () => makeRequest(getTeamRequest());

const updateNotificationsRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/notifications`,
    method: 'POST',
    body: payload,
    types: [
      ActionTypes.UPDATE_NOTIFICATIONS_REQUEST,
      ActionTypes.UPDATE_NOTIFICATIONS_SUCCESS,
      ActionTypes.UPDATE_NOTIFICATIONS_FAILURE,
    ],
  });
export const updateNotifications = props => makeRequest(updateNotificationsRequest(props));

const getNotificationsRequest = payload =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/settings/notifications`,
    method: 'GET',
    body: payload,
    types: [
      ActionTypes.GET_NOTIFICATIONS_REQUEST,
      ActionTypes.GET_NOTIFICATIONS_SUCCESS,
      ActionTypes.GET_NOTIFICATIONS_FAILURE,
    ],
  });
export const getNotifications = () => makeRequest(getNotificationsRequest());
