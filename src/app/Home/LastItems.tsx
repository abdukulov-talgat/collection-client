import React, { useEffect, useState } from 'react';
import { List, Typography } from '@mui/material';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { Item } from '../../types/Item';
import { FormattedMessage } from 'react-intl';
import LastItem from './LastItem';

const LastItems = () => {
    const [lastItems, setLastItems] = useState<Item[]>([]);

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
                    <LastItem key={item.id} item={item} />
                ))}
            </List>
        </>
    );
};

export default LastItems;
