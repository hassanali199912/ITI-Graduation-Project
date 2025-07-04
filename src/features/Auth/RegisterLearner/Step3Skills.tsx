import { useState } from "react";
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio, Chip, Autocomplete, } from "@mui/material";

interface Props {
  data: any;
  setData: (val: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Skills = ({ data, setData, onNext, onBack }: Props) => {
  const levels = ["مبتدىء", "متوسط", "متقدم"];
  const skills = ["HTML", "CSS", "JavaScript", "React", "Python"];
  const interests = ["Python", "UI/UX", "Backend", "Data Science"];

  return (
    <div className="flex flex-col bg-white  p-8 w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-2 text-[#000000] text-right">
        شاركنا مهاراتك واهتماماتك لنساعدك تتطور!
      </h2>
      <p className="text-sm text-[#A3A3A3] mb-8 text-right">
        هدفها: نعرف مستواك واهتماماتك علشان نقترح لك مدرب مناسب
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="flex flex-col gap-6"
      >
        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هو مستواك؟</label>
          <TextField
            fullWidth
            select
            value={data.level || ""}
            onChange={(e) => setData({ ...data, level: e.target.value })}
          >
            <MenuItem value="" disabled>
              اختر من القائمة
            </MenuItem>
            {levels.map((lvl) => (
              <MenuItem key={lvl} value={lvl}>
                {lvl}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هي مهاراتك الحالية؟</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      skills: data.skills.filter((s: string) => s !== skill),
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
                if (val && !data.skills?.includes(val)) {
                  setData({
                    ...data,
                    skills: [...(data.skills || []), val],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">المجالات التي تريد تعلمها</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.interest?.map((item: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {item}
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      interest: data.interest.filter((i: string) => i !== item),
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
                if (val && !data.interest?.includes(val)) {
                  setData({
                    ...data,
                    interest: [...(data.interest || []), val],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {interests.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
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
              onClick={() => window.location.href = "/login"}
            >
              سجل دخول
            </span>
          </p>
        </div>

      </form>
    </div>
  );
};

export default Step3Skills;