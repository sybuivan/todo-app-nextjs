import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth_api';
import { IPayloadLogin, IPayloadRegiter } from '../../types/auth';
import { toastMessage } from '../../utils/toast';

export const loginUser = createAsyncThunk<any, IPayloadLogin>(
  'user/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);

      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk<any, IPayloadRegiter>(
  'user/registerUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.register(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
