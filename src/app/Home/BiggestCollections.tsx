import React, { useEffect, useState } from 'react';
import { Grid, Link, List, ListItem, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ListItemGroup from '../../common/ListItemGroup/ListItemGroup';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { Collection } from '../../types/ItemsEndpointEntry';
import { FormattedMessage, useIntl } from 'react-intl';
import { appRoutes } from '../../shared/constants/appRoutes';

const COLLECTIONS_TO_SHOW = 5;

const BiggestCollections = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const intl = useIntl();

    useEffect(() => {
        http.get(`${apiRoutes.COLLECTIONS}?order=itemsCount&direction=DESC&limit=${COLLECTIONS_TO_SHOW}`).then(
            (response) => setCollections(response.data)
        );
    }, []);

    return (
        <>
            <Typography variant="h3" component="h2">
                {collections.length} <FormattedMessage id="app.biggest.title" />
            </Typography>
            <List>
                {collections.map((collection) => (
                    <ListItem key={collection.id}>
                        <Grid container rowGap={1}>
                            <ListItemGroup xs={6} sm={6} title={intl.formatMessage({ id: 'app.biggest.name' })}>
                                <Link component={RouterLink} to={`${appRoutes.CONCRETE_COLLECTION}/${collection.id}`}>
                                    {collection.name}
                                </Link>
                            </ListItemGroup>
                            <ListItemGroup
                                justifyContent="flex-end"
                                xs={6}
                                sm={6}
                                title={intl.formatMessage({ id: 'app.biggest.count' })}
                            >
                                {collection.itemsCount.toString()}
                            </ListItemGroup>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default BiggestCollections;
