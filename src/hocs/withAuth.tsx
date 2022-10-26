import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../shared/redux/authSlice';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../shared/constants/appRoutes';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return () => {
        const { isAuth } = useSelector(selectAuthState);

        if (!isAuth) {
            return <Navigate to={appRoutes.SIGNIN} />;
        }

        return <WrappedComponent />;
    };
};

export default withAuth;
