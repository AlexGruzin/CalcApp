import { ADVERT } from 'constants/advertisment';

export const AUDIT_STORE_COMPLETE = 'STORE';
export const AUDIT_ANALYTICS_COMPLETE = 'ANALYTICS';
export const AUDIT_CHANNELS_COMPLETE = 'CHANNELS';

export const ADVERTISING_CHANNELS = [
  // {
  //   name: ADVERT.CORDIAL,
  //   image: 'cordial-logo.png',
  // },
  {
    name: ADVERT.GOOGLE_ADS,
    image: 'g-ads-logo.png',
  },
  // {
  //   name: ADVERT.FACEBOOK,
  //   image: 'facebook-logo.png',
  // },
  // {
  //   name: ADVERT.INSTAGRAM,
  //   image: 'instagram-logo.png',
  // },
  // {
  //   name: ADVERT.KLAVIYO,
  //   image: 'klaviyo-logo.png',
  // },
  // {
  //   name: ADVERT.TIKTOK,
  //   image: 'tiktok-logo.png',
  // },
  // {
  //   name: ADVERT.TWITTER,
  //   image: 'twitter-logo.png',
  // },
];

export const USER_STATUS = {
  FIRST_TIME: 'FIRST_TIME',
  AUDIT_PASSED: 'AUDIT_PASSED',
};
