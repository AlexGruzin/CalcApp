import { ROLES } from 'constants/roles';
import { USER_STATUS } from 'constants/audit';

export const HOME = '/';
export const LOG_IN = '/log_in';
export const SIGN_UP = '/sign_up';
export const DASHBOARD = '/dashboard';
export const RESET_PASSWORD = '/reset_password';
export const FORECAST = '/forecast';
export const CAMPAIGNS = '/campaigns';
export const SETTINGS = '/settings';
export const CONFIRM_OAUTH = '/confirm_oauth';
export const FORBIDDEN = '/forbidden';
export const CONFIRM_PASSWORD = '/confirmation_password';
export const CONFIRM_SIGN_UP = '/confirmation_registration';
export const CONFIRM_USER = '/confirmation_user';
export const CONFIRM_EMAIL_CHANGE = '/confirmation_email_change';
export const AUDIT = '/audit';
export const AUDIT_DASHBOARD = '/audit_dashboard';
export const SHOPIFY_SIGNUP = '/shopify_signup';
export const CONFIRM_SHOPIFY_SIGNUP = '/confirm_shopify_signup';
export const SURVEY = '/survey';
export const LOADER = '/loader';
export const PRIVACY_STATEMENT_LINK = '/privacy';
export const TERMS_LINK = '/terms';
export const WELCOME = '/welcome';

export const WELCOME_FIRST_TIME = `${WELCOME}?status=${USER_STATUS.FIRST_TIME}`;
export const WELCOME_AUDIT_PASSED = `${WELCOME}?status=${USER_STATUS.AUDIT_PASSED}`;

export const ROUTES_FULLY_ACCESSIBLE = [
  LOG_IN,
  HOME,
  SIGN_UP,
  CONFIRM_OAUTH,
  RESET_PASSWORD,
  FORBIDDEN,
  CONFIRM_PASSWORD,
  CONFIRM_USER,
  CONFIRM_SIGN_UP,
  SHOPIFY_SIGNUP,
  CONFIRM_SHOPIFY_SIGNUP,
  TERMS_LINK,
  PRIVACY_STATEMENT_LINK,
];

export const IFRAME_BLOCKED_ROUTES = [SIGN_UP];

export const ROUTES_PERMISSIONS = {
  [SETTINGS]: {
    [ROLES.USER]: true,
  },
  [FORECAST]: {
    [ROLES.USER]: true,
  },
  [CAMPAIGNS]: {
    [ROLES.USER]: true,
  },
  [DASHBOARD]: {
    [ROLES.USER]: true,
  },
  [AUDIT]: {
    [ROLES.USER]: true,
  },
  [AUDIT_DASHBOARD]: {
    [ROLES.USER]: true,
  },
  [CONFIRM_SIGN_UP]: {
    [ROLES.USER]: true,
  },
  [CONFIRM_USER]: {
    [ROLES.USER]: true,
  },
  [CONFIRM_PASSWORD]: {
    [ROLES.USER]: true,
  },
  [CONFIRM_EMAIL_CHANGE]: {
    [ROLES.USER]: true,
  },
  [SHOPIFY_SIGNUP]: {
    [ROLES.USER]: true,
  },
  [CONFIRM_SHOPIFY_SIGNUP]: {
    [ROLES.USER]: true,
  },
  [SURVEY]: {
    [ROLES.USER]: true,
  },
  [LOADER]: {
    [ROLES.USER]: true,
  },
  [WELCOME]: {
    [ROLES.USER]: true,
  },
};
