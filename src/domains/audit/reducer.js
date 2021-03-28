import { formatAuditStep, formatAuditDashboardData } from 'formatters/audit';
import AuditDashboardActionTypes from 'sagas/actionTypes/auditDashboard';
import ActionTypes from './actionTypes';

const initialState = {
  auditStep: {},
  failStepRequest: false,
  isLoadingStep: false,
  auditRun: null,
  isLoadingRun: false,
  failRunRequest: false,
  auditStatus: {},
  failRequest: false,
  isLoading: false,
  auditData: {},
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.GET_AUDIT_STEP_REQUEST: {
      return {
        ...state,
        isLoadingStep: true,
      };
    }
    case ActionTypes.GET_AUDIT_STEP_SUCCESS: {
      return {
        ...state,
        auditStep: formatAuditStep(payload),
        failStepRequest: false,
        isLoadingStep: false,
      };
    }
    case ActionTypes.GET_AUDIT_STEP_FAILURE: {
      return {
        ...state,
        failStepRequest: true,
        isLoadingStep: false,
      };
    }
    case ActionTypes.GET_AUDIT_RUN_REQUEST: {
      return {
        ...state,
        isLoadingRun: true,
      };
    }
    case ActionTypes.GET_AUDIT_RUN_SUCCESS: {
      return {
        ...state,
        auditRun: payload,
        failRunRequest: false,
        isLoadingRun: false,
      };
    }
    case ActionTypes.GET_AUDIT_RUN_FAILURE: {
      return {
        ...state,
        failRunRequest: true,
        isLoadingRun: false,
      };
    }
    case ActionTypes.GET_AUDIT_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ActionTypes.GET_AUDIT_STATUS_SUCCESS: {
      return {
        ...state,
        auditStatus: payload,
        failRequest: false,
        isLoading: false,
      };
    }
    case ActionTypes.GET_AUDIT_STATUS_FAILURE: {
      return {
        ...state,
        failRequest: true,
        isLoading: false,
      };
    }
    case AuditDashboardActionTypes.GET_AUDIT_DASHBOARD_SUCCESS: {
      return {
        ...state,
        auditData: formatAuditDashboardData(payload),
      };
    }
    default: {
      return state;
    }
  }
}
