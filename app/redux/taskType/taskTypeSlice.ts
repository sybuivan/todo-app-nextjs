import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../constants/localstorage';
import { ITaskList } from '../../types/tasks';
import { ITaskTypeResponse } from '../../types/taskType';
import { createTaskType, getTaskType } from './taskTypeAction';

interface ITaskTypeSlice {
  taskTypeList: ITaskTypeResponse[];
}

const initialState: ITaskTypeSlice = {
  taskTypeList: [],
};

const taskTypeSlice = createSlice({
  name: 'taskType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskType.fulfilled, (state, action) => {
        state.taskTypeList = action.payload;
      })
      .addCase(createTaskType.fulfilled, (state, action: any) => {
        if (action.payload) {
          state.taskTypeList.unshift({
            ...action.payload,
            totalTask: 0,
          });
        }
      });
  },
});

const { actions, reducer } = taskTypeSlice;
export default reducer;
