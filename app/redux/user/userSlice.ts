import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/user';
import { updateUserInfo, getMe } from './userAction';

interface IUserSlice {
  user: IUser;
}

const initialState: IUserSlice = {
  user: {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

const { actions, reducer } = userSlice;
export default reducer;
