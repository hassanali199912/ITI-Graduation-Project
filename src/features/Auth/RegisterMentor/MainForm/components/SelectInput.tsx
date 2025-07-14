import React from "react";
import clsx from "clsx";
import { type Path, type UseFormRegister } from "react-hook-form";

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
  setValueAs?: (value: string) => any;
}

export default function SelectInput<T>({
  id,
  label,
  options,
  multiple,
  register,
  setValueAs,
}: SelectInputProps<T>) {
  const baseStyles =
    "block w-full border rounded-md bg-white text-sm text-gray-700 " +
    "focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600";

  const singleStyles =
    "h-11 pr-10 pl-3 appearance-none cursor-pointer"; // نخلى فى padding يمين للسهم

  const multiStyles =
    "min-h-[8rem] p-3 space-y-1 overflow-y-auto scrollbar-thin " +
    "scrollbar-thumb-primary-400 scrollbar-track-primary-50";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-bold text-right">
        {label}
      </label>

      {/* حطينا العناصر فى relative container لو حابب تضيف آيكون للسهم */}
      <div className="relative">
        <select
          id={id}
          multiple={multiple}
          className={clsx(
            baseStyles,
            multiple ? multiStyles : singleStyles
          )}
          {...register(id, { setValueAs })}
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

        {/* سهم جميل يظهر فقط لو مش multiple */}
        {!multiple && (
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.944l3.71-3.713a.75.75 0 111.06 1.061l-4.24 4.244a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.002-1.06z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
