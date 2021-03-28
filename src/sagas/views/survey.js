import { getSurveyData } from 'sagas/actions/survey';
import { all, put } from 'redux-saga/effects';

function* initSurveyWorker() {
  yield put(getSurveyData());
}

export default function* surveyPageSaga() {
  yield all([initSurveyWorker()]);
}
