import { IFilters } from '../types/tasks';

export const initFilters: IFilters = {
  filters: 'ALL',
  page: 1,
  querySearch: '',
  size: 10,
  sortBy: '',
  sortDir: 'desc',
  typeId: 'ALL',
};

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';
