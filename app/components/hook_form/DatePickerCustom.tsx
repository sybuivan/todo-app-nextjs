import React from 'react';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

interface DatePickerProps {
  control: any;
  name: string;
}

const DatePickerCustom: React.FC<DatePickerProps> = ({ control, name }) => {
  return (
    <div className="relative border border-gray-300 rounded">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            {console.log({
              field,
              newDate: new Date(field.value),
              newDateNe: new Date(),
            })}
            <DatePicker
              selected={field.value ? new Date(field.value) : new Date()}
              onChange={(date) => field.onChange(date)}
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary"
              placeholderText="Chọn một ngày"
            />
          </>
        )}
      />
    </div>
  );
};

export default DatePickerCustom;
