import axios, { AxiosError } from 'axios';
import { history } from '../constants/history';
import { getAccessToken, saveAccessToken } from '../utils/settingsStorage';
import { apiRoutes } from '../constants/apiRoutes';
import store from '../redux/store';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { initSignIn, signOut } from '../redux/authSlice';
import jwtDecode from 'jwt-decode';

const refreshAuthLogic = async (failedRequest: AxiosError) => {
    try {
        const tokenRefreshResponse = await axios.get(apiRoutes.REFRESH);
        saveAccessToken(tokenRefreshResponse.data.accessToken);
        store.dispatch(initSignIn(jwtDecode(tokenRefreshResponse.data.accessToken)));
        return Promise.resolve();
    } catch (e) {
        store.dispatch(signOut());
        return Promise.reject();
    }
};

const http = axios.create();

http.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Without this row "axios" second try sent text/plain.
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

createAuthRefreshInterceptor(http, refreshAuthLogic);

// http.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error: unknown) => {
//         if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
//             try {
//                 const response = await axios.get(apiRoutes.REFRESH);
//                 saveAccessToken(response.data.accessToken);
//                 console.log('BEFORE TRY AGAIN');
//                 const tryAgainResponse = await axios({
//                     data: error.config?.data,
//                     method: error.config?.method,
//                     headers: { kkk: `Bearer ${getAccessToken()}` },
//                 });
//                 console.log('AFTER TRY AGAIN');
//                 return Promise.resolve(tryAgainResponse.data);
//             } catch (e) {
//                 history.push(appRoutes.SIGNIN);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export { http };
