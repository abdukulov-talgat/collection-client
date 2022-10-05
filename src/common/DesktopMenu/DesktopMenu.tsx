import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Box } from '@mui/material';
import UserNav from '../UserNav/UserNav';
import ThemeControl from '../ThemeControl/ThemeControl';

const DesktopMenu = () => {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginLeft: 'auto', gap: '1rem', alignItems: 'center' }}>
            <SearchBar />
            <Box>
                <UserNav />
            </Box>
            <ThemeControl />
        </Box>
    );
};

export default DesktopMenu;
