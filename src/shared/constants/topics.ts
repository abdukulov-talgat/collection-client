import { http } from '../http/http';
import { apiRoutes } from './apiRoutes';

interface Topic {
    id: number;
    value: string;
}

let topics: Topic[];

export const initTopics = async () => {
    const response = await http.get<Topic[]>(`${apiRoutes.TOPICS}`);
    topics = response.data;
};

export const getTopics = () => topics;
