import React, { useEffect, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { http } from '../../shared/http/http';
import { Tag } from '../../types/Tag';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

const TagClouds = () => {
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        http.get(apiRoutes.TAGS).then((response) => {
            setTags(response.data);
        });
    }, []);

    return (
        <Grid container gap={2} justifyContent="center">
            {tags.map((tag) => (
                <Chip
                    key={tag.id}
                    label={tag.value}
                    clickable
                    component={RouterLink}
                    to={`${appRoutes.TAGS_SEARCH}/${tag.value}`}
                />
            ))}
        </Grid>
    );
};

export default TagClouds;
