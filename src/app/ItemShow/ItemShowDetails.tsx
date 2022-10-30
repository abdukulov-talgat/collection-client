import React from 'react';
import ItemShowRow from './ItemShowRow';
import { Box, Chip, Grid, IconButton } from '@mui/material';
import ItemShowDivider from './ItemShowDivider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ConcreteItem } from '../../types/ConcreteItem';
import { useIntl } from 'react-intl';
import { ItemShowColumnHelper } from '../../shared/utils/ItemShowColumnHelper';

interface ItemShowDetailsProps {
    item: ConcreteItem;
}

const ItemShowDetails = ({ item }: ItemShowDetailsProps) => {
    const intl = useIntl();
    const helper = new ItemShowColumnHelper(item);

    return (
        <Grid container spacing={1}>
            <ItemShowRow name={intl.formatMessage({ id: 'app.item-show.name' })} value={item.name} />
            <ItemShowRow
                name={intl.formatMessage({ id: 'app.item-show.tags' })}
                value={
                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {item.tags.map((t) => (
                            <Chip key={t.value} label={t.value} />
                        ))}
                    </Box>
                }
            />
            <ItemShowRow name={intl.formatMessage({ id: 'app.item-show.topic' })} value={item.collection.topic.value} />
            <ItemShowRow name={intl.formatMessage({ id: 'app.item-show.user' })} value={item.collection.user.email} />
            <ItemShowDivider />
            {helper.getFieldEntries().map((entry) => (
                <ItemShowRow key={entry.name} name={entry.name} value={entry.value} />
            ))}
            <ItemShowDivider />
            <Grid item xs={12}>
                <IconButton>
                    <FavoriteIcon color={item.alreadyLiked ? 'primary' : 'action'} />
                    {item.likesCount}
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default ItemShowDetails;
