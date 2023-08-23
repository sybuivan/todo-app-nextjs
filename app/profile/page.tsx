'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonLoading from '../components/button_loading';
import { FormInput } from '../components/hook_form/TextField';
import Loading from '../components/loading';
import { useGetStatus, useIsRequestPending } from '../hooks/useStatus';
import { useAppDispatch, useAppSelector } from '../redux';
import { changePassword, updateUserInfo } from '../redux/user/userAction';
import { IPayloadChangePassword, IUser } from '../types/user';
import { toastMessage } from '../utils/toast';
import BoxInfo from './components/box_info';

const schemaInformation = yup.object().shape({
  email: yup.string().email('Email invalid').required('Email not empty.'),
  username: yup.string().required('Username not empty'),
  firstName: yup.string().required('FirstName not empty'),
  lastName: yup.string().required('LastName not empty'),
});

const schemaPassword = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Current passsword not empty.')
    .min(8, 'Current password must be at least 8 characters'),
  newPassword: yup
    .string()
    .required('Username not empty')
    .min(8, 'Confirm password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password not empty')
    .min(8, 'Confirm password must be at least 8 characters'),
});

const Profile = () => {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('user', 'getMe');
  const isLoadingUpdate = useIsRequestPending('user', 'updateUserInfo');
  const isLoadingChange = useIsRequestPending('user', 'changePassword');

  const { user } = useAppSelector((state) => state.userSlice);
  const {
    control,
    handleSubmit: handleSubmitInfo,
    reset,
  } = useForm<IUser>({
    defaultValues: user,
    resolver: yupResolver(schemaInformation),
  });

  const { control: controlPassword, handleSubmit } =
    useForm<IPayloadChangePassword>({
      defaultValues: { confirmPassword: '', newPassword: '', oldPassword: '' },
      resolver: yupResolver(schemaPassword),
    });

  const handleOnSubmitInfo = (payload: IUser) => {
    dispatch(updateUserInfo(payload))
      .unwrap()
      .then(() => {
        toastMessage.success('Update user successfully');
      });
  };
  const handleOnSubmitPassword = async (payload: IPayloadChangePassword) => {
    dispatch(changePassword(payload))
      .unwrap()
      .then(() => {
        toastMessage.success('Change password successfully');
      });
  };
  useEffect(() => {
    reset({ ...user });
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-[#f9fafb]">
      <h2 className="font-bold py-4 text-xl pl-8">User profile</h2>

      <div className="flex gap-4 w-[95%] m-auto">
        <div className="flex-[0.3] bg-[#fff] p-6 border border-gray-200 rounded-lg h-full">
          <img
            src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png"
            alt=""
            width={150}
            className="rounded-lg"
            height={150}
          />
          <p className="font-[500] text-xl py-4">Bui Van Sy</p>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Change picture
          </button>
        </div>
        <div className="flex-[0.7]">
          <form onSubmit={handleSubmitInfo(handleOnSubmitInfo)}>
            <BoxInfo title="General information">
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="w-[45%]">
                  <FormInput
                    control={control}
                    name="firstName"
                    placeholder="First name"
                    label="First name"
                  />
                </div>
                <div className="w-[45%]">
                  <FormInput
                    control={control}
                    name="lastName"
                    placeholder="Last name"
                    label="Last name"
                  />
                </div>
                <div className="w-[45%]">
                  <FormInput
                    control={control}
                    name="email"
                    placeholder="Email"
                    label="Email"
                    disabled={true}
                  />
                </div>
                <div className="w-[45%]">
                  <FormInput
                    control={control}
                    name="username"
                    placeholder="User name"
                    label="User name"
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={isLoadingUpdate}
                  type="submit"
                  className={`text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                focus:outline-none dark:focus:ring-blue-800 ${
                  isLoadingUpdate && 'bg-gray-200'
                }`}
                >
                  Save info
                </button>
              </div>
            </BoxInfo>
          </form>

          <form onSubmit={handleSubmit(handleOnSubmitPassword)}>
            <BoxInfo title="Password information">
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="w-[45%]">
                  <FormInput
                    control={controlPassword}
                    name="oldPassword"
                    placeholder="********"
                    label="Current password"
                    type="password"
                  />
                </div>
                <div className="w-[45%]">
                  <FormInput
                    control={controlPassword}
                    name="newPassword"
                    placeholder="********"
                    label="New password"
                    type="password"
                  />
                </div>
                <div className="w-[45%]">
                  <FormInput
                    control={controlPassword}
                    name="confirmPassword"
                    placeholder="********"
                    label="Confirm password"
                    type="password"
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={isLoadingChange}
                  type="submit"
                  className={`text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
                font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                focus:outline-none dark:focus:ring-blue-800 ${
                  isLoadingChange && 'bg-gray-200'
                }`}
                >
                  Change password
                </button>
              </div>
            </BoxInfo>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
