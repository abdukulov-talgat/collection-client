import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/Layout/Layout';
import { routes } from './shared/constants/routes';
import Home from './app/Home/Home';
import SignIn from './app/SignIn/SignIn';
import SignUp from './app/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectTheme } from './shared/redux/settingsSlice';
import { useMemo } from 'react';
import { createAppTheme } from './shared/utils/appTheme';

// Last 5 Items (CollectionName, Collection, Author) 5 Biggest
// Collections Tag Clouds

function App() {
    const themeValue = useSelector(selectTheme);

    const theme = useMemo(() => {
        return createAppTheme(themeValue);
    }, [themeValue]);

    return (
        <>
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
        </>
    );
}

export default App;
