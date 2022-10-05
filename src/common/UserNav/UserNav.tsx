import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../../shared/constants/routes';

const UserNav = () => {
    const [isAuth, setIsAuth] = useState(false);

    return isAuth ? (
        <>
            <Button component={RouterLink} to={routes.SIGNIN} color="inherit">
                Profile
            </Button>
            <Button type="button" color="inherit">
                Logout
            </Button>
        </>
    ) : (
        <>
            <Button component={RouterLink} to={routes.SIGNIN} color="inherit">
                Sign In
            </Button>
            <Button component={RouterLink} to={routes.SIGNUP} color="inherit">
                Sign Up
            </Button>
        </>
    );
};

export default UserNav;
