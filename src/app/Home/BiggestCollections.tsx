import React, { useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { Collection } from '../../types/Collection';
import { FormattedMessage } from 'react-intl';
import BiggestCollection from './BiggestCollection';

const BiggestCollections = () => {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        http.get(`${apiRoutes.COLLECTIONS}?order=itemsCount&direction=DESC`).then((response) =>
            setCollections(response.data.slice(0, 5))
        );
    }, []);

    return (
        <>
            <Typography variant="h3" component="h2">
                {collections.length} <FormattedMessage id="app.biggest.title" />
            </Typography>
            <List>
                {collections.map((collection) => (
                    <BiggestCollection key={collection.id} collection={collection} />
                ))}
            </List>
        </>
    );
};

export default BiggestCollections;
