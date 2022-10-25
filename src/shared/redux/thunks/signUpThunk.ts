import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../../constants/apiRoutes';
import { AuthInfo } from '../authSlice';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { saveAccessToken } from '../../utils/settingsStorage';

export interface SignUpCredentials {
    email: string;
    password: string;
    passwordRepeat: string;
}

const signUp = createAsyncThunk<AuthInfo, SignUpCredentials, { rejectValue: string }>(
    apiRoutes.SIGNUP,
    async (credentials: SignUpCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiRoutes.SIGNUP, credentials);
            saveAccessToken(response.data.accessToken);
            return jwtDecode<AuthInfo>(response.data.accessToken);
        } catch {
            return rejectWithValue('app.form.error');
        }
    }
);

export { signUp };
