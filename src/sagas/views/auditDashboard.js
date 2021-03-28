import { getAuditDashboardReport } from 'sagas/actions/auditDashboard';
import { all, put } from 'redux-saga/effects';

function* initAuditDashboardWorker() {
  yield put(getAuditDashboardReport());
}

export default function* auditDashboardPageSaga() {
  yield all([initAuditDashboardWorker()]);
}
