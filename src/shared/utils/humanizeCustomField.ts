import { CustomFieldSchema } from '../../types/CustomFieldSchema';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ru';
import { CustomColumnTypes } from '../../types/CustomColumnTypes';
import { getLocale } from './settingsStorage';
import { messages } from '../constants/locales';
import { createIntl } from '@formatjs/intl';

export const humanizeCustomField = (schema: CustomFieldSchema, value: any): string => {
    switch (schema.type) {
        case CustomColumnTypes.BOOLEAN:
            return humanizeBooleanField(value);
        case CustomColumnTypes.DATE:
            return humanizeDateField(value);
        case CustomColumnTypes.INTEGER:
        case CustomColumnTypes.TEXT:
        case CustomColumnTypes.STRING:
            return value;
    }
};

const humanizeBooleanField = (value: any) => {
    const intl = createIntl({ locale: 'ru', messages: messages['ru'] });
    return value ? intl.formatMessage({ id: 'app.dictionary.yes' }) : intl.formatMessage({ id: 'app.dictionary.no' });
};

const humanizeDateField = (value: any) => {
    if (value) {
        return dayjs(value)
            .locale(getLocale() || 'en')
            .format('DD MMMM YYYY');
    }
    return '';
};
