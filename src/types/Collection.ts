import { ConcreteCollection } from './ConcreteCollection';

export interface Collection extends ConcreteCollection {
    itemsCount: number;
}
