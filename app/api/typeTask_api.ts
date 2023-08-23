import { mainURL } from '../config';
import { IPayloadChangePassword, IUser } from '../types/user';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const taskTypeApi = {
  getTaskType: () => {
    return client.get('/task-type');
  },
  createTaskType: (name: string) => {
    return client.post('/task-type', { name });
  },
  updateTaskType: (typeId: number, name: string) => {
    return client.put(`/task-type/${typeId}`, { name });
  },
};
