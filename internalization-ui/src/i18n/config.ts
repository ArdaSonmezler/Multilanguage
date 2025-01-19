import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {},
    lng: 'tr-TR', // default language
    fallbackLng: 'tr-TR',
    interpolation: {
      escapeValue: false
    }
  });

export const updateTranslations = (data: any[]) => {
  const resources: { [key: string]: { translation: { [key: string]: string } } } = {};

  data.forEach(item => {
    if (!resources[item.LANG]) {
      resources[item.LANG] = { translation: {} };
    }
    resources[item.LANG].translation[item.STRING_CODE] = item.STRING_VALUE;
  });

  Object.keys(resources).forEach(lang => {
    i18n.addResourceBundle(lang, 'translation', resources[lang].translation, true, true);
  });
};

export default i18n;