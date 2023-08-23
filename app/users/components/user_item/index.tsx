import React from 'react';
import { IUserInfor } from '../../../types/admin';

const UserItem = ({ user, index }: { user: IUserInfor; index: number }) => {
  const { locked, lastName, firstName, email, userId, username } = user;
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">{index}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap">
              {firstName} {lastName}
            </p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">Administrator</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">Sep 28, 2022</p>
      </td>

      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        {locked ? (
          <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">
            Suspended
          </span>
        ) : (
          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
            Active
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserItem;
