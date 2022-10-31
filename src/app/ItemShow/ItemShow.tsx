import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteItem } from '../../types/ConcreteItem';
import { Box, CircularProgress } from '@mui/material';
import ItemShowDetails from './ItemShowDetails';
import ItemShowComments from './ItemShowComments';
import ItemShowControls from './ItemShowControls';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../shared/redux/authSlice';
import { isAdmin } from '../../shared/utils/authHelpers';

const ItemShow = () => {
    const { id } = useParams();
    const [item, setItem] = useState<ConcreteItem | null>(null);
    const [shouldRefetch, setShouldRefetch] = useState(true);
    const { info } = useSelector(selectAuthState);

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

    const shouldRenderControls = info && (isAdmin(info) || item.collection.userId === info.id);

    return (
        <Box>
            <ItemShowDetails item={item} onItemLike={() => setShouldRefetch(true)} />
            {shouldRenderControls && <ItemShowControls item={item} />}
            <ItemShowComments itemId={item.id} />
        </Box>
    );
};

export default ItemShow;
