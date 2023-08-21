import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { BsFillSquareFill } from 'react-icons/bs';
import moment from 'moment';
import { BiTimer } from 'react-icons/bi';
import { BsFillFileCheckFill } from 'react-icons/bs';
import { ITask } from '../../types/tasks';
import { useAppDispatch } from '../../redux';
import { completeTask } from '../../redux/tasks/tasksAction';

interface ITaskItem {
  onClick: (taskId: Number) => void;
  task: ITask;
  taskIdSelected: number;
}

const TaskItem = ({ onClick, task, taskIdSelected }: ITaskItem) => {
  const dispatch = useAppDispatch();
  const { taskId, dueDate, name, totalSubTasks, taskTypeName, completeDate } =
    task;
  const handleClick = () => {
    onClick(taskId);
  };

  const handleOnComplete = () => {
    dispatch(completeTask(taskId));
  };

  return (
    <div
      className={`border-b-2 px-2 last:border-none w-full py-2 ${
        taskIdSelected == taskId && 'bg-gray-100'
      }`}
    >
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center">
          {completeDate ? (
            <BsFillFileCheckFill />
          ) : (
            <input
              id="disabled-checked-checkbox"
              type="checkbox"
              value=""
              onChange={handleOnComplete}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          )}

          <label
            htmlFor="disabled-checked-checkbox"
            className="ml-2 text-sm font-medium text-dark dark:text-gray-500"
          >
            {name}
          </label>
        </div>
        <AiOutlineRight
          onClick={handleClick}
          className="hover:cursor-pointer"
        />
      </div>
      <div className="flex gap-4 py-2 ml-6">
        {taskTypeName && (
          <div className="flex gap-2 items-center">
            <BsFillSquareFill color="red" size={12} />
            <p className="text-sm">{taskTypeName}</p>
          </div>
        )}
        {dueDate && (
          <div className="flex gap-1 items-center">
            <BiTimer color="blue" size={24} />
            <p className="text-sm">
              {moment(dueDate).format('DD/MM/YYYY HH:mm')}
            </p>
          </div>
        )}
        {totalSubTasks > 0 && (
          <div className="flex gap-2 items-center">
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              {totalSubTasks}
            </span>
            <p className="text-sm">Subtask</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
