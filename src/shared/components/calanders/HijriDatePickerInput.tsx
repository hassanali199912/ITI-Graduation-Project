import React from "react";
import { Control, Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import hijriCalendar from "react-date-object/calendars/arabic";
import hijriLocale from "react-date-object/locales/arabic_en";
import { FieldWrapper } from "@/shared/components/form";
import { Calculator01Icon } from "hugeicons-react";
import { FormData } from "@/shared/components/form/form.types";

interface HijriDatePickerInputProps {
  control: Control<any>;
  name: keyof FormData;
  label: string;
  rules: any;
  onChangeHandler: (date: DateObject | DateObject[] | null, onChange: (value: string) => void) => void;
}

export const HijriDatePickerInput: React.FC<HijriDatePickerInputProps> = ({
  control,
  name,
  label,
  rules,
  onChangeHandler,
}) => {
  return (
    <Controller
      shouldUnregister={false}
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FieldWrapper label={label} invalidFeedback={error?.message}>
          <div className="relative">
            <DatePicker
              placeholder="YYYY/MM/DD"
              calendar={hijriCalendar}
              locale={hijriLocale}
              format="YYYY/MM/DD"
              value={
                value && /^\d{4}\/\d{2}\/\d{2}$/.test(value)
                  ? new DateObject({
                      date: value,
                      calendar: hijriCalendar,
                      locale: hijriLocale,
                      format: "YYYY/MM/DD",
                    })
                  : undefined
              }
              onChange={(date) => onChangeHandler(date, onChange)}
              inputClass={`w-full p-2 border rounded text-sm focus:ring-1 focus:outline-none pr-8 ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-400 focus:ring-blue-500"
              }`}
              calendarPosition="bottom-right"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Calculator01Icon className="text-gray-500" />
            </div>
          </div>
        </FieldWrapper>
      )}
    />
  );
}; 