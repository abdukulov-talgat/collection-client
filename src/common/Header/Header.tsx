import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';
import MobileMenu from '../MobileMenu/MobileMenu';
import DesktopMenu from '../DesktopMenu/DesktopMenu';

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar component="nav" disableGutters={true}>
                    <Logo />
                    <DesktopMenu />
                    <MobileMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
