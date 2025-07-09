import React from "react";

type FormInputProps = {
  label: string;
  hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, placeholder, hint, ...rest }, ref) => {
    return (
      <div className="form-control mb-8">
        <label htmlFor={id} className="block text-right mb-2 font-bold">
          {label}
        </label>
        <input
          type="text"
          id={id}
          ref={ref}
          placeholder={placeholder}
          className="bg-blue-50 p-2 w-full rounded"
          {...rest}
        />
        {hint && (
          <small className="mb-8 text-gray-400 font-bold">{hint}</small>
        )}
      </div>
    );
  }
);

export default FormInput;
