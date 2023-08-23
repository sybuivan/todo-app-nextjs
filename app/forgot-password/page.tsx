'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import ButtonLoading from '../components/button_loading';
import { FormInput } from '../components/hook_form/TextField';
import { useGetStatus, useIsRequestSuccess } from '../hooks/useStatus';
import { useAppDispatch, useAppSelector } from '../redux';
import { forgotPassword } from '../redux/auth/authAction';
import { toastMessage } from '../utils/toast';
import SendSuccess from './components/send_success';

const schemaForgotPassword = yup.object().shape({
  email: yup.string().email('Email invalid').required('Email not empty.'),
});

const ForgotPassword = () => {
  const [isLoading] = useGetStatus('auth', 'forgotPassword');
  const isSuccess = useIsRequestSuccess('auth', 'forgotPassword');
  const router = useRouter();
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schemaForgotPassword),
  });

  const handleOnSubmit = async ({ email }: { email: string }) => {
    dispatch(forgotPassword(email))
      .unwrap()
      .then((payload) => {
        toastMessage.success('Send email successfully');
      });
  };

  if (token) return router.push('/');
  if (isSuccess) return <SendSuccess />;

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
              Send maill rest password
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
                />
              </div>

              {isLoading ? (
                <ButtonLoading title="Send email" />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Send email
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
