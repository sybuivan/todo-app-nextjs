import { IFilters } from '../types/common';
import { IFiltersTask } from '../types/tasks';

export const initFilters: IFilters = {
  page: 1,
  querySearch: '',
  size: 10,
  sortBy: '',
  sortDir: 'desc',
};

export const initFiltersTask: IFiltersTask = {
  ...initFilters,
  filters: 'ALL',
  typeId: 'ALL',
};

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';
