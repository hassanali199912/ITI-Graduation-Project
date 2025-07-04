import React from "react";

type SelectInputProps = {
  label: string;
  options: string[] | number[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, label, options, placeholder, ...rest }, ref) => {
    return (
      <div className="form-control mb-4">
        <label htmlFor={id} className="block text-right mb-2 font-bold">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className="appearance-none border w-full border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default SelectInput;
