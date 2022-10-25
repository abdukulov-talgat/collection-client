import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '../../constants/apiRoutes';
import { AuthInfo } from '../authSlice';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { saveAccessToken } from '../../utils/settingsStorage';

export interface Credentials {
    email: string;
    password: string;
}

const signIn = createAsyncThunk<AuthInfo, Credentials, { rejectValue: string }>(
    apiRoutes.SIGNIN,
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiRoutes.SIGNIN, credentials);
            saveAccessToken(response.data.accessToken);
            return jwtDecode<AuthInfo>(response.data.accessToken);
        } catch {
            return rejectWithValue('app.form.wrongCredentials');
        }
    }
);

export { signIn };
