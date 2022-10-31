import React from 'react';
import { ConcreteItem } from '../../types/ConcreteItem';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { appRoutes } from '../../shared/constants/appRoutes';
import { Link as RouterLink } from 'react-router-dom';

interface SearchCardProps {
    item: ConcreteItem;
}

const SearchCard = ({ item }: SearchCardProps) => {
    return (
        <Card>
            <CardContent>
                <Typography fontWeight={700} color="text.secondary" gutterBottom>
                    {item.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.tags.map((tag) => tag.value).join(', ')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={RouterLink} to={`${appRoutes.ITEM_ROOT}/${item.id}`}>
                    <FormattedMessage id={'app.dictionary.learnMore'} />
                </Button>
            </CardActions>
        </Card>
    );
};

export default SearchCard;
