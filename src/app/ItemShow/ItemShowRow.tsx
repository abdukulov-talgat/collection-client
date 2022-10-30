import React from 'react';
import { Grid, Typography } from '@mui/material';

interface ItemShowRowProps {
    name: string;
    value: React.ReactNode;
}

const ItemShowRow = ({ name, value }: ItemShowRowProps) => {
    return (
        <Grid item xs={12}>
            <Typography variant="h5" component="h3">
                {name}
            </Typography>
            <Typography>{value}</Typography>
        </Grid>
    );
};

export default ItemShowRow;
