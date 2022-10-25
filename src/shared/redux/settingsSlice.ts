import { createSlice } from '@reduxjs/toolkit';
import { getLocale, getTheme, saveLocale, saveTheme } from '../utils/settingsStorage';
import { AppTheme } from '../utils/appTheme';
import { AppLocale } from '../constants/locales';
import { LocaleAction, MobileOpenAction, ThemeAction } from './actions';
import { RootState } from './store';

interface AppSettings {
    theme: AppTheme;
    locale: AppLocale;
    mobileOpen: boolean;
}

const initialState: AppSettings = {
    theme: getTheme() || 'light',
    locale: getLocale() || 'en',
    mobileOpen: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: ThemeAction) => {
            state.theme = action.payload;
            saveTheme(state.theme);
        },
        setLocale: (state, action: LocaleAction) => {
            state.locale = action.payload;
            saveLocale(state.locale);
        },
        setMobileOpen: (state, action: MobileOpenAction) => {
            state.mobileOpen = action.payload;
        },
    },
});

export default settingsSlice.reducer;
export const { setTheme, setLocale, setMobileOpen } = settingsSlice.actions;

export const selectTheme = (state: RootState) => state.settings.theme;
export const selectLocale = (state: RootState) => state.settings.locale;
export const selectMobileOpen = (state: RootState) => state.settings.mobileOpen;
