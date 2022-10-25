import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { Credentials, signIn } from '../../shared/redux/thunks/signInThunk';
import { useAppDispatch } from '../../shared/redux/store';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../shared/redux/authSlice';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

const SignIn = () => {
    const intl = useIntl();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { status, error, isAuth } = useSelector(selectAuthState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Credentials>();

    const handleFormSubmit = async (credentials: Credentials) => {
        await dispatch(signIn(credentials));
    };

    if (isAuth) {
        return <Navigate to={appRoutes.HOME} />;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" component="h2" mb={3}>
                <FormattedMessage id="app.form.signIn" />
            </Typography>
            {status === 'failed' && (
                <Box color={theme.palette.error.main}>
                    <FormattedMessage id={error as string} />
                </Box>
            )}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Box sx={{ my: 2 }}>
                    <TextField
                        label={intl.formatMessage({ id: 'app.form.email.label' })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email', {
                            required: {
                                value: true,
                                message: intl.formatMessage({ id: 'app.form.email.errorMessage' }),
                            },
                        })}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <TextField
                        label={intl.formatMessage({ id: 'app.form.password.label' })}
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password', {
                            required: {
                                value: true,
                                message: intl.formatMessage({ id: 'app.form.password.errorMessage' }),
                            },
                        })}
                    />
                </Box>
                <Box sx={{ my: 2 }}>
                    <Button type="submit" variant="contained" fullWidth disabled={status === 'loading'}>
                        <FormattedMessage id="app.form.signInButton" />
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default SignIn;
