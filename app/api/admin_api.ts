import queryString from 'query-string';
import { mainURL } from '../config';
import { IFiltersUser } from '../types/admin';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const adminApi = {
  getAllUser: (filters: IFiltersUser) => {
    const params = queryString.stringify(filters);
    return client.get(`/admin/users?${params}`);
  },
};
