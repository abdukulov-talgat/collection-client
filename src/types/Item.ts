import { Tag } from './Tag';

//TODO: Split to separate files

export interface Item {
    id: number;
    name: string;
    customColumns: Record<string, any>;
    collectionId: number;
    createdAt: string;
    tags: Tag[];
    collectionName: string;
    userEmail: string;
}

export interface ConcreteItem {
    id: number;
    name: string;
    customColumns: Record<string, any>;
    collectionId: number;
    createdAt: string;
    collection: Collection & { user: { id: number; email: string } };
    tags: Tag[];
    likesCount: number;
    alreadyLiked: boolean;
}

// const item: ConcreteItem = null;

export interface Collection extends ConcreteCollection {
    itemsCount: number;
}

export interface ConcreteCollection {
    id: number;
    name: string;
    imageSrc: string;
    customColumns?: string;
    description: string;
    userId: number;
    topic: {
        id: number;
        value: string;
    };
}
