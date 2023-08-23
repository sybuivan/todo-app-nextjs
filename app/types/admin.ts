import { IFilters, IStatus } from './common';
import { IUser } from './user';

export interface IFiltersUser extends IFilters {}

export interface IUserInfor extends IUser {
  userId: number;
  locked: boolean;
}
