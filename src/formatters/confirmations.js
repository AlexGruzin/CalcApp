export const formatUser = data => ({
  email: data.email,
  f_name: data.firstName || '',
  l_name: data.lastName || '',
  invited_user_id: data.invitedUserId,
  password: data.password,
});

export const formatConfirmPassword = data => ({
  password: data.password,
  resetPasswordCode: data.resetPasswordCode,
});
