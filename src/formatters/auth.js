export const formatUserInfo = data => {
  const {
    account_non_expired,
    account_non_locked,
    credentials_non_expired,
    enabled,
    authorities,
    user_id,
    username,
  } = data;

  return {
    accountNonExpired: account_non_expired,
    accountNonLocked: account_non_locked,
    credentialsNonExpired: credentials_non_expired,
    enabled,
    authorities,
    userId: user_id,
    username,
  };
};
