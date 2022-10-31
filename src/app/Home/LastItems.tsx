import React, { useEffect, useState } from 'react';
import { Grid, Link, List, ListItem, Typography } from '@mui/material';
import ListItemGroup from '../../common/ListItemGroup/ListItemGroup';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { Item } from '../../types/Item';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

const LastItems = () => {
    const [lastItems, setLastItems] = useState<Item[]>([]);
    const intl = useIntl();

    useEffect(() => {
        http.get(`${apiRoutes.ITEMS}?order=createdAt&direction=DESC`).then((response) =>
            setLastItems(response.data.slice(0, 5))
        );
    }, []);

    return (
        <>
            <Typography variant="h3" component="h2">
                <FormattedMessage id="app.lastItems.title" />
            </Typography>
            <List>
                {lastItems.map((item) => (
                    <ListItem key={item.id}>
                        <Grid container rowGap={1}>
                            <ListItemGroup xs={6} sm={6} title={intl.formatMessage({ id: 'app.lastItems.itemName' })}>
                                <Link component={RouterLink} to={`${appRoutes.ITEM_ROOT}/${item.id}`}>
                                    {item.name}
                                </Link>
                            </ListItemGroup>
                            <ListItemGroup
                                justifyContent="flex-end"
                                xs={6}
                                sm={6}
                                title={intl.formatMessage({ id: 'app.lastItems.collectionName' })}
                            >
                                <Link component={RouterLink} to={`${appRoutes.COLLECTION_ROOT}/${item.collectionId}`}>
                                    {item.collectionName}
                                </Link>
                            </ListItemGroup>
                            <ListItemGroup
                                justifyContent="flex-end"
                                xs={12}
                                title={intl.formatMessage({ id: 'app.lastItems.userEmail' })}
                            >
                                {item.userEmail}
                            </ListItemGroup>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default LastItems;
