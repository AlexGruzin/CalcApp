import { createSelector } from 'reselect';

export const getAudit = state => state.audit || {};

export const getAuditStepStatus = createSelector(getAudit, audit => audit.auditStep || {});
export const getAuditStepFail = createSelector(getAudit, audit => audit.failStepRequest);
export const isLoadingStep = createSelector(getAudit, audit => audit.isLoadingStep);

export const getAuditRunStatus = createSelector(getAudit, audit => audit.auditRun || null);
export const getAuditRunFail = createSelector(getAudit, audit => audit.failRunRequest);
export const isLoadingRun = createSelector(getAudit, audit => audit.isLoadingRun);

export const getAuditStatus = createSelector(getAudit, audit => audit.auditStatus || {});
export const getAuditStatusFail = createSelector(getAudit, audit => audit.failRequest);
export const isLoading = createSelector(getAudit, audit => audit.isLoading);

export const getDashboardAudit = createSelector(getAudit, audit => audit.auditData || {});
