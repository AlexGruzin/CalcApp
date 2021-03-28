import { all, put, race, take, call, takeEvery } from 'redux-saga/effects';
import { ActionsCreators as ConnectActions, ActionsTypes as ConnectActionsTypes } from 'domains/connections';
import {
  pageReady,
  getNotifications,
  getGeneralDetails,
  getStoreDetails,
  getTeam,
  updateEmailOnly,
  updateGeneralDetails,
} from 'sagas/actions/settings';
import ActionTypes from 'sagas/actionTypes/settings';
import { ADVERT } from 'constants/advertisment';

function* getNotificationsSaga() {
  yield put(getNotifications());

  yield race({ success: ActionTypes.GET_NOTIFICATIONS_SUCCESS, error: ActionTypes.GET_NOTIFICATIONS_FAILURE });
}

function* getTeamSaga() {
  yield put(getTeam());

  yield race({ success: ActionTypes.GET_TEAM_SUCCESS, error: ActionTypes.GET_TEAM_FAILURE });
}

function* getStoreDetailsSaga() {
  yield put(getStoreDetails());

  yield race({ success: ActionTypes.GET_STORE_DETAILS_SUCCESS, error: ActionTypes.GET_STORE_DETAILS_FAILURE });
}

function* getGeneralDetailsSaga() {
  yield put(getGeneralDetails());

  yield race({ success: ActionTypes.GET_GENERAL_DETAILS_SUCCESS, error: ActionTypes.GET_GENERAL_DETAILS_FAILURE });
}

function* getAllConnectionsSaga() {
  yield put(ConnectActions.getAllConnections());

  yield race({
    success: ConnectActionsTypes.GET_ALL_CONNECTIONS_SUCCESS,
    error: ConnectActionsTypes.GET_ALL_CONNECTIONS_FAILURE,
  });
}

export function* initSettingsPageWorker() {
  yield all([
    call(getGeneralDetailsSaga),
    call(getNotificationsSaga),
    call(getTeamSaga),
    call(getAllConnectionsSaga),
    call(getStoreDetailsSaga),
  ]);
  const response = yield race({
    success: take(ConnectActionsTypes.GET_ALL_CONNECTIONS_SUCCESS),
    error: take(ConnectActionsTypes.GET_ALL_CONNECTIONS_FAILURE),
  });
  if (response?.success) {
    yield put(pageReady());
  }
}

export function* updateConnectionWorker({ payload }) {
  const { type } = payload;

  switch (type) {
    case ADVERT.SHOPIFY: {
      yield put(ConnectActions.integrateShopify(payload));
      break;
    }
    case ADVERT.GOOGLE_ADS: {
      yield put(ConnectActions.integrateGoogleAds());
      break;
    }
    case ADVERT.GOOGlE_ANALYTICS: {
      yield put(ConnectActions.integrateGoogleAnalytics());
      break;
    }
    default: {
      return 0;
    }
  }
}

function* updateEmailWorker({ payload }) {
  yield put(updateEmailOnly(payload));

  yield race({
    success: take(ActionTypes.SET_EMAIL_SUCCESS),
    error: take(ActionTypes.SET_EMAIL_FAILURE),
  });

  yield put(getGeneralDetails());
}

function* updateDetailsWorker({ payload }) {
  yield put(updateGeneralDetails(payload));

  yield race({
    success: take(ActionTypes.UPDATE_GENERAL_DETAILS_SUCCESS),
    error: take(ActionTypes.UPDATE_GENERAL_DETAILS_FAILURE),
  });

  yield put(getGeneralDetails());
}

export function* updateDetailsWatcher() {
  yield takeEvery(ActionTypes.INIT_UPDATE_DETAILS, updateDetailsWorker);
}

export function* updateEmailWatcher() {
  yield takeEvery(ActionTypes.INIT_UPDATE_EMAIL, updateEmailWorker);
}

export function* updateConnectionWatcher() {
  yield takeEvery(ActionTypes.INIT_UPDATE_CONNECTION, updateConnectionWorker);
}

export default function* settingsPageSaga() {
  yield all([initSettingsPageWorker(), updateConnectionWatcher(), updateDetailsWatcher(), updateEmailWatcher()]);
}
