import React from 'react';
import { MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLocale, setLocale } from '../../shared/redux/settingsSlice';
import { AppLocale, locales } from '../../shared/constants/locales';
import { StyledSelect } from './StyledSelect';
import { useAppDispatch } from '../../shared/redux/store';

const LocaleControl = () => {
    const currentLocale = useSelector(selectLocale);
    const dispatch = useAppDispatch();

    return (
        <StyledSelect
            value={currentLocale}
            onChange={(e) => {
                dispatch(setLocale(e.target.value as AppLocale));
            }}
        >
            <MenuItem value={locales.EN}>English</MenuItem>
            <MenuItem value={locales.RU}>Русский</MenuItem>
        </StyledSelect>
    );
};

export default LocaleControl;
