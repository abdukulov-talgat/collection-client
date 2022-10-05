import { createTheme, Theme } from '@mui/material';

export type AppTheme = 'light' | 'dark';

type ThemeCreator = {
    [k in AppTheme]: () => Theme;
};

const themeCreator: ThemeCreator = {
    light: () => {
        return createLightTheme();
    },
    dark: () => {
        return createDarkTheme();
    },
};

const createAppTheme = (theme: AppTheme) => {
    return themeCreator[theme]();
};

const createLightTheme = () => {
    return createTheme({
        palette: {
            mode: 'light',
        },
    });
};

const createDarkTheme = () => {
    return createTheme({
        palette: {
            mode: 'dark',
        },
    });
};

export { createAppTheme };
