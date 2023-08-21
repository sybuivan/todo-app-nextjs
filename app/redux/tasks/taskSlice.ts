import { createSlice } from '@reduxjs/toolkit';
import { initFilters } from '../../constants/default';
import { getLocalStorage } from '../../constants/localstorage';
import { IFilters, ITask, ITaskList } from '../../types/tasks';
import {
  completeTask,
  createTask,
  getTaskList,
  updateTask,
  deleteTask,
} from './tasksAction';

interface ITaskSlice {
  listData: ITaskList;
  payloadFilters: IFilters;
}

const initialState: ITaskSlice = {
  listData: {
    data: [],
    page: 0,
    totalCurrentData: 0,
    totalData: 0,
    totalPage: 0,
  },
  payloadFilters: initFilters,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateQuantitySubTask: (state, action) => {
      const index = state.listData.data.findIndex(
        (item) => item.taskId === action.payload
      );
      if (index >= 0) {
        state.listData.data[index].totalSubTasks += 1;
      }
    },
    changeFilters: (state, action) => {
      state.payloadFilters = action.payload;
    },
    deleteTaskById: (state, action) => {
      const index = state.listData.data.findIndex(
        (item) => item.taskId === action.payload
      );
      if (index >= 0) {
        state.listData.data.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.listData = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action: any) => {
        const { data } = action.payload;
        const task: ITask = {
          completeDate: null,
          dueDate: null,
          name: data.name,
          taskId: data.taskId,
          taskTypeName: null,
          totalSubTasks: 0,
        };
        if (data.length === 0) {
          state.listData.data.push(task);
        } else {
          state.listData.data.unshift(task);
        }
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const index = state.listData.data.findIndex(
          (item) => item.taskId === action.payload.data.taskId
        );
        if (index >= 0) {
          state.listData.data.splice(index, 1);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.listData.data.findIndex(
          (item) => item.taskId === action.payload.data.taskId
        );

        if (index >= 0) {
          const { dueDate, name, taskType } = action.payload.data;
          state.listData.data[index] = {
            ...state.listData.data[index],
            dueDate,
            name,
            taskTypeName: taskType?.name,
          };
        }
      });
  },
});

const { actions, reducer } = taskSlice;
export const { updateQuantitySubTask, changeFilters, deleteTaskById } = actions;
export default reducer;
