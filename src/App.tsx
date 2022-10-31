import { CssBaseline, ThemeProvider } from '@mui/material';
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom';
import Layout from './common/Layout/Layout';
import { appRoutes } from './shared/constants/appRoutes';
import Home from './app/Home/Home';
import SignIn from './app/SignIn/SignIn';
import SignUp from './app/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectLocale, selectTheme } from './shared/redux/settingsSlice';
import { useMemo } from 'react';
import { createAppTheme } from './shared/utils/appTheme';
import { IntlProvider } from 'react-intl';
import { messages } from './shared/constants/locales';
import { history } from './shared/constants/history';
import Admin from './app/Admin/Admin';
import EditUser from './app/Admin/EditUser/EditUser';
import Profile from './app/Profile/Profile';
import CollectionShow from './app/CollectionShow/CollectionShow';
import CollectionCreate from './app/CollectionCreate/CollectionCreate';
import ItemCreate from './app/ItemCreate/ItemCreate';
import ItemShow from './app/ItemShow/ItemShow';
import { ItemEdit } from './app/ItemEdit/ItemEdit';
import SearchShow from './app/SearchShow/SearchShow';
import TagsSearchShow from './app/SearchShow/TagsSearchShow';
import QuerySearchShow from './app/SearchShow/QuerySearchShow';

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
                    <HistoryRouter history={history}>
                        <Routes>
                            <Route path={appRoutes.HOME} element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path={appRoutes.SIGNIN} element={<SignIn />} />
                                <Route path={appRoutes.SIGNUP} element={<SignUp />} />
                                <Route path={`${appRoutes.PROFILE}/:id`} element={<Profile />} />
                                <Route path={`${appRoutes.COLLECTION_ROOT}/:id`} element={<CollectionShow />} />
                                <Route path={`${appRoutes.ITEM_ROOT}/:id`} element={<ItemShow />} />
                                <Route path={`${appRoutes.ITEM_EDIT}/:id`} element={<ItemEdit />} />
                                <Route path={`${appRoutes.TAGS_SEARCH}/:tag`} element={<TagsSearchShow />} />
                                <Route path={`${appRoutes.SEARCH}`} element={<QuerySearchShow />} />
                                {/*withAuth*/}
                                <Route path={`${appRoutes.COLLECTION_CREATE}`} element={<CollectionCreate />} />
                                <Route path={`${appRoutes.ITEM_CREATE}`} element={<ItemCreate />} />
                                {/*withAdmin*/}
                                <Route path={appRoutes.ADMIN} element={<Admin />} />
                                <Route path={`${appRoutes.EDIT_USER}/:id`} element={<EditUser />} />
                                {/*ERRORS PAGE*/}
                                <Route path={appRoutes.NOT_FOUND} element={<div>NOT FOUND TEMP</div>} />
                                <Route path="*" element={<div>NOT FOUND TEMP</div>} />
                            </Route>
                        </Routes>
                    </HistoryRouter>
                </ThemeProvider>
            </IntlProvider>
        </>
    );
}

export default App;
