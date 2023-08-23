'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AddFieldButton from '../components/add_field_button';
import { FormInput } from '../components/hook_form/TextField';
import Loading from '../components/loading';
import Pagination from '../components/pagination';
import Search from '../components/search';
import { useDelayTimeout } from '../hooks/useDelayTimeout';
import { useIsRequestPending } from '../hooks/useStatus';
import { useAppDispatch, useAppSelector } from '../redux';
import {
  createTask,
  getTaskById,
  getTaskList,
} from '../redux/tasks/tasksAction';
import { changeFilters } from '../redux/tasks/taskSlice';
import { IOption, IStatus } from '../types/common';
import { IFiltersTask, ITaskInfo } from '../types/tasks';
import TaskDetail from './components/TaskDetail';
import TaskItem from './components/TaskItem';

const schemaTask = yup.object().shape({
  name: yup.string().required('Name task not empty.'),
});

const Today = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const delay = useDelayTimeout();
  const isLoading = useIsRequestPending('tasks', 'getTaskList');

  const {
    listData: { data, totalCurrentData, totalPage, totalData },
    payloadFilters,
  } = useAppSelector((state) => state.taskSlice);

  const { token, roles } = useAppSelector((state) => state.authSlice);
  const { taskTypeList } = useAppSelector((state) => state.taskTypeSlice);

  const [taskIdSelected, setTaskIdSelected] = useState<number | null>(null);
  const [taskInfo, setTaskInfo] = useState<ITaskInfo | undefined>();

  const typeOptions: IOption[] = useMemo(() => {
    return taskTypeList.map((item) => ({
      value: item.typeId,
      label: item.name,
    }));
  }, [taskTypeList]);

  const handleSelected = (taskId: number) => {
    setTaskIdSelected(taskId);
  };

  const { control, handleSubmit, reset, setFocus } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schemaTask),
  });

  const handleOnClose = () => {
    setTaskIdSelected(null);
  };

  const handleOnSubmit = ({ name }: { name: string }) => {
    dispatch(createTask(name)).then(() => {
      reset({ name: '' });
      setFocus('name');
    });
  };

  const handleChangeFilter = (name: string, value: any) => {
    const newFilters: IFiltersTask = {
      ...payloadFilters,
      [name]: value,
    };
    if (name === 'querySearch') {
      return delay(() => {
        dispatch(changeFilters(newFilters));
      });
    }
    dispatch(changeFilters(newFilters));
  };

  const handleOnChangePage = (page: number) => {
    const newFilters: IFiltersTask = {
      ...payloadFilters,
      page,
    };
    dispatch(changeFilters(newFilters));
  };

  useEffect(() => {
    if (!taskIdSelected) {
      return;
    }
    dispatch(getTaskById(taskIdSelected)).then((data: any) => {
      if (data.payload) {
        setTaskInfo(data.payload);
      }
    });
  }, [taskIdSelected]);

  useEffect(() => {
    if (token) dispatch(getTaskList(payloadFilters));
  }, [payloadFilters]);

  if (isLoading) return <Loading />;

  if (!token) return router.push('/login');
  if (!roles.includes('ROLE_USER')) return router.push('/');

  return (
    <div className="flex flex-row gap-12">
      <div className={taskIdSelected ? 'shrink grow-[8]' : 'shrink grow-[12]'}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg mb-3">Tasks - ({totalData})</h3>
          <Search onChange={handleChangeFilter} name="querySearch" />
        </div>
        <div className="mb-6">
          <div className="flex gap-2 items-center">
            <h3 className="min-w-[70px]">Status: </h3>
            <div className="flex justify-between my-4 w-[30%] gap-2">
              <button
                className={`px-4 py-2 ${
                  payloadFilters.filters === 'ALL'
                    ? 'bg-blue-500 text-white'
                    : ''
                }
            rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-blue-300`}
                onClick={() => handleChangeFilter('filters', 'ALL')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 ${
                  payloadFilters.filters === 'COMPLETED'
                    ? 'bg-blue-500 text-white'
                    : ''
                } rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none`}
                onClick={() => handleChangeFilter('filters', 'COMPLETED')}
              >
                Completed
              </button>
              <button
                className={`px-4 py-2 ${
                  payloadFilters.filters === 'INCOMPLETE'
                    ? 'bg-blue-500 text-white'
                    : ''
                } rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none`}
                onClick={() => handleChangeFilter('filters', 'INCOMPLETE')}
              >
                Incomplete
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center w-[25%] mb-3">
            <h3 className="min-w-[70px]">Type: </h3>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={payloadFilters.typeId}
              onChange={(e) => handleChangeFilter('typeId', e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              <option key="ALL" value="ALL">
                ALL
              </option>
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center w-[25%]">
            <h3 className="min-w-[70px]">Sort: </h3>
            <button
              className={`px-4 py-2 ${
                payloadFilters.sortDir === 'desc'
                  ? 'bg-blue-500 text-white'
                  : ''
              } rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none`}
              onClick={() => handleChangeFilter('sortDir', 'desc')}
            >
              Descending
            </button>
            <button
              className={`px-4 py-2 ${
                payloadFilters.sortDir === 'asc' ? 'bg-blue-500 text-white' : ''
              }
            rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-blue-300`}
              onClick={() => handleChangeFilter('sortDir', 'asc')}
            >
              Ascending
            </button>
          </div>
        </div>

        <AddFieldButton
          title="Add new tasks"
          onOpen={(isOpen) => setIsOpen(isOpen)}
          isOpen={isOpen}
        />

        <div>
          {isOpen && (
            <div>
              <form
                className="w-full mb-2"
                onSubmit={handleSubmit(handleOnSubmit)}
              >
                <div className="flex justify-end items-center border-b border-teal-500 py-2">
                  <FormInput
                    control={control}
                    name="name"
                    placeholder="Enter a task"
                    classes="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                  <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit"
                  >
                    Create task
                  </button>
                  <button
                    className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {data.length > 0 ? (
            <>
              {data.map((task) => (
                <TaskItem
                  onClick={handleSelected}
                  task={task}
                  key={task.taskId}
                  taskIdSelected={taskIdSelected}
                />
              ))}
              <Pagination
                totalPage={totalPage}
                currentPage={payloadFilters.page}
                onChange={handleOnChangePage}
              />
            </>
          ) : (
            <h1
              className="text-center"
              style={{
                color: 'red',
              }}
            >
              Tasks is empty
            </h1>
          )}
        </div>
      </div>
      <div className={taskIdSelected ? 'shrink grow-[4]' : 'shrink grow-[0]'}>
        {taskIdSelected && taskInfo && (
          <TaskDetail onClose={handleOnClose} taskInfo={taskInfo} />
        )}
      </div>
    </div>
  );
};

export default Today;
