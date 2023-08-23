'use client';
import Image from 'next/image';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormInput } from '../components/hook_form/TextField';
import BoxInfo from './components/box_info';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser } from '../types/user';
import { useAppSelector } from '../redux';

const schemaInformation = yup.object().shape({
  email: yup.string().email('Email invalid').required('Email not empty.'),
  username: yup.string().required('Username not empty'),
  firstName: yup.string().required('FirstName not empty'),
  lastName: yup.string().required('LastName not empty'),
});

const schemaPassword = yup.object().shape({
  oldPassword: yup.string().email('Email invalid').required('Email not empty.'),
  newPassword: yup.string().required('Username not empty'),
  confirmPassword: yup.string().required('FirstName not empty'),
});

const Profile = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { control, handleSubmit: handleSubmitInfo } = useForm<IUser>({
    defaultValues: user,
    resolver: yupResolver(schemaInformation),
  });

  const { control: controlPassword, handleSubmit: handleSubmitPassword } =
    useForm({
      defaultValues: {},
      resolver: yupResolver(schemaPassword),
    });

  const handleOnSubmitInfo = () => {};
  const handleOnSubmitPassword = () => {};
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
            <BoxInfo title="General information" name="Save info">
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
            </BoxInfo>
          </form>

          <BoxInfo title="Password information" name="Save password">
            <div
              className="flex flex-wrap gap-4 mb-3"
              onSubmit={handleSubmitPassword(handleOnSubmitPassword)}
            >
              <div className="w-[45%]">
                <FormInput
                  control={control}
                  name="oldPassword"
                  placeholder="********"
                  label="Current password"
                />
              </div>
              <div className="w-[45%]">
                <FormInput
                  control={control}
                  name="newPassword"
                  placeholder="********"
                  label="New password"
                />
              </div>
              <div className="w-[45%]">
                <FormInput
                  control={control}
                  name="confirmPassword"
                  placeholder="********"
                  label="Confirm password"
                />
              </div>
            </div>
          </BoxInfo>
        </div>
      </div>
    </div>
  );
};

export default Profile;
