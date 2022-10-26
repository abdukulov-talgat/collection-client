import React, { PropsWithChildren } from 'react';
import { Grid, Typography } from '@mui/material';
import { GridProps } from '@mui/material/Grid/Grid';

type ListItemGroupProps = {
    title: string;
} & GridProps;

const ListItemGroup = ({ title, children, ...rest }: PropsWithChildren<ListItemGroupProps>) => {
    return (
        <Grid container item {...rest} columnGap={1}>
            <Typography component="h3" fontWeight={700}>
                {title}
            </Typography>
            {children}
        </Grid>
    );
};

export default ListItemGroup;
