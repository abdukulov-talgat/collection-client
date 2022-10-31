import React from 'react';
import ItemShowRow from './ItemShowRow';
import { Box, Chip, Grid, IconButton } from '@mui/material';
import ItemShowDivider from './ItemShowDivider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ConcreteItem } from '../../types/ConcreteItem';
import { useIntl } from 'react-intl';
import { ItemShowColumnHelper } from '../../shared/utils/ItemShowColumnHelper';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';

interface ItemShowDetailsProps {
    item: ConcreteItem;
    onItemLike: () => void;
}

const ItemShowDetails = ({ item, onItemLike }: ItemShowDetailsProps) => {
    const intl = useIntl();
    const helper = new ItemShowColumnHelper(item);

    const handleLikeButtonClick = async () => {
        if (!item.alreadyLiked) {
            await http.post(`${apiRoutes.ITEMS}/${item.id}/likes`);
        } else {
            await http.delete(`${apiRoutes.ITEMS}/${item.id}/likes`);
        }
        onItemLike();
    };

    return (
        <Grid container spacing={1}>
            <ItemShowRow name={intl.formatMessage({ id: 'app.itemShow.name' })} value={item.name} />
            <ItemShowRow
                name={intl.formatMessage({ id: 'app.itemShow.tags' })}
                value={
                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {item.tags.map((t) => (
                            <Chip key={t.value} label={t.value} />
                        ))}
                    </Box>
                }
            />
            <ItemShowRow name={intl.formatMessage({ id: 'app.itemShow.topic' })} value={item.collection.topic.value} />
            <ItemShowRow name={intl.formatMessage({ id: 'app.itemShow.user' })} value={item.collection.user.email} />
            <ItemShowDivider />
            {helper.getFieldEntries().map((entry) => (
                <ItemShowRow key={entry.name} name={entry.name} value={entry.value} />
            ))}
            <ItemShowDivider />
            <Grid item xs={12}>
                <IconButton onClick={handleLikeButtonClick}>
                    <FavoriteIcon color={item.alreadyLiked ? 'primary' : 'action'} />
                    {item.likesCount}
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default ItemShowDetails;
