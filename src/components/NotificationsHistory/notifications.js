import * as Routing from 'constants/routing';

export const NOTIFICATIONS_TYPES = {
  AUDIT_READY: 'AUDIT_READY',
  SURVEY: 'SURVEY',
};

export const PREDEFINED_NOTIFICATIONS = {
  [NOTIFICATIONS_TYPES.AUDIT_READY]: {
    title: 'Your audit dashboard is ready!',
    message: 'Click notification to redirect',
    link: Routing.AUDIT_DASHBOARD,
  },
  [NOTIFICATIONS_TYPES.SURVEY]: {
    title: 'You didn`t pass the survey!',
    message: 'Click notification to redirect to Survey page',
    link: Routing.SURVEY,
  },
};
