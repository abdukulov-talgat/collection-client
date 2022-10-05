import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SearchBar from '../SearchBar/SearchBar';
import UserNav from '../UserNav/UserNav';
import { useSelector } from 'react-redux';
import { selectMobileOpen, setMobileOpen } from '../../shared/redux/settingsSlice';
import { useAppDispatch } from '../../shared/redux/store';
import { useMobileMenu } from './useMobileMenu';
import ThemeControl from '../ThemeControl/ThemeControl';

const MobileMenu = () => {
    const mobileOpen = useSelector(selectMobileOpen);
    const dispatch = useAppDispatch();
    useMobileMenu();

    return (
        <>
            <IconButton
                color="inherit"
                onClick={() => dispatch(setMobileOpen(true))}
                sx={{ ml: 'auto', display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                closeAfterTransition={true}
                open={mobileOpen}
                onClose={() => {
                    dispatch(setMobileOpen(false));
                }}
                PaperProps={{ sx: { minWidth: '50%', padding: '1rem', gap: '20px' } }}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <SearchBar />
                <UserNav />
                <ThemeControl />
            </Drawer>
        </>
    );
};

export default MobileMenu;
