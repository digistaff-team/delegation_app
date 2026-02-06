import { ru } from './localization/ru';
import { en } from './localization/en';

const languages = {
  ru,
  en,
};

export const useLocalization = (lang = 'ru') => {
  return languages[lang as keyof typeof languages] ?? languages.ru;
};
