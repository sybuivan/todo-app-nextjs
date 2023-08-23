import queryString from 'query-string';
import { mainURL } from '../config';
import { IPayloadLogin } from '../types/auth';
import { IDataList, IResponse } from '../types/common';
import { IFiltersTask, IPayloadTask, ITask, ITaskInfo } from '../types/tasks';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const taskApi = {
  createTask: (name: string) => {
    return client.post<IResponse<ITaskInfo>>('/tasks', {
      name,
    });
  },
  updateTask: (taskId: number, payload: IPayloadTask) => {
    return client.put(`/tasks/${taskId}`, payload);
  },
  completeTask: (taskId: number) => {
    return client.put(`/tasks/${taskId}/completed-task`);
  },
  deleteTask: (taskId: number) => {
    return client.delete(`/tasks/${taskId}`);
  },
  getTaskList: (filters: IFiltersTask) => {
    const params = queryString.stringify(filters);
    return client.get<IDataList<ITask>>(`/tasks?${params}`);
  },
  getTaskById: (taskId: number) => {
    return client.get<ITaskInfo>(`/tasks/${taskId}`);
  },
};
