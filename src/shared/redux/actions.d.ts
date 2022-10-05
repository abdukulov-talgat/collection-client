import { PayloadAction } from '@reduxjs/toolkit';
import { AppTheme } from '../utils/appTheme';
import { AppLocale } from '../localization/localization';

export type ThemeAction = PayloadAction<AppTheme>;
export type LocaleAction = PayloadAction<AppLocale>;
export type MobileOpenAction = PayloadAction<boolean>;
