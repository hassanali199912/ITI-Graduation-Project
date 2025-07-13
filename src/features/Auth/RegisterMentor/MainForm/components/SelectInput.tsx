import React from 'react';
import { type Path, type UseFormRegister } from 'react-hook-form';

interface Option {
  id: string | number;
  name: string;
}

interface SelectInputProps<T> {
  id: Path<T>;
  label: string;
  options: Option[];
  multiple?: boolean;
  register: UseFormRegister<any>;
  setValueAs?: (value: string) => any; // Optional custom value transformation
}

export default function SelectInput<T>({ id, label, options, multiple, register, setValueAs }: SelectInputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-right mb-2 font-bold">
        {label}
      </label>
      <select
        id={id}
        multiple={multiple}
        className="appearance-none border w-full border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
        {...register(id, {
          setValueAs,
        })}
      >
        {!multiple && (
          <option value="" disabled>
            اختر خيارًا
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}