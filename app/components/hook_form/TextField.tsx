import React from 'react';
import { Controller } from 'react-hook-form';

interface IProps {
  control: any;
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'number';
  required?: boolean;
  handleChange?: (name: string, value: any) => void;
  placeholder?: string;
  classes?: string;
  disabled?: boolean;
}

export const FormInput: React.FC<IProps> = ({
  control,
  name,
  label,
  type = 'text',
  required = false,
  disabled = false,
  handleChange,
  placeholder,
  classes = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
}) => {
  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng nhập trường này!',
        },
      }}
      control={control}
      render={({ field, fieldState: { error, invalid } }) => (
        <div className="w-full">
          <label className="my-2 block">
            {label}
            {required && <span>*</span>}
          </label>
          <input
            className={`${classes} ${invalid && 'border border-red-500'}`}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...field}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
          />
          {invalid && (
            <p className="text-red-500 text-sm py-1">{error?.message}</p>
          )}
        </div>
      )}
    />
  );
};
