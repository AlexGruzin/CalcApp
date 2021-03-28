import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import { getAccessToken } from 'helpers/services/storage';
import ActionTypes from './actionTypes';

const getAuditStepsRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/step`,
    method: 'GET',
    types: [ActionTypes.GET_AUDIT_STEP_REQUEST, ActionTypes.GET_AUDIT_STEP_SUCCESS, ActionTypes.GET_AUDIT_STEP_FAILURE],
  });

export const getAuditSteps = () => makeRequest(getAuditStepsRequest());

const getAuditRunRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/audit/run`,
    method: 'GET',
    types: [ActionTypes.GET_AUDIT_RUN_REQUEST, ActionTypes.GET_AUDIT_RUN_SUCCESS, ActionTypes.GET_AUDIT_RUN_FAILURE],
  });
export const getAuditRun = () => makeRequest(getAuditRunRequest());

const getAuditStatusRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/audit/check`,
    method: 'GET',
    types: [
      ActionTypes.GET_AUDIT_STATUS_REQUEST,
      ActionTypes.GET_AUDIT_STATUS_SUCCESS,
      ActionTypes.GET_AUDIT_STATUS_FAILURE,
    ],
  });
export const getAuditStatus = () => makeRequest(getAuditStatusRequest());

export const sendSelectedViewIdRequest = ({ id, type }) =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/user/google-data/put`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ data: id, setting_type: type }),
    types: [
      ActionTypes.GET_AUDIT_STATUS_REQUEST,
      ActionTypes.GET_AUDIT_STATUS_SUCCESS,
      ActionTypes.GET_AUDIT_STATUS_FAILURE,
    ],
  });
export const sendSelectedViewId = props => makeRequest(sendSelectedViewIdRequest(props));

export const getAccounts = token =>
  createAPIAction({
    endpoint: `https://www.googleapis.com/analytics/v3/management/accounts`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      ActionTypes.GET_ANALYTICS_ACCOUNTS_REQUEST,
      ActionTypes.GET_ANALYTICS_ACCOUNTS_SUCCESS,
      ActionTypes.GET_ANALYTICS_ACCOUNTS_FAILURE,
    ],
  });

export const getProperties = (accountId, token) =>
  createAPIAction({
    endpoint: `https://www.googleapis.com/analytics/v3/management/accounts/${accountId}/webproperties`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      ActionTypes.GET_ACCOUNT_PROPERTIES_REQUEST,
      ActionTypes.GET_ACCOUNT_PROPERTIES_SUCCESS,
      ActionTypes.GET_ACCOUNT_PROPERTIES_FAILURE,
    ],
  });

export const getViews = (accountId, webPropertyId, token) =>
  createAPIAction({
    endpoint: `https://www.googleapis.com/analytics/v3/management/accounts/${accountId}/webproperties/${webPropertyId}/profiles`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    types: [
      ActionTypes.GET_ACCOUNT_VIEWS_REQUEST,
      ActionTypes.GET_ACCOUNT_VIEWS_SUCCESS,
      ActionTypes.GET_ACCOUNT_VIEWS_FAILURE,
    ],
  });
