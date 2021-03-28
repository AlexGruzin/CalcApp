import { all } from 'redux-saga/effects';

import { saga as authSaga } from 'domains/auth';
import { saga as connectionsSaga } from 'domains/connections';
import routerSaga from './router';
import responseErrorSagaWatcher from './responseError';
import callApiSaga from './callApi';

export default function* rootSaga() {
  yield all([routerSaga(), authSaga(), connectionsSaga(), callApiSaga(), responseErrorSagaWatcher()]);
}
