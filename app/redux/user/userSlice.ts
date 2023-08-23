import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, getRoles } from '../../constants/localstorage';
import { TRole } from '../../types/common';
import { IUser } from '../../types/user';
import { updateUserInfo } from './userAction';

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
  reducers: {
    setInformation: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    });
  },
});

const { actions, reducer } = userSlice;
export const { setInformation } = actions;
export default reducer;
