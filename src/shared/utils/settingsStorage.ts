import { AppTheme } from './appTheme';
import { AppLocale } from '../constants/locales';

type StorageKey = typeof THEME_KEY | typeof LOCALE_KEY | typeof ACCESS_TOKEN_KEY;

const THEME_KEY = 'mode';
const LOCALE_KEY = 'locale';
const ACCESS_TOKEN_KEY = 'accessToken';

const getTheme = () => {
    return getItem(THEME_KEY) as AppTheme | null;
};

const saveTheme = (theme: AppTheme) => {
    saveItem(THEME_KEY, theme);
};

const getLocale = () => {
    return getItem(LOCALE_KEY) as AppLocale | null;
};

const saveLocale = (value: AppLocale) => {
    saveItem(LOCALE_KEY, value);
};

const saveAccessToken = (token: string) => {
    saveItem(ACCESS_TOKEN_KEY, token);
};

const getAccessToken = () => {
    return getItem(ACCESS_TOKEN_KEY);
};

const saveItem = (key: StorageKey, value: string) => {
    localStorage.setItem(key, value);
};

const getItem = (key: StorageKey): string | null => {
    return localStorage.getItem(key);
};

export { getTheme, saveTheme, getLocale, saveLocale, saveAccessToken, getAccessToken };
