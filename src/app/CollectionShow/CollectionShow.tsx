import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionDetails from './CollectionDetails';
import CollectionItems from './CollectionItems';

const CollectionShow = () => {
    const { id: collectionId } = useParams();

    return (
        <>
            <CollectionDetails collectionId={Number(collectionId)} />
            <CollectionItems collectionId={Number(collectionId)} />
        </>
    );
};

export default CollectionShow;
