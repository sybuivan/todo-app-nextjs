'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonLoading from '../components/button_loading';
import { FormInput } from '../components/hook_form/TextField';
import { useGetStatus } from '../hooks/useStatus';
import { useAppDispatch, useAppSelector } from '../redux';
import { resetPassword } from '../redux/auth/authAction';
import { IPayloadResetPassword } from '../types/auth';
import { toastMessage } from '../utils/toast';

const schemaResetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password not empty')
    .min(8, 'New password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password not empty')
    .min(8, 'Confirm password must be at least 8 characters'),
});

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('auth', 'resetPassword');
  const { token } = useAppSelector((state) => state.authSlice);

  const searchParams = useSearchParams();
  const token_reset = searchParams.get('token');

  const { control, handleSubmit } = useForm<IPayloadResetPassword>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schemaResetPassword),
  });

  const handleOnSubmit = async ({
    newPassword,
    confirmPassword,
  }: IPayloadResetPassword) => {
    dispatch(
      resetPassword({
        confirmPassword,
        newPassword,
        token: token_reset,
      })
    )
      .unwrap()
      .then((payload) => {
        toastMessage.success('Reset password successfully');
      });
  };

  if (token) return router.push('/');

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <div>
              <FormInput
                control={control}
                name="newPassword"
                placeholder="**********"
                label="New password"
                type="password"
              />
            </div>
            <div>
              <FormInput
                control={control}
                name="confirmPassword"
                placeholder="**********"
                label="Confirm password"
                type="password"
              />
            </div>
            {isLoading ? (
              <ButtonLoading title="Reset password" />
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Reset password
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
