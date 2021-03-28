import * as Routing from 'constants/routing';

export const HEADER_FREE_PAGES = [
  Routing.LOG_IN,
  Routing.SIGN_UP,
  Routing.RESET_PASSWORD,
  Routing.CONFIRM_OAUTH,
  Routing.CONFIRM_SIGN_UP,
  Routing.CONFIRM_EMAIL_CHANGE,
  Routing.CONFIRM_USER,
  Routing.CONFIRM_PASSWORD,
  Routing.SHOPIFY_SIGNUP,
  Routing.CONFIRM_SHOPIFY_SIGNUP,
  Routing.SURVEY,
  Routing.TERMS_LINK,
  Routing.PRIVACY_STATEMENT_LINK,
  Routing.WELCOME,
];

export const DELAY_TO_SEE_AND_READ_REQUEST_STATUS = 1000;

export const DEVELOPMENT_CASES_DELAY = 10000;

const temp_title = 'We’ll help you plan and show you how to get there.';
const temp_description =
  'By connecting with your Storefront and Analytics, we can help you create a plan for the next year — And will give you the steps to get there.';

export const SLIDES_DATA = [
  {
    image: 'slide1.png',
    link: 'slide1',
    title: temp_title,
    description: temp_description,
  },
  {
    image: 'slide1.png',
    link: 'slide2',
    title: temp_title,
    description: temp_description,
  },
  {
    image: 'slide1.png',
    link: 'slide3',
    title: temp_title,
    description: temp_description,
  },
];

export const CONFIRMATION_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
