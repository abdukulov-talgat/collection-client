import React from 'react';
import { Grid } from '@mui/material';
import LastItems from './LastItems';
import BiggestCollections from './BiggestCollections';
import TagClouds from './TagClouds';

const Home = () => {
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <LastItems />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BiggestCollections />
                </Grid>
                <Grid item xs={12}>
                    <TagClouds />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
