import React from "react";

type FormInputProps = {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  hint?:string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({ id, label, placeholder, value,hint, onChange }: FormInputProps) {
  return (
    <div className="form-control mb-8">
      <label htmlFor={id} className="block text-right mb-2 font-bold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="bg-blue-50 p-2 w-full rounded"
        placeholder={placeholder}
      />
      <small className="mb-8 text-gray-400 font-bold">{hint}</small>
    </div>
  );
}
