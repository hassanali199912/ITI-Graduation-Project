import { useState } from "react";
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useGetLookupByTypeQuery } from "../../../redux/api/lookupApi";
import type RegisterFormData from "../../../domain/types/RegisterFormData";
import type { LookupItem } from "../../../domain/types/LookupItem";

interface Props {
  data: RegisterFormData;
  setData: (val: RegisterFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2EducationInfo = ({ data, setData, onNext, onBack }: Props) => {
  const { data: levelsResponse } = useGetLookupByTypeQuery("graduationStatus");
  const { data: fieldsResponse } = useGetLookupByTypeQuery("specialization");
  const { data: experiencesResponse } = useGetLookupByTypeQuery("experiences");

  const levels = levelsResponse?.value ?? [];
  const fields = fieldsResponse?.value ?? [];
  const experiences = experiencesResponse?.value ?? [];
  

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
            value={data.graduationStatusId}
            onChange={(e) =>
              setData({ ...data, graduationStatusId: e.target.value })
            }
          >
            {levels.map((level: { id: string; name: string }) => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هو تخصصك الحالي؟</label>
          <TextField
            fullWidth
            select
            value={data.specialistId}
            onChange={(e) =>
              setData({ ...data, specialistId: e.target.value })
            }
          >
            {fields.map((field: LookupItem) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هي خبراتك؟</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.experiences?.map((exp: { id: string }) => {
              const expName = experiences.find((e: LookupItem) => e.id === exp.id)?.name ?? "غير معروف";
              return (
                <span
                  key={exp.id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {expName}
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        experiences: data.experiences.filter((e) => e.id !== exp.id),
                      })
                    }
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              );
            })}

            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !data.experiences.some((exp) => exp.id === val)) {
                  setData({
                    ...data,
                    experiences: [...(data.experiences || []), { id: val }],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {experiences.map((exp: LookupItem) => (
                <option key={exp.id} value={exp.id}>
                  {exp.name}
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
            value={
              data.connectProgramming === null
                ? ""               // ما فيش اختيار
                : data.connectProgramming
                ? "نعم"
                : "لا"
            }
            onChange={(e) =>
              setData({ ...data, connectProgramming: e.target.value === "نعم" })
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
            <img src="/arrow-right.png" alt="" />
            رجوع
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#0003C7] text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            استمرار
            <img src="/arrow-left.png" alt="" />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-base text-[#A3A3A3] text-center">
            لديك حساب؟{" "}
            <span
              className="cursor-pointer text-[#A3A3A3] hover:text-[#0003C7] transition"
              onClick={() => window.location.href = "/"} // عدلي الرابط حسب مسار صفحة تسجيل الدخول
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