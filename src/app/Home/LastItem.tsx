import React from 'react';
import { Grid, Link, ListItem } from '@mui/material';
import ListItemGroup from '../../common/ListItemGroup/ListItemGroup';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import { Item } from '../../types/Item';
import { useIntl } from 'react-intl';

interface LastItemProps {
    item: Item;
}

const LastItem = ({ item }: LastItemProps) => {
    const intl = useIntl();

    return (
        <ListItem>
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
    );
};

export default LastItem;
