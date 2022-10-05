import { useAppDispatch } from '../../shared/redux/store';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setMobileOpen } from '../../shared/redux/settingsSlice';

export const useMobileMenu = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setMobileOpen(false));
    }, [dispatch, location]);
};
