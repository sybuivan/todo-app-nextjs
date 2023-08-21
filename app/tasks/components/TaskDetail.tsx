import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import { IPayloadTask, ITaskInfo } from '../../types/tasks';
import { FormInput } from '../../components/hook_form/TextField';
import SubTask from './SubTask';
import { TextareaField } from '../../components/hook_form/TextareaField';
import { useAppDispatch, useAppSelector } from '../../redux';
import { deleteTask, updateTask } from '../../redux/tasks/tasksAction';
import SelectField from '../../components/hook_form/SelectField';
import { IOption } from '../../types/common';
import DatePickerCustom from '../../components/hook_form/DatePickerCustom';
import moment from 'moment';
import AddFieldButton from '../../components/add_field_button';
import { createTaskDetail } from '../../redux/taskDetail/taskDetailAction';
import {
  deleteTaskById,
  updateQuantitySubTask,
} from '../../redux/tasks/taskSlice';
import Modal from '../../components/modal';
import { toastMessage } from '../../utils/toast';

interface ITaskDetail {
  onClose: () => void;
  taskInfo: ITaskInfo;
}

interface ILoadForm {
  name: string;
  description: string;
  typeId: number | null;
  dueDate: Date | string | null;
  taskDetailName: string;
}

const TaskDetail = ({ onClose, taskInfo }: ITaskDetail) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { taskTypeList } = useAppSelector((state) => state.taskTypeSlice);

  const { name, description, taskDetailList, taskId, taskType, dueDate } =
    taskInfo;
  const { control, reset, handleSubmit, getValues, setFocus, setError } =
    useForm<ILoadForm>({
      defaultValues: {
        description: description ?? '',
        name,
        taskDetailName: '',
      },
    });

  const handleOnSubmit = (data: ILoadForm) => {
    const payload: IPayloadTask = {
      name: data.name,
      description: data.description,
      typeId: data.typeId ?? null,
      dueDate: moment(data.dueDate).toDate() ?? null,
    };
    dispatch(updateTask({ taskId, payload }));
  };

  const handleOnSubmitDetail = () => {
    const taskDetailName = getValues('taskDetailName');

    if (!taskDetailName) {
      return setError('taskDetailName', { message: 'Name not empty' });
    }

    dispatch(
      createTaskDetail({
        taskId,
        name: taskDetailName,
      })
    ).then((res: any) => {
      taskDetailList.unshift(res.payload.data);
      dispatch(updateQuantitySubTask(taskId));
      reset({
        taskDetailName: '',
      });
      setFocus('taskDetailName');
    });
  };

  const typeOptions: IOption[] = useMemo(() => {
    return taskTypeList.map((item) => ({
      value: item.typeId,
      label: item.name,
    }));
  }, [taskTypeList]);

  const handleOnClose = () => {
    setShowModal(false);
  };

  const handleOnAccept = () => {
    dispatch(deleteTask(taskId)).then(() => {
      dispatch(deleteTaskById(taskId));
      toastMessage.success('Delete task successfully');
      onClose();
    });
  };

  useEffect(() => {
    reset({
      description: description ?? '',
      name,
      typeId: taskType?.typeId ?? null,
      dueDate,
    });
  }, [taskInfo]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-lg mb-3">Tasks detail: </h3>
        <AiOutlineClose
          className="font-bold text-2xl hover:cursor-pointer"
          onClick={() => onClose()}
        />
      </div>
      <div>
        <div>
          <FormInput name="name" control={control} placeholder="Enter a task" />
          <TextareaField
            name="description"
            placeholder="Enter a description"
            control={control}
          />
        </div>
        <div className="my-6 flex-col flex gap-3">
          <div className="flex items-center gap-2">
            <p className="min-w-[20%]">List</p>
            <SelectField
              control={control}
              name="typeId"
              options={[
                {
                  label: 'No choose',
                  value: 0,
                },
                ...typeOptions,
              ]}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="min-w-[20%]">Due date</p>
            <DatePickerCustom control={control} name="dueDate" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Subtasks: </h3>

          <AddFieldButton
            isOpen={isOpen}
            onOpen={(isOpen) => {
              setIsOpen(isOpen);
              setFocus('taskDetailName');
            }}
            title="Enter a subtask"
          />
          {isOpen && (
            <div>
              <form className="w-full mb-2">
                <div className="border-b py-2 w-full">
                  <FormInput
                    control={control}
                    name="taskDetailName"
                    placeholder="Enter a task"
                    classes="appearance-none bg-transparent border-b py-2 mb-2 border-teal-500 w-full text-gray-700 leading-tight focus:outline-none"
                  />
                  <button
                    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    onClick={handleOnSubmitDetail}
                  >
                    Create
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

          <div>
            {taskDetailList.map((subTask) => (
              <SubTask subTask={subTask} key={subTask.taskDetailId} />
            ))}
          </div>

          <div className="flex justify-between mt-2">
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Delete task
            </button>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save changes
            </button>
          </div>
          <Modal
            showModal={showModal}
            onClose={handleOnClose}
            onAccept={handleOnAccept}
            title={`Delete task ${taskId}`}
            content="Are you sure to delete this data"
          />
        </div>
      </div>
    </form>
  );
};

export default TaskDetail;
