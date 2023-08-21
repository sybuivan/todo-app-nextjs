import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from '../../api/task_api';
import { taskTypeApi } from '../../api/typeTask_api';
import { IResponse } from '../../types/common';
import { IPayloadTask, ITaskInfo } from '../../types/tasks';
import { ITaskType, ITaskTypeResponse } from '../../types/taskType';

export const getTaskType = createAsyncThunk<ITaskTypeResponse[], void>(
  'taskType/getTaskType',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await taskTypeApi.getTaskType();
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createTaskType = createAsyncThunk<ITaskType, string>(
  'taskType/createTaskType',
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await taskTypeApi.createTaskType(name);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
