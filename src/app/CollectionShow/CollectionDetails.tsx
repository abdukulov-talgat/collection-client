import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteCollection } from '../../types/ItemsEndpointEntry';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';

interface CollectionDetailsProps {
    collectionId: number;
}

const CollectionDetails = ({ collectionId }: CollectionDetailsProps) => {
    const [collection, setCollection] = useState<ConcreteCollection | null>(null);

    useEffect(() => {
        http.get(`${apiRoutes.COLLECTIONS}/${collectionId}`).then((response) => {
            setCollection(response.data);
        });
    }, [collectionId]);

    return collection ? (
        <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item sm={12}>
                <Typography variant="h3" component="h2">
                    Name: {collection.name}
                </Typography>
                <Typography variant="h4" component="h4">
                    Topic: {collection.topic.value}
                </Typography>
            </Grid>
            <Grid item sm={12} md={4}>
                {collection.imageSrc && (
                    <Box component="img" src={collection.imageSrc} sx={{ maxWidth: '100%', height: 'auto' }}></Box>
                )}
            </Grid>
            <Grid item sm={12} md={8}>
                <Typography>Description:</Typography>
                <MDEditor.Markdown source={collection.description} style={{ whiteSpace: 'pre-wrap' }} />
                <ReactMarkdown>{collection.description}</ReactMarkdown>
            </Grid>
        </Grid>
    ) : (
        <CircularProgress />
    );
};

export default CollectionDetails;
