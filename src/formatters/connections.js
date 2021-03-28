import { SHOPIFY_CLIENT_ID, GOOGLE_CLIENT_ID, REDIRECT_URI, FACEBOOK_APP_ID } from 'constants/envConstants';

export const formatAllConnections = data => {
  if (!data) return [];

  return data.map(item => ({
    date: new Date(item.date_created),
    scope: item.scope,
    type: item.setting_type,
  }));
};

export const formatShopifyConnectData = data => {
  const { code, shop, accessToken } = data;

  if (accessToken) {
    return {
      client_id: SHOPIFY_CLIENT_ID,
      code,
      shop,
      access_token: accessToken,
      // hmac, may be necessary in future
    };
  }

  return {
    client_id: SHOPIFY_CLIENT_ID,
    code,
    shop,
    // hmac, may be necessary in future
  };
};

export const formatGoogleConnectData = data => {
  const { code, scope, authuser, state } = data;

  return {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    scope,
    grant_type: 'authorization_code',
    authuser: authuser || 0,
    state,
  };
};

export const formatFacebookConnectData = data => {
  const { code, state } = data;

  return {
    client_id: FACEBOOK_APP_ID,
    redirect_uri: REDIRECT_URI,
    code,
    grant_type: 'authorization_code',
    state,
  };
};

export const formatInstagramConnectData = data => {
  const { code, state } = data;

  return {
    client_id: FACEBOOK_APP_ID,
    redirect_uri: REDIRECT_URI,
    code,
    grant_type: 'authorization_code',
    state,
  };
};
