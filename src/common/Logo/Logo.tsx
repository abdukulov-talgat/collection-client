import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../../shared/constants/routes';
import { Button } from '@mui/material';

const Logo = () => {
    return (
        <Button
            component={RouterLink}
            to={routes.HOME}
            color="inherit"
            sx={{ textTransform: 'none', fontSize: '1.5rem' }}
        >
            iCollection
        </Button>
    );
};

export default Logo;
