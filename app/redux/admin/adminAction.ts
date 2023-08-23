import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFiltersUser, IUserInfor } from '../../types/admin';
import { adminApi } from '../../api/admin_api';
import { IDataList } from '../../types/common';
import { toastMessage } from '../../utils/toast';

export const getAllUsers = createAsyncThunk<
  IDataList<IUserInfor>,
  IFiltersUser
>('admin/getAllUsers', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await adminApi.getAllUser(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
