import { createI18n } from '@sisa/i18n';
// import { initValidationLocales } from '@sisa/form';

import en from './locales/en.json';
import vi from './locales/vi.json';

export const fallbackLng = 'en-US';
export const defaultNS = 'translation';
export const supportedLngs = ['en', 'vi'];
export const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

const i18n = createI18n(resources, fallbackLng, supportedLngs, defaultNS);

// initValidationLocales(i18n);

export default i18n;
