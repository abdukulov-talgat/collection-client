import React from 'react';
import { Grid, Link, ListItem } from '@mui/material';
import ListItemGroup from '../../common/ListItemGroup/ListItemGroup';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import { useIntl } from 'react-intl';
import { Collection } from '../../types/Collection';

interface BiggestCollectionProps {
    collection: Collection;
}

const BiggestCollection = ({ collection }: BiggestCollectionProps) => {
    const intl = useIntl();

    return (
        <ListItem>
            <Grid container rowGap={1}>
                <ListItemGroup xs={6} sm={6} title={intl.formatMessage({ id: 'app.biggest.name' })}>
                    <Link component={RouterLink} to={`${appRoutes.COLLECTION_ROOT}/${collection.id}`}>
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
    );
};

export default BiggestCollection;
