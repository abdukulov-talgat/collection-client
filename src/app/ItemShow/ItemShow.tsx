import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteItem } from '../../types/ConcreteItem';
import { Box, CircularProgress } from '@mui/material';
import ItemShowDetails from './ItemShowDetails';
import ItemShowComments from './ItemShowComments';

const ItemShow = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ConcreteItem | null>(null);
    const [shouldRefetch, setShouldRefetch] = useState(true);

    useEffect(() => {
        if (shouldRefetch) {
            http.get<ConcreteItem>(`${apiRoutes.ITEMS}/${id}`).then((response) => {
                setItem(response.data);
                setShouldRefetch(false);
            });
        }
    }, [id, shouldRefetch]);

    if (!item) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <ItemShowDetails item={item} onItemLike={() => setShouldRefetch(true)} />
            <ItemShowComments itemId={item.id} />
        </Box>
    );
};

export default ItemShow;
