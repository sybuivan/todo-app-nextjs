import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth_api';
import {
  IPayloadLogin,
  IPayloadRegiter,
  IPayloadResetPassword,
} from '../../types/auth';
import { toastMessage } from '../../utils/toast';

export const loginUser = createAsyncThunk<any, IPayloadLogin>(
  'auth/loginUser',
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
  'auth/registerUser',
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

export const forgotPassword = createAsyncThunk<any, string>(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await authApi.forgotPassword(email);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk<any, IPayloadResetPassword>(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authApi.resetPassword(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
