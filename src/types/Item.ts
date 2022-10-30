import { Tag } from './Tag';

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
