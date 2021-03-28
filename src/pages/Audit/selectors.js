import { createStructuredSelector, createSelector } from 'reselect';

import { getConnectionsData } from 'domains/connections/selectors';
import {
  getAuditStepStatus,
  getAuditStepFail,
  isLoadingStep,
  getAuditStatus,
  getAuditStatusFail,
  isLoading,
  getAuditRunStatus,
  getAuditRunFail,
  isLoadingRun,
} from 'domains/audit/selectors';

const getConnectedNames = createSelector([getConnectionsData], connections => connections.map(item => item.type));

const connectionStatus = createSelector(getAuditStepStatus, auditStep => auditStep.wizardStep || '');

export default createStructuredSelector({
  connectedChannels: getConnectedNames,
  auditStep: getAuditStepStatus,
  connectionStatus,
  isAuditStepFail: getAuditStepFail,
  isAuditStepLoading: isLoadingStep,
  auditStatus: getAuditStatus,
  isAuditStatusFail: getAuditStatusFail,
  isAuditStatusLoading: isLoading,
  auditRunStatus: getAuditRunStatus,
  auditRunFail: getAuditRunFail,
  isAuditRunLoading: isLoadingRun,
});
