import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTheme, setTheme } from '../../shared/redux/settingsSlice';
import { useAppDispatch } from '../../shared/redux/store';
import { saveTheme } from '../../shared/utils/settingsStorage';

const ThemeControl = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useAppDispatch();

    const handleThemeButtonClick = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
        saveTheme(newTheme);
    };

    return (
        <IconButton onClick={handleThemeButtonClick}>
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
};

export default ThemeControl;
