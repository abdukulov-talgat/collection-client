import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Box } from '@mui/material';
import UserNav from '../UserNav/UserNav';
import ThemeControl from '../ThemeControl/ThemeControl';
import LocaleControl from '../LocaleControl/LocaleControl';

const DesktopMenu = () => {
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 'auto', gap: '1rem', alignItems: 'center' }}>
            <SearchBar />
            <Box>
                <UserNav />
            </Box>
            <ThemeControl />
            <LocaleControl />
        </Box>
    );
};

export default DesktopMenu;
