import { mainURL } from '../config';
import {
  IPayloadLogin,
  IPayloadRegiter,
  IPayloadResetPassword,
} from '../types/auth';
import { createClient } from './axios_client';

const client = createClient(mainURL);

export const authApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  register: (payload: IPayloadRegiter) => {
    return client.post('/auth/register', payload);
  },
  refreshToken: (refreshToken: string) => {
    return client.post('/auth/refresh-token', { refreshToken });
  },
  forgotPassword: (email: string) => {
    return client.post('/auth/forgot-password', {
      email,
    });
  },
  resetPassword: (payload: IPayloadResetPassword) => {
    return client.post('/auth/reset-password', payload);
  },
};
