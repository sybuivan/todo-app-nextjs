import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from '../../api/task_api';
import { initFilters } from '../../constants/default';
import { IPayloadLogin } from '../../types/auth';
import { IDataList, IResponse } from '../../types/common';
import { IFiltersTask, IPayloadTask, ITask, ITaskInfo } from '../../types/tasks';

export const getTaskList = createAsyncThunk<IDataList<ITask>, IFiltersTask>(
  'tasks/getTaskList',
  async (filters, { rejectWithValue }) => {
    try {
      const { data } = await taskApi.getTaskList(filters);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getTaskById = createAsyncThunk<ITaskInfo, number>(
  'tasks/getTaskById',
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await taskApi.getTaskById(taskId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk<IResponse<ITaskInfo>, string>(
  'tasks/createTask',
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await taskApi.createTask(name);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const completeTask = createAsyncThunk<IResponse<ITaskInfo>, number>(
  'tasks/completeTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await taskApi.completeTask(taskId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateTask = createAsyncThunk<
  IResponse<ITaskInfo>,
  {
    taskId: number;
    payload: IPayloadTask;
  }
>('tasks/updateTask', async ({ payload, taskId }, { rejectWithValue }) => {
  try {
    const { data } = await taskApi.updateTask(taskId, payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteTask = createAsyncThunk<any, number>(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const { data } = await taskApi.deleteTask(taskId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
