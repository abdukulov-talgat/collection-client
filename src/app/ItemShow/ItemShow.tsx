import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteItem } from '../../types/Item';
import { Box, Chip, CircularProgress, Divider, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ItemShowColumnHelper } from '../../shared/utils/ItemShowColumnHelper';
import ItemShowRow from './ItemShowRow';
import { useIntl } from 'react-intl';
import ItemShowDivider from './ItemShowDivider';
import ItemShowDetails from './ItemShowDetails';
import ItemShowComments from './ItemShowComments';

const ItemShow = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ConcreteItem | null>(null);

    useEffect(() => {
        http.get<ConcreteItem>(`${apiRoutes.ITEMS}/${id}`).then((response) => {
            setItem(response.data);
        });
    }, [id]);

    if (!item) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <ItemShowDetails item={item} />
            <ItemShowComments itemId={item.id} />
        </Box>
    );
};

export default ItemShow;
