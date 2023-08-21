import { mainURL } from '../config';
import { IPayloadLogin } from '../types/auth';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const taskDetailApi = {
  createTask: (id: number, name: string) => {
    return client.post(`/task-detail/task/${id}`, { name });
  },
  updateTaskDetail: (id: number, name: string) => {
    return client.put(`/task-detail/${id}/task`, {
      name,
    });
  },
  deleteTask: (id: string) => {
    return client.delete(`/task-detail/${id}/task`);
  },
  getTaskById: (id: string) => {
    return client.get(`/task-detail/${id}/task`);
  },
};
