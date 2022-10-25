import React, { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { http } from '../../shared/http/http';
import { Tag } from '../../types/Tag';

const CLOUDS_COUNT = 20;

const TagClouds = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        http.get(`${apiRoutes.TAGS}?page=1&limit=${CLOUDS_COUNT}`).then((response) => {
            setTags(response.data);
        });
    }, []);

    return (
        <Grid container gap={2} justifyContent="center">
            {tags.map((tag) => (
                <Chip key={tag.id} label={tag.value} onClick={() => alert(tag.value)} />
            ))}
        </Grid>
    );
};

export default TagClouds;
