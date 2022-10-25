import React, { useEffect, useState } from 'react';
import withAdminRole from '../../../hocs/withAdminRole';
import { useNavigate, useParams } from 'react-router-dom';
import { http } from '../../../shared/http/http';
import { apiRoutes } from '../../../shared/constants/apiRoutes';
import { Box, Button, ButtonGroup, Checkbox, TextField, Typography } from '@mui/material';
import { User } from '../../../types/User';
import { FormattedMessage } from 'react-intl/lib';
import { useIntl } from 'react-intl';
import { isAdmin } from '../../../shared/utils/authHelpers';
import { useForm } from 'react-hook-form';
import { appRoutes } from '../../../shared/constants/appRoutes';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState, signOut } from '../../../shared/redux/authSlice';
import { useAppDispatch } from '../../../shared/redux/store';

interface UserEditInputs {
    id: number;
    email: string;
    isBanned: boolean;
    isAdmin: boolean;
}

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();
    const { register, handleSubmit } = useForm<UserEditInputs>();
    const navigate = useNavigate();

    useEffect(() => {
        http.get(`${apiRoutes.USERS}/${id}`).then((res) => {
            setUser(res.data);
            setIsLoading(false);
        });
    }, [id]);

    const handleFormSubmit = async (data: UserEditInputs) => {
        await http.patch(`${apiRoutes.USERS}`, data);
        navigate(appRoutes.ADMIN);
    };

    const handleDeleteUser = async () => {
        await http.delete(`${apiRoutes.USERS}/${id}`);
        navigate(appRoutes.ADMIN);
    };

    if (isLoading) {
        return <>Loading</>;
    }

    return (
        user && (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        <FormattedMessage id="app.admin.users.editTitle" />
                    </Typography>
                    <Box>
                        <TextField
                            inputProps={{ readOnly: true }}
                            defaultValue={user.id}
                            {...register('id')}
                            label={intl.formatMessage({ id: 'app.admin.users.id' })}
                        />
                    </Box>
                    <Box>
                        <TextField
                            inputProps={{ readOnly: true }}
                            defaultValue={user.email}
                            {...register('email')}
                            label={intl.formatMessage({ id: 'app.admin.users.email' })}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <FormattedMessage id="app.admin.users.isBanned" />
                        <Checkbox defaultChecked={user.isBanned} {...register('isBanned')} />
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <FormattedMessage id="app.admin.users.isAdmin" />
                        <Checkbox defaultChecked={isAdmin(user)} {...register('isAdmin')} />
                    </Box>
                    <Box>
                        <Button type="button" onClick={handleDeleteUser}>
                            Delete
                        </Button>
                        <Button component={RouterLink} to={appRoutes.ADMIN} variant="outlined">
                            Back
                        </Button>
                        <Button type="submit" variant="contained">
                            <FormattedMessage id="app.button.submit" />
                        </Button>
                    </Box>
                </Box>
            </form>
        )
    );
};

export { EditUser };
export default withAdminRole(EditUser);
