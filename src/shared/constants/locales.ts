import enMessages from '../localization/en.json';
import ruMessages from '../localization/ru.json';

export type AppLocale = typeof locales[keyof typeof locales];

const locales = {
    RU: 'ru',
    EN: 'en',
} as const;

const messages = {
    [locales.EN]: enMessages,
    [locales.RU]: ruMessages,
};

export { locales, messages };
