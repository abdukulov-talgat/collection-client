import React from 'react';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import SearchBar from '../SearchBar/SearchBar';
import UserNav from '../UserNav/UserNav';
import { useSelector } from 'react-redux';
import { selectMobileOpen, setMobileOpen } from '../../shared/redux/settingsSlice';
import { useAppDispatch } from '../../shared/redux/store';
import { useMobileMenu } from './useMobileMenu';
import ThemeControl from '../ThemeControl/ThemeControl';
import LocaleControl from '../LocaleControl/LocaleControl';
import { StyledDrawer } from '../SearchBar/StyledDrawer';

const MobileMenu = () => {
    const mobileOpen = useSelector(selectMobileOpen);
    const dispatch = useAppDispatch();
    useMobileMenu();

    return (
        <>
            <IconButton
                color="inherit"
                onClick={() => dispatch(setMobileOpen(true))}
                sx={{ ml: 'auto', display: { md: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <StyledDrawer
                closeAfterTransition={true}
                open={mobileOpen}
                onClose={() => {
                    dispatch(setMobileOpen(false));
                }}
            >
                <SearchBar />
                <UserNav />
                <ThemeControl />
                <LocaleControl />
            </StyledDrawer>
        </>
    );
};

export default MobileMenu;
