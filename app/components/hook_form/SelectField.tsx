import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IOption } from '../../types/common';

interface SelectFieldProps {
  name: string;
  options: IOption[];
  label?: string;
  control: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  options,
  label,
  control,
}) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field, fieldState: { error, invalid } }) => (
          <>
            <select
              {...field}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {invalid && <p className="text-red-500">{error?.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default SelectField;
