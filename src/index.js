import React from 'react';
import ReactDOM from 'react-dom';

import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';

import { Provider as ShopifyProvider } from '@shopify/app-bridge-react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { isInIframe } from 'helpers/routing';
import { SHOPIFY_CLIENT_ID } from 'constants/envConstants';
import store from './store';
import history from './store/history';

import * as serviceWorker from './serviceWorker';
import App from './App';
import ShopifyApp from './ShopifyApp';

const shopifyApp = () => {
  const isInFrame = isInIframe();
  if (isInFrame) {
    const shop = new URLSearchParams(window.location.search).get('shop');

    const config = {
      apiKey: SHOPIFY_CLIENT_ID,
      shopOrigin: shop,
      forceRedirect: true,
    };

    return (
      <ShopifyProvider config={config}>
        <ShopifyApp />
      </ShopifyProvider>
    );
  }

  return <App />;
};

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>{shopifyApp()}</ConnectedRouter>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
