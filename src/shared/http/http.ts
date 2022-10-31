import axios from 'axios';
import { getAccessToken, saveAccessToken } from '../utils/settingsStorage';
import { apiRoutes } from '../constants/apiRoutes';
import store from '../redux/store';
import { initSignIn, signOut } from '../redux/authSlice';
import jwtDecode from 'jwt-decode';
import { history } from '../constants/history';
import { appRoutes } from '../constants/appRoutes';

const http = axios.create();

http.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        try {
            if (axios.isAxiosError(error) && error.response && error.response.status === 401 && error.config) {
                const tokenRefreshResponse = await axios.get(apiRoutes.REFRESH);
                saveAccessToken(tokenRefreshResponse.data.accessToken);
                store.dispatch(initSignIn(jwtDecode(tokenRefreshResponse.data.accessToken)));
                const options = {
                    headers: {
                        Authorization: `Bearer ${tokenRefreshResponse.data.accessToken}`,
                        'Content-Type': (error.config.headers && error.config.headers['Content-Type']) || 'text/plain',
                    },
                    method: error.config.method,
                    data: error.config.data,
                    url: error.config.url,
                };
                return await axios(options);
            }
        } catch (e) {
            if (axios.isAxiosError(e) && e.response && e.response.status === 403) {
                store.dispatch(signOut());
                history.push(appRoutes.SIGNIN);
            }
        }
    }
);

export { http };
