import { useState } from "react";
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
  data: any;
  setData: (val: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2EducationInfo = ({ data, setData, onNext, onBack }: Props) => {
  const levels = ["طالب", "خريج"];
  const fields = ["Frontend", "Backend", "UI/UX", "Data Science"];
  const experiences = ["تعدد المهام", "العمل الجماعي", "القيادة", "حل المشكلات"];

  return (
    <div className="flex flex-col bg-white p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-[#000000] text-right">
        لنكتشف خلفيتك التعليمية أو العملية
      </h2>
      <p className="text-sm text-[#A3A3A3] mb-8 text-right">
        هدفها: نعرف موقعك الحالي عشان نرشح لك مدرب مناسب.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="space-y-6"
      >
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هو وضعك الحالي؟</label>
          <TextField
            fullWidth
            select
            value={data.educationLevel}
            onChange={(e) =>
              setData({ ...data, educationLevel: e.target.value })
            }
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هو تخصصك الحالي؟</label>
          <TextField
            fullWidth
            select
            value={data.specialization}
            onChange={(e) =>
              setData({ ...data, specialization: e.target.value })
            }
          >
            {fields.map((field) => (
              <MenuItem key={field} value={field}>
                {field}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هي خبراتك؟</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.experience?.map((exp: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {exp}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      experience: data.experience.filter((e: string) => e !== exp),
                    })
                  }
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}

            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !data.experience?.includes(val)) {
                  setData({
                    ...data,
                    experience: [...(data.experience || []), val],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {experiences.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-100">
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">
            هل مجال عملك مرتبط بالبرمجة؟
          </label>
          <RadioGroup
            row
            value={data.relatedToProgramming || ""}
            onChange={(e) =>
              setData({ ...data, relatedToProgramming: e.target.value })
            }
          >
            <FormControlLabel value="نعم" control={<Radio />} label="نعم" />
            <FormControlLabel value="لا" control={<Radio />} label="لا" />
          </RadioGroup>
        </div>

        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[#0003C7] font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            رجوع
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0003C7] text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            استمرار
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-base text-[#A3A3A3] text-center">
            لديك حساب؟{" "}
            <span
              className="cursor-pointer text-[#A3A3A3] hover:text-[#0003C7] transition"
              onClick={() => window.location.href = "/login"} // عدلي الرابط حسب مسار صفحة تسجيل الدخول
            >
              سجل دخول
            </span>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Step2EducationInfo;