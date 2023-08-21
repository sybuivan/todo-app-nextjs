import { isEmpty } from 'lodash';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IErrors } from '../types/common';

export const toastMessage = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message || 'Lỗi hệ thống'),
  custom: (content: JSX.Element) => toast.custom(content),
  setErrors: (error: IErrors, setError?: UseFormSetError<any>) => {
    if (!error || isEmpty(error.errors))
      return toast.error(error.message || 'Lỗi hệ thống');

    for (const key in error.errors) {
      for (const err of error.errors[key]) {
        if (!setError) return;
        setError(key, { message: err.message });
      }
    }
  },
};
