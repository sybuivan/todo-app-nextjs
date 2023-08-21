import { mainURL } from '../config';
import { IPayloadChangePassword, IPayloadUser } from '../types/user';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const userApi = {
  updateUserInfo: (payload: IPayloadUser) => {
    return client.put('/users/update-user-info', payload);
  },
  changePassword: (payload: IPayloadChangePassword) => {
    return client.put('/users/change-password', payload);
  },
};
