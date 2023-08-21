import React from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import { ITaskDetail } from '../../types/tasks';

const SubTask = ({ subTask }: { subTask: ITaskDetail }) => {
  return (
    <div className="flex items-center my-2">
      <AiOutlineLine />
      <label
        htmlFor="disabled-checked-checkbox"
        className="ml-2 text-sm font-medium text-dark dark:text-gray-500"
      >
        {subTask.name}
      </label>
    </div>
  );
};

export default SubTask;
