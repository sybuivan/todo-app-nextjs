import { ROLE_ADMIN, ROLE_USER } from '../constants/default';

export interface IResponse<T> {
  message: string;
  data: T;
}

export interface IOption {
  value: any;
  label: string;
}
export type IStatus = 'ALL' | 'COMPLETED' | 'INCOMPLETE';

export interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

export interface IErrorsDetail {
  [x: string]: { id: string; message: string }[];
}

export type TRole = 'ROLE_USER' | 'ROLE_ADMIN';
