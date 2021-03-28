import { createSelector } from 'reselect';

export const getUser = state => state.user || {};

export const getUserData = createSelector(getUser, user => user.data || {});

export const getUserSettings = createSelector(getUser, user => user.settings || {});

export const getConfirmRegistrationStatus = createSelector(getUser, user => user.registrationConfirmationStatus || '');

export const getEmailChangeStatus = createSelector(getUser, user => user.emailChangeStatus || '');

export const getMemberConfirmationStatus = createSelector(getUser, user => user.memberConfirmationStatus || '');

export const shopifySignUpStatusSelector = createSelector(getUser, user => user.shopifySignUpStatus || '');

export const isDataLoaded = createSelector(getUserData, data => data.userId);

export const userIdSelector = createSelector(getUserData, data => data.userId);

export const userEmailSelector = createSelector(getUserData, data => data.username);

export const isAuthorized = createSelector(userIdSelector, id => !!id);

export const sessionTokenSelector = createSelector(getUser, user => user.sessionToken || '');

export const userSurveySelector = createSelector(getUser, data => data.survey);

export const userRole = createSelector(getUserData, data => {
  if (data.authorities && data.authorities?.length) {
    return data.authorities.map(item => item.authority);
  }
  return null;
});
