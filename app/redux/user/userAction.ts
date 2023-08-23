import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/user_api';
import { IPayloadChangePassword, IUser } from '../../types/user';
import { toastMessage } from '../../utils/toast';

export const updateUserInfo = createAsyncThunk<any, IUser>(
  'user/updateUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateUserInfo(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);

      return rejectWithValue(error);
    }
  }
);
export const changePassword = createAsyncThunk<any, IPayloadChangePassword>(
  'user/changePassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.changePassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);

      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk<any, void>(
  'user/getMe',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getMe();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);

      return rejectWithValue(error);
    }
  }
);
