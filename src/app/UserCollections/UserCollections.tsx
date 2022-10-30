import React, { useEffect, useState } from 'react';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { Collection } from '../../types/Collection';
import { Button, Link, List, ListItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { appRoutes } from '../../shared/constants/appRoutes';

interface UserCollectionsProps {
    profileId: string;
}

const UserCollections = ({ profileId }: UserCollectionsProps) => {
    const [collections, setCollections] = useState<Collection[]>([]);

    useEffect(() => {
        http.get(`${apiRoutes.COLLECTIONS}?userId=${profileId}`).then((response) => {
            setCollections(response.data);
        });
    }, [profileId]);

    return (
        <>
            <List>
                {collections.map((c) => (
                    <ListItem key={c.id}>
                        <Link component={RouterLink} to={`${appRoutes.COLLECTION_ROOT}/${c.id}`}>
                            {c.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
            <div>
                <Button
                    component={RouterLink}
                    state={{ userId: profileId }}
                    to={appRoutes.COLLECTION_CREATE}
                    type="button"
                    variant="outlined"
                >
                    Create
                </Button>
            </div>
        </>
    );
};

export default UserCollections;
