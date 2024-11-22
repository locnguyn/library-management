import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:8000/api';

export enum Endpoint {
    members = 'member',
    books = 'book',
    loans = 'loan',
}

export const getEndpoint = (endpoint: Endpoint, id?: string) => {
    return `/${endpoint}/${id ? id : ''}`;
}

export default axios.create({
  baseURL: baseUrl,
});
