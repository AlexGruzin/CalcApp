import { all, delay, put, race, take } from 'redux-saga/effects';
import ActionTypes from 'sagas/actionTypes/confirmShopifySignup';
import { confirmShopifyRegistration, signUpUnresolvedFailure } from 'sagas/actions/confirmShopifySignup';
import { DELAY_TO_SEE_AND_READ_REQUEST_STATUS } from 'constants/auth';
import { closeThisTab, redirectTopFrame } from 'helpers/routing';

export function* initShopifySignUpWorker() {
  const parsedQuery = new URLSearchParams(window.location.search);
  const queryString = parsedQuery.get('state');
  const { userId, shop } = JSON.parse(queryString);

  const code = parsedQuery.get('code');

  yield put(confirmShopifyRegistration({ userId, code, shop }));
  const { success, error } = yield race({
    success: take(ActionTypes.CONFIRM_SIGN_UP_SUCCESS),
    error: take(ActionTypes.CONFIRM_SIGN_UP_FAILURE), // not a final error action
  });

  if (success) {
    // we need to bring registrated user back to myshopify.com/admin
    redirectTopFrame(`https://${shop}/admin/apps/calcapp`);
    // TODO swap calcapp with env var when name would be approved
    return;
  }

  if (error?.payload?.response) {
    const { id, errorType } = error.payload.response;
    if (errorType === 'ALREADY_IN_USE') {
      // reinstall app case
      redirectTopFrame(`https://${shop}/admin/apps/calcapp`);
      // TODO swap calcapp with env var when name would be approved
      return;
    }
  }

  yield put(signUpUnresolvedFailure()); // final error action type
  yield delay(DELAY_TO_SEE_AND_READ_REQUEST_STATUS);
  closeThisTab();
}

export default function* shopifySignUpSaga() {
  yield all([initShopifySignUpWorker()]);
}
