import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';
import { ConcreteCollection } from '../../types/ConcreteCollection';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface CollectionDetailsControlsProps {
    collection: ConcreteCollection;
}

const CollectionDetailsControls = ({ collection }: CollectionDetailsControlsProps) => {
    const navigate = useNavigate();

    const handleDeleteButton = async () => {
        await http.delete(`${apiRoutes.COLLECTIONS}/${collection.id}`, { data: { userId: collection.userId } });
        navigate(`${appRoutes.PROFILE}/${collection.userId}`);
    };

    return (
        <Grid item>
            <IconButton type="button" onClick={handleDeleteButton}>
                <DeleteIcon color="primary" />
            </IconButton>
            <IconButton component={RouterLink} to={`${appRoutes.ITEM_CREATE}`} state={collection}>
                <AddIcon color="primary" />
            </IconButton>
        </Grid>
    );
};

export default CollectionDetailsControls;
