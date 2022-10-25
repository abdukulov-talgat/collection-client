import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Box>
            <Header />
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
