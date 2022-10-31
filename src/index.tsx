import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './shared/redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { apiRoutes } from './shared/constants/apiRoutes';
import jwtDecode from 'jwt-decode';
import { AuthInfo, initSignIn } from './shared/redux/authSlice';
import { initTopics } from './shared/constants/topics';

const start = async () => {
    await initTopics();
    try {
        const response = await axios.get(apiRoutes.REFRESH);
        const authInfo = jwtDecode<AuthInfo>(response.data.accessToken);
        store.dispatch(initSignIn(authInfo));
    } finally {
        const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
        root.render(
            <React.StrictMode>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>
        );
    }
};

void start();
