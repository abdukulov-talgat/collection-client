import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CollectionDetails from './CollectionDetails';
import CollectionItems from './CollectionItems';
import { http } from '../../shared/http/http';
import { apiRoutes } from '../../shared/constants/apiRoutes';
import { ConcreteCollection } from '../../types/Item';
import { CircularProgress } from '@mui/material';

const CollectionShow = () => {
    const { id: collectionId } = useParams();
    const [collection, setCollection] = useState<ConcreteCollection | null>(null);

    useEffect(() => {
        http.get(`${apiRoutes.COLLECTIONS}/${collectionId}`).then((response) => {
            setCollection(response.data);
        });
    }, [collectionId]);

    if (!collection) {
        return <CircularProgress />;
    }

    return (
        <>
            <CollectionDetails collection={collection} />
            <CollectionItems collection={collection} />
        </>
    );
};

export default CollectionShow;
