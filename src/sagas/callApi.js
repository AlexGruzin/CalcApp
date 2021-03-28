import { RSAA } from 'redux-api-middleware';
import { put, all, take, race, delay, takeEvery } from 'redux-saga/effects';

import { getAccessToken } from 'helpers/services/storage';

import { REQUEST_DELAY } from 'constants/errors';
import { LOG_IN_TOKEN } from 'constants/envConstants';

import ActionTypes from 'sagas/actionTypes/callApi';
import { handleRequestFailed } from 'sagas/actions/callApi';

/**
 * Saga that allows us to make safe request.
 */
export function* makeRequestWorker(unsafe = false, { payload }) {
  const request = payload;
  const [, actionSuccess, actionFailure] = request[RSAA].types;

  if (!request[RSAA].headers) {
    request[RSAA].headers = {
      'Content-Type': 'application/json',
    };
  } else if (!request[RSAA].headers['Content-Type']) {
    request[RSAA].headers['Content-Type'] = 'application/json';
  }
  const RSAARequest = request[RSAA];

  if (!unsafe) {
    request[RSAA].headers.Authorization = `Bearer ${getAccessToken()}`;
  } else {
    request[RSAA].headers.Authorization = `Basic ${LOG_IN_TOKEN}`;
  }

  if (request[RSAA].body) {
    request[RSAA].body = JSON.stringify(request[RSAA].body);
  }

  yield put(request);

  const { responseFailure, responseDelay } = yield race({
    responseSuccess: take(actionSuccess),
    responseFailure: take(actionFailure),
    responseDelay: delay(REQUEST_DELAY),
  });

  if (responseFailure || responseDelay) {
    yield put(handleRequestFailed({ response: responseFailure, responseDelay, RSAARequest }));
  }
}

export function* makeRequestWatcher() {
  yield takeEvery(ActionTypes.MAKE_REQUEST, makeRequestWorker, false);
}

export function* makeUnsafeRequestWatcher() {
  yield takeEvery(ActionTypes.MAKE_UNSAFE_REQUEST, makeRequestWorker, true);
}

export default function* callApiSaga() {
  yield all([makeRequestWatcher(), makeUnsafeRequestWatcher()]);
}
