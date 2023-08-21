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
}

export const TextareaField: React.FC<IProps> = ({
  control,
  name,
  label,
  type = 'text',
  required = false,
  handleChange,
  placeholder,
  classes = 'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 mt-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
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
          <label>
            {label}
            {required && <span>*</span>}
          </label>
          <textarea
            rows={4}
            className={classes}
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
          {invalid && <p className="text-red-500">{error?.message}</p>}
        </div>
      )}
    />
  );
};
