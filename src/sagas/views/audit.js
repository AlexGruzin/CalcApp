import { put, take, race, delay, all } from 'redux-saga/effects';
import { getSurveyData } from 'sagas/actions/survey';
import { push } from 'connected-react-router';
import * as Routing from 'constants/routing';
import SurveyActionTypes from 'sagas/actionTypes/survey';
import ActionTypes from 'domains/audit/actionTypes';
import { getAuditStatus, getAuditSteps } from 'domains/audit/actions';

/**
 * Saga that allows us to make safe request.
 */
function* initAuditSaga() {
  yield put(getAuditSteps());

  if (localStorage.getItem('access_token') !== '' && localStorage.getItem('import_data') === 'true') {
    while (true) {
      yield delay(5000);
      yield put(getAuditStatus());

      yield race({
        success: take(ActionTypes.GET_AUDIT_STATUS_SUCCESS),
        error: take(ActionTypes.GET_AUDIT_STATUS_FAILURE),
      });
    }
  }

  yield put(getSurveyData());

  const { success } = yield race({
    success: take(SurveyActionTypes.GET_SURVEY_DATA_SUCCESS),
    error: take(SurveyActionTypes.GET_SURVEY_DATA_FAILURE),
  });
  let isSurveyPassed = false;

  if (success) {
    // TODO discuss to swap with doNotShowNoMore field
    const { brand_name, industry } = success.payload;
    if (brand_name && industry) isSurveyPassed = true;
  }

  yield take(ActionTypes.GET_AUDIT_RUN_SUCCESS); // wait for audit success finished

  if (isSurveyPassed) {
    yield put(push(Routing.AUDIT_DASHBOARD));
  } else {
    yield put(push(Routing.SURVEY));
  }
}

export default function* auditPageSaga() {
  yield all([initAuditSaga()]);
}
