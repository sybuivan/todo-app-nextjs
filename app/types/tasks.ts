import { IStatus } from './common';
import { ITaskType } from './taskType';

export interface ITask {
  taskId: number;
  name: string;
  dueDate: Date;
  completeDate: Date;
  totalSubTasks: number;
  taskTypeName: string;
}

export interface ITaskList {
  page: number;
  totalData: number;
  totalPage: number;
  totalCurrentData: number;
  data: ITask[];
}

export interface ITaskInfo extends ITime {
  taskId: number;
  taskType: ITaskType;
  name: string;
  completeDate: Date;
  dueDate: Date;
  description: string;
  taskDetailList: ITaskDetail[];
}

export interface ITaskDetail extends ITime {
  taskDetailId: number;
  name: string;
}

export interface ITime {
  createdTime: Date;
  modifiedTime: Date;
}

export interface IPayloadTask {
  name: string;
  description?: string;
  typeId?: number;
  dueDate?: Date;
}

export interface IFilters {
  page: number;
  size: number;
  sortBy: string;
  sortDir: 'desc' | 'asc';
  querySearch: string;
  typeId: 'ALL' | number;
  filters: IStatus;
}
