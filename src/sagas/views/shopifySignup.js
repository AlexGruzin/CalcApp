import { all, put, race, take, takeEvery, call } from 'redux-saga/effects';
import { getAccessToken, getRefreshToken } from 'helpers/services/storage';
import { push } from 'connected-react-router';
import * as Routing from 'constants/routing';
import { postLogIn } from 'sagas/actions/logIn';
import LogInActionTypes from 'sagas/actionTypes/logIn';
import { shopifySignUp, validateSession } from 'sagas/actions/shopifySignup';
import ActionTypes from 'sagas/actionTypes/shopifySignup';
import { SHOPIFY_CLIENT_ID } from 'constants/envConstants';
import { SHOPIFY_SCOPE } from 'constants/connections';
import { isInIframe, redirectTopFrame } from 'helpers/routing';
import { ActionsCreators as AuthActions, ActionsTypes as AuthActionTypes } from 'domains/auth';

export function* initShopifySignUpWorker() {
  if (getAccessToken() && getRefreshToken()) {
    yield put(AuthActions.getUserInfoByToken());
    const { success, error } = yield race({
      success: take(AuthActionTypes.USER_INFO_SUCCESS),
      error: take(AuthActionTypes.USER_INFO_FAILURE),
    });

    if (success) {
      // auto-login case
      yield put(push(Routing.DASHBOARD));
    }
  } else if (!isInIframe()) {
    // signup case
    const parsedQuery = new URLSearchParams(window.location.search);
    const shop = parsedQuery.get('shop');
    const hmac = parsedQuery.get('hmac');

    yield put(shopifySignUp({ shop, hmac }));
    const { success, error } = yield race({
      success: take(ActionTypes.SIGN_UP_SUCCESS),
      error: take(ActionTypes.SIGN_UP_FAILURE),
    });

    if (success) {
      const { id } = success.payload;
      const state = { userId: id, shop }; // shop is in name.myshopify.com pattern
      const redirectUri = `https://fe-app.dev.calc.com${Routing.CONFIRM_SHOPIFY_SIGNUP}`;
      redirectTopFrame(
        `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&` +
          `scope=${SHOPIFY_SCOPE}&redirect_uri=${redirectUri}&state=${JSON.stringify(state)}`
      );
    }
  }
}

export function* validateSessionWorker({ payload }) {
  const parsedQuery = new URLSearchParams(window.location.search);
  const shop = parsedQuery.get('shop'); // name.myshopify.com pattern
  const sessionToken = payload;

  yield put(validateSession({ sessionToken, shop }));
  const { valid, invalid } = yield race({
    valid: take(ActionTypes.VALIDATE_SESSION_SUCCESS),
    invalid: take(ActionTypes.VALIDATE_SESSION_FAILURE),
  });

  if (valid) {
    const { email, password } = valid.payload;
    const formedData = {
      grant_type: 'password',
      username: email,
      password,
    };

    yield put(postLogIn(formedData));

    const { logged, fail } = yield race({
      logged: take(LogInActionTypes.LOG_IN_SUCCESS),
      fail: take(LogInActionTypes.LOG_IN_FAILURE),
    });

    if (logged) {
      const { refresh_token, access_token } = logged.payload;
      yield put(AuthActions.storeTokens({ refresh_token, access_token }));
      yield put(push(Routing.DASHBOARD));
    }
  }
}

export function* validateSessionWatcher() {
  yield takeEvery(AuthActionTypes.STORE_SESSION_TOKEN, validateSessionWorker);
}

export default function* shopifySignUpSaga() {
  yield all([initShopifySignUpWorker(), validateSessionWatcher()]);
}
