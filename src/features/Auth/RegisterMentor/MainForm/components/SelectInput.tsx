import React from 'react';
import { type Path,type UseFormRegister } from 'react-hook-form';
import { type StepOneData } from '../../types';

interface Option {
  id: string | number;
  name: string;
}

interface SelectInputProps {
  id: Path<StepOneData>;
  label: string;
  options: Option[];
  multiple?: boolean;
  register: UseFormRegister<StepOneData>;
}

export default function SelectInput({ id, label, options, multiple, register }: SelectInputProps) {
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
          setValueAs: (value) => (id === 'gender' ? parseInt(value, 10) : value),
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