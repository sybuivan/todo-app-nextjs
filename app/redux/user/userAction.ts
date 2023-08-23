import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/user_api';
import { IPayloadLogin, IPayloadRegiter } from '../../types/auth';
import { IUser } from '../../types/user';
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
