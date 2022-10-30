import { Tag } from './Tag';
import { Collection } from './Collection';

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
