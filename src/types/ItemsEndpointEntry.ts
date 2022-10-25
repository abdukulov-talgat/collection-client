import { Tag } from './Tag';

//TODO: Split to separate files

export interface ItemsEndpointEntry {
    id: number;
    name: string;
    customColumns?: string;
    createdAt: string;
    tags: Tag[];
    collectionId: number;
    collectionName: string;
    userEmail: string;
}

export interface Collection {
    id: number;
    name: string;
    itemsCount: number;
    customColumns?: string;
    description: string;
    userId: number;
    topic: {
        id: number;
        value: string;
    };
}
