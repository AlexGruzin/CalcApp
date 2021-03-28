export const formatLogInUser = data => ({
  grant_type: 'password',
  username: data.login,
  password: data.password,
});
