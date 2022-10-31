import React from 'react';
import { ConcreteItem } from '../../types/ConcreteItem';
import SearchCard from './SearchCard';
import { Grid } from '@mui/material';

interface SearchShowProps {
    items: ConcreteItem[];
}

const SearchShow = ({ items }: SearchShowProps) => {
    return (
        <Grid container>
            {items.map((it) => (
                <Grid item key={it.id}>
                    <SearchCard item={it} />
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchShow;
