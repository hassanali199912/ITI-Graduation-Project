import React from "react";
import { Control, Controller } from "react-hook-form";
import { FieldWrapper } from "@/shared/components/form";
import { FormData } from "@/shared/components/form/form.types";

interface GregorianDateDisplayInputProps {
  control: Control<any>;
  name: keyof FormData;
  label: string;
  invalidFeedback?: string;
  isError?: boolean;
}

export const GregorianDateDisplayInput: React.FC<GregorianDateDisplayInputProps> = ({
  control,
  name,
  label,
  invalidFeedback,
  isError,
}) => {
  return (
    <FieldWrapper label={label} invalidFeedback={invalidFeedback}>
      <div className="relative">
        <Controller
          shouldUnregister={false}
          name={name}
          control={control}
          render={({ field: { value } }) => (
            <input
              type="text"
              value={value || ""}
              readOnly
              placeholder="YYYY/MM/DD"
              className="w-full p-2 outline-none bg-transparent"
            />
          )}
        />
        {(isError) && (
          <div className="invalid-feedback text-red-500 mt-2">
            {invalidFeedback}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}; 