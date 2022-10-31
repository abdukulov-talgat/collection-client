import React from 'react';
import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const EmptyCommentList = () => {
    return (
        <Grid item xs={12} mb={3}>
            <Typography align="center" fontStyle="italic">
                <FormattedMessage id="app.commentList.empty" />
            </Typography>
        </Grid>
    );
};

export default EmptyCommentList;
