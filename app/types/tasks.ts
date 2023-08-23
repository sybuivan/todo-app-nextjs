import { IFilters, IStatus } from './common';
import { ITaskType } from './taskType';

export interface ITask {
  taskId: number;
  name: string;
  dueDate: Date;
  completeDate: Date;
  totalSubTasks: number;
  taskTypeName: string;
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

export interface IFiltersTask extends IFilters {
  typeId: 'ALL' | number;
  filters: IStatus;
}
