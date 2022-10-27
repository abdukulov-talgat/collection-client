import React from 'react';

interface CollectionItemsProps {
    collectionId: number;
}

const CollectionItems = ({ collectionId }: CollectionItemsProps) => {
    return <div>ItemsList for collection {collectionId}</div>;
};

export default CollectionItems;
