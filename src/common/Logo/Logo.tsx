import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import { Button } from '@mui/material';

const Logo = () => {
    return (
        <Button
            component={RouterLink}
            to={appRoutes.HOME}
            color="inherit"
            sx={{ textTransform: 'none', fontSize: '1.5rem' }}
        >
            iCollection
        </Button>
    );
};

export default Logo;
