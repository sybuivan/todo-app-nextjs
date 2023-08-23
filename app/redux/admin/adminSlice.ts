import { createSlice } from '@reduxjs/toolkit';
import { initFilters } from '../../constants/default';
import { IFiltersUser, IUserInfor } from '../../types/admin';
import { IDataList } from '../../types/common';
import { getAllUsers } from './adminAction';

interface IUserSlice {
  userList: IDataList<IUserInfor>;
  filters: IFiltersUser;
}

const initialState: IUserSlice = {
  userList: {
    data: [],
    page: 0,
    totalCurrentData: 0,
    totalData: 0,
    totalPage: 0,
  },
  filters: {
    ...initFilters,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

const { actions, reducer } = adminSlice;
export default reducer;
