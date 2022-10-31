export interface ConcreteCollection {
    id: number;
    name: string;
    imageSrc: string;
    customColumns: string;
    description: string;
    userId: number;
    topic: {
        id: number;
        value: string;
    };
}
