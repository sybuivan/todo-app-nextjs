'use client';
import React, { useEffect } from 'react';
import Filters from './components/filters';
import UserItem from './components/user_item';
import Pagination from '../components/pagination';
import Loading from '../components/loading';
import { useAppDispatch, useAppSelector } from '../redux';
import { getAllUsers } from '../redux/admin/adminAction';

const Users = () => {
  const dispatch = useAppDispatch();
  const {
    userList: { data, page, totalCurrentData, totalData, totalPage },
    filters,
  } = useAppSelector((state) => state.adminSlice);

  useEffect(() => {
    dispatch(getAllUsers(filters));
  }, [filters]);

  if (data.length === 0) return <Loading />;
  return (
    <div className="w-full mx-auto px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <Filters />
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Full Name</th>
                <th className="px-5 py-3">User Role</th>
                <th className="px-5 py-3">Created at</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {data.length > 0 ? (
                <>
                  {data.map((user, index) => (
                    <UserItem user={user} key={user.userId} index={index} />
                  ))}
                </>
              ) : (
                <p className="color-red-600">User list empty</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center border-t bg-white px-5 py-5">
          <Pagination currentPage={1} totalPage={totalPage} />
        </div>
      </div>
    </div>
  );
};

export default Users;
