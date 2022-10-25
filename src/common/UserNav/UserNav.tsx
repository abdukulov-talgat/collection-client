import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { AuthInfo, selectAuthState, signOut } from '../../shared/redux/authSlice';
import { useAppDispatch } from '../../shared/redux/store';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import axios from 'axios';
import { isAdmin } from '../../shared/utils/authHelpers';

const UserNav = () => {
    const { isAuth, info } = useSelector(selectAuthState);
    const dispatch = useAppDispatch();

    const handleSignOutButton = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await axios.get(apiRoutes.SIGNOUT);
        dispatch(signOut());
    };

    return isAuth ? (
        <>
            <Button component={RouterLink} to={`${appRoutes.PROFILE}/${info?.id}`} color="inherit">
                {info?.email}
            </Button>
            <Button component={RouterLink} to={`${apiRoutes.SIGNOUT}`} color="inherit" onClick={handleSignOutButton}>
                <FormattedMessage id="app.navigation.signOut" />
            </Button>
            {isAdmin(info as AuthInfo) && (
                <Button component={RouterLink} to={appRoutes.ADMIN} color="inherit">
                    <FormattedMessage id="app.navigation.admin" />
                </Button>
            )}
        </>
    ) : (
        <>
            <Button component={RouterLink} to={appRoutes.SIGNIN} color="inherit">
                <FormattedMessage id="app.form.signIn" />
            </Button>
            <Button component={RouterLink} to={appRoutes.SIGNUP} color="inherit">
                <FormattedMessage id="app.form.signUp" />
            </Button>
        </>
    );
};

export default UserNav;
