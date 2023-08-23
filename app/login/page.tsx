'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonLoading from '../components/button_loading';
import { FormInput } from '../components/hook_form/TextField';
import { useGetStatus } from '../hooks/useStatus';
import { useAppDispatch, useAppSelector } from '../redux';
import { loginUser } from '../redux/auth/authAction';
import { getTaskType } from '../redux/taskType/taskTypeAction';
import { getMe } from '../redux/user/userAction';
import { IPayloadLogin } from '../types/auth';
import { toastMessage } from '../utils/toast';

const schemaLogin = yup.object().shape({
  email: yup.string().email('Email invalid').required('Email not empty.'),
  password: yup.string().required('Password not empty').min(8),
});

const LoginForm = () => {
  const [isLoading] = useGetStatus('auth', 'loginUser');
  const router = useRouter();
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<IPayloadLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schemaLogin),
  });

  const handleOnSubmit = async (data: IPayloadLogin) => {
    console.log('Vao day');
    dispatch(loginUser(data))
      .unwrap()
      .then((payload) => {
        toastMessage.success('Login successfully');
        dispatch(getTaskType());
        dispatch(getMe());
        router.push('/');
      });
  };

  if (token) return router.push('/');

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-2 pt-4 mx-auto lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="FlowBite Logo"
          />
          Todo app
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <div>
                <FormInput
                  name="email"
                  type="text"
                  control={control}
                  placeholder="Enter your email"
                  label="Email"
                />
              </div>
              <div>
                <FormInput
                  name="password"
                  type="password"
                  control={control}
                  placeholder="********"
                  label="Password"
                />
              </div>
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              {isLoading ? (
                <ButtonLoading title="Sing in" />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
