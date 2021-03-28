import { createAction } from 'redux-actions';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { API_DOMAIN, API_PATH } from 'constants/envConstants';
import { makeRequest } from 'sagas/actions/callApi';
import ActionTypes from 'sagas/actionTypes/auditDashboard';

const getAuditDashboardRequest = () =>
  createAPIAction({
    endpoint: `${API_DOMAIN}${API_PATH}/audit/dashboard`,
    method: 'GET',
    types: [
      ActionTypes.GET_AUDIT_DASHBOARD_REQUEST,
      ActionTypes.GET_AUDIT_DASHBOARD_SUCCESS,
      ActionTypes.GET_AUDIT_DASHBOARD_FAILURE,
    ],
  });
export const getAuditDashboardReport = () => makeRequest(getAuditDashboardRequest());
