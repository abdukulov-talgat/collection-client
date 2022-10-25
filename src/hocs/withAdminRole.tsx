import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../shared/redux/authSlice';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../shared/utils/authHelpers';
import { appRoutes } from '../shared/constants/appRoutes';

const withAdminRole = (WrappedComponent: React.ComponentType) => {
    return () => {
        const { info } = useSelector(selectAuthState);

        if (!info || !isAdmin(info)) {
            return <Navigate to={appRoutes.SIGNIN} />;
        }

        return <WrappedComponent />;
    };
};

export default withAdminRole;
