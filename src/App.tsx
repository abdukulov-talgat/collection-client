import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/Layout/Layout';
import { routes } from './shared/constants/routes';
import Home from './app/Home/Home';
import SignIn from './app/SignIn/SignIn';
import SignUp from './app/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectLocale, selectTheme } from './shared/redux/settingsSlice';
import { useMemo } from 'react';
import { createAppTheme } from './shared/utils/appTheme';
import { IntlProvider } from 'react-intl';
import { messages } from './shared/constants/locales';

// Last 5 Items (CollectionName, Collection, Author) 5 Biggest
// Collections Tag Clouds

function App() {
    const themeValue = useSelector(selectTheme);
    const locale = useSelector(selectLocale);

    const theme = useMemo(() => {
        return createAppTheme(themeValue);
    }, [themeValue]);

    return (
        <>
            <IntlProvider locale={locale} messages={messages[locale]}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path={routes.HOME} element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path={routes.SIGNIN} element={<SignIn />} />
                                <Route path={routes.SIGNUP} element={<SignUp />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </IntlProvider>
        </>
    );
}

export default App;
