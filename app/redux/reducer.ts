import authSlice from './auth/authSlice';
import taskSlice from './tasks/taskSlice';
import taskTypeSlice from './taskType/taskTypeSlice';
import userSlice from './user/userSlice';
import adminSlice from './admin/adminSlice';
import apiSlice from './api/apiSlice';

export const reducer = {
  authSlice,
  taskSlice,
  taskTypeSlice,
  userSlice,
  adminSlice,
  apiSlice,
};
