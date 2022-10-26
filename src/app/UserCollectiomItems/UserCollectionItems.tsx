import React from 'react';
import { useParams } from 'react-router-dom';

const UserCollectionItems = () => {
    const { id: collectionId } = useParams();

    return (
        <div>
            <span></span>
            Items for collection with ID: {collectionId}
        </div>
    );
};

export default UserCollectionItems;
