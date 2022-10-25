import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import settingsReducer from './settingsSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        auth: authReducer,
    },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
