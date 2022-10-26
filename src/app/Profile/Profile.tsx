import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../shared/redux/authSlice';
import { Grid, Typography } from '@mui/material';
import UserCollections from '../UserCollections/UserCollections';

const Profile = () => {
    const { info } = useSelector(selectAuthState);
    const { id: profileId } = useParams<{ id: string }>();

    return (
        <Grid container>
            <Grid item>
                <Typography variant="h3" component="h2">
                    Collections
                </Typography>
                <UserCollections profileId={profileId as string} />
            </Grid>
        </Grid>
    );
};

export default Profile;
