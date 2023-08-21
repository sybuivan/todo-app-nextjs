import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskDetailApi } from '../../api/task_detail_api';
import { IResponse } from '../../types/common';
import { ITaskDetail } from '../../types/tasks';

export const createTaskDetail = createAsyncThunk<
  IResponse<ITaskDetail>,
  {
    taskId: number;
    name: string;
  }
>('taskDetail/createTask', async ({ name, taskId }, { rejectWithValue }) => {
  try {
    const { data } = await taskDetailApi.createTask(taskId, name);
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
