import i18n from 'i18next';

// locales
import US from '../locales/en';

i18n.init({
  debug: false,
  fallbackLng: ['US'],
  lng: 'US',

  ns: ['auth', 'resetPassword'],
  defaultNS: 'auth',

  resources: {
    US,
  },
});

export default i18n;

