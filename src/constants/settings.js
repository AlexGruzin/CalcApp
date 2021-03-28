import { ADVERT } from 'constants/advertisment';
import { arrayToKeyedObject } from 'helpers/generic';

export const MARKETING_CALENDAR_OPTIONS = [
  {
    label: 'settings:calendarOptions.standard',
    value: 'Standard Human Calendar',
  },
  {
    label: '4-5-4',
    value: '4-5-4',
  },
  {
    label: '4-4-5',
    value: '4-4-5',
  },
  {
    label: '5-4-4',
    value: '5-4-5',
  },
];

export const DEFAULT_MARKETING_CALENDAR = {
  label: 'settings:calendarOptions.standard',
  value: 'Standard Human Calendar',
};

export const TIMEZONE_OPTIONS = [
  {
    label: 'UTC -05 (ET)-Eastern',
    value: 'UTC-05:00 (ET) - Eastern Time zone',
  },
  {
    label: 'UTC -06 (CT)-Central',
    value: 'UTC-06:00 (CT) - Central Time zone',
  },
  {
    label: 'UTC -07 (MT)-Mountain',
    value: 'UTC-07:00 (MT) - Mountain Time zone',
  },
  {
    label: 'UTC -08 (PT)-Pacific',
    value: 'UTC-08:00 (PT) - Pacific Time zone',
  },
];

export const DEFAULT_TIMEZONE = {
  label: 'UTC -06 (CT)-Central',
  value: 'UTC-06:00 (CT) - Central Time zone',
};

export const connections = [
  {
    type: ADVERT.SHOPIFY,
    image: 'shopify-logo.png',
    alt: 'shopify-logo',
  },
  {
    type: ADVERT.GOOGlE_ANALYTICS,
    image: 'google-analitics-logo.png',
    alt: 'google-analitics-logo',
  },
  {
    type: ADVERT.GOOGLE_ADS,
    image: 'g-ads-logo.png',
    alt: 'g-ads-logo',
  },
];

export const connectionsObject = arrayToKeyedObject(connections, 'type');

export const defaultTimezoneOption = {
  value: 'GMT',
  label: '(GMT+0:00) Dublin, Edinburgh, Lisbon, London',
};
