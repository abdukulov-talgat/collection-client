import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from '../../shared/constants/routes';
import { FormattedMessage } from 'react-intl';

const UserNav = () => {
    const [isAuth, setIsAuth] = useState(false);

    return isAuth ? (
        <>
            <Button component={RouterLink} to={routes.SIGNIN} color="inherit">
                <FormattedMessage id="app.navigation.profile" />
            </Button>
            <Button type="button" color="inherit">
                <FormattedMessage id="app.navigation.signOut" />
            </Button>
        </>
    ) : (
        <>
            <Button component={RouterLink} to={routes.SIGNIN} color="inherit">
                <FormattedMessage id="app.navigation.signIn" />
            </Button>
            <Button component={RouterLink} to={routes.SIGNUP} color="inherit">
                <FormattedMessage id="app.navigation.signUp" />
            </Button>
        </>
    );
};

export default UserNav;
