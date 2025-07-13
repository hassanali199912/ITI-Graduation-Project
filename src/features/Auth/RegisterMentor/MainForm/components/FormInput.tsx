import React from "react";
import { type Path, type UseFormRegister,type RegisterOptions,type FieldValues } from 'react-hook-form';

type FormInputProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  hint?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  type?: string;
  valueAsNumber?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'ref'>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps<any>>(
  ({ id, label, placeholder, hint, register, type = "text", valueAsNumber, ...rest }, ref) => {
    const registerOptions: RegisterOptions = {
      onChange: rest.onChange as any,
      onBlur: rest.onBlur as any,
      valueAsNumber,
    };
    const registerProps = register(id, registerOptions);
    return (
      <div className="form-control mb-8">
        <label htmlFor={id} className="block text-right mb-2 font-bold">{label}</label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="bg-blue-50 p-2 w-full rounded"
          {...registerProps}
        />
        {hint && <small className="mb-8 text-gray-400 font-bold">{hint}</small>}
      </div>
    );
  }
);

export default FormInput;