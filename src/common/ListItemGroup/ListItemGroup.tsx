import React from 'react';
import { Grid, Typography } from '@mui/material';
import { GridProps } from '@mui/material/Grid/Grid';

type ListItemGroupProps = {
    title: string;
    text: string;
} & GridProps;

const ListItemGroup = ({ title, text, ...rest }: ListItemGroupProps) => {
    return (
        <Grid container item {...rest} columnGap={1}>
            <Typography component="h3" fontWeight={700}>
                {title}
            </Typography>
            {text}
        </Grid>
    );
};

export default ListItemGroup;
