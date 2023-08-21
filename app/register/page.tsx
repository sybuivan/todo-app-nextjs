'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInput } from '../components/hook_form/TextField';
import { useAppDispatch, useAppSelector } from '../redux';
import { registerUser } from '../redux/auth/authAction';
import { IPayloadRegiter } from '../types/auth';
import { toastMessage } from '../utils/toast';

const schemaLogin = yup.object().shape({
  email: yup.string().email('Email invalid').required('Email not empty.'),
  password: yup.string().required('Password not empty').min(8),
  username: yup.string().required('Username not empty'),
  firstName: yup.string().required('firstName not empty'),
  lastName: yup.string().required('LastName not empty'),
});

const RegisterForm = () => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm<IPayloadRegiter>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schemaLogin),
  });

  const handleOnSubmit = async (data: IPayloadRegiter) => {
    dispatch(registerUser(data))
      .unwrap()
      .then((data) => {
        router.push('/login');
        toastMessage.success('Register successfully');
      });
  };
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
          Todo app
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account todo app
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <FormInput
                  name="email"
                  type="text"
                  control={control}
                  placeholder="Enter a email"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <FormInput
                  name="username"
                  type="text"
                  control={control}
                  placeholder="Enter a username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <FormInput
                  name="firstName"
                  type="text"
                  control={control}
                  placeholder="Enter a firstName"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <FormInput
                  name="lastName"
                  type="text"
                  control={control}
                  placeholder="Enter a lastName"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <FormInput
                  name="password"
                  type="text"
                  control={control}
                  placeholder="Enter a password"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create an account
              </button>
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

export default RegisterForm;
