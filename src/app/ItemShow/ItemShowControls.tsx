import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteItem } from '../../types/ConcreteItem';

interface ItemShowControlsProps {
    item: ConcreteItem;
}

const ItemShowControls = ({ item }: ItemShowControlsProps) => {
    const navigate = useNavigate();

    const handleDeleteButton = async () => {
        await http.delete(`${apiRoutes.ITEMS}/${item.id}`, { data: { userId: item.collection.userId } });
        navigate(`${appRoutes.COLLECTION_ROOT}/${item.collection.id}`);
    };

    return (
        <Box>
            <IconButton component={RouterLink} to={`${appRoutes.ITEM_EDIT}/${item.id}`}>
                <EditIcon color="primary" />
            </IconButton>
            <IconButton type="button" onClick={handleDeleteButton}>
                <DeleteIcon color="primary" />
            </IconButton>
        </Box>
    );
};

export default ItemShowControls;
