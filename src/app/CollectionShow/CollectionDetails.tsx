import React from 'react';
import { ConcreteCollection } from '../../types/ConcreteCollection';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import CollectionDetailsControls from './CollectionDetailsControls';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../shared/redux/authSlice';
import { isAdmin } from '../../shared/utils/authHelpers';

interface CollectionDetailsProps {
    collection: ConcreteCollection;
}

const CollectionDetails = ({ collection }: CollectionDetailsProps) => {
    const theme = useTheme();
    const { info } = useSelector(selectAuthState);

    const shouldRenderControls = info && (isAdmin(info) || collection.userId === info.id);

    return (
        <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item sm={12}>
                <Typography variant="h3" component="h2">
                    {collection.name}
                </Typography>
                <Typography variant="h4" component="h4">
                    {collection.topic.value}
                </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
                {collection.imageSrc && (
                    <Box component="img" src={collection.imageSrc} sx={{ maxWidth: '100%', height: 'auto' }}></Box>
                )}
            </Grid>
            <Grid item sm={12} md={8}>
                <MDEditor.Markdown
                    source={collection.description}
                    style={{
                        whiteSpace: 'pre-wrap',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                    }}
                />
            </Grid>
            {shouldRenderControls && <CollectionDetailsControls collection={collection} />}
        </Grid>
    );
};

export default CollectionDetails;
