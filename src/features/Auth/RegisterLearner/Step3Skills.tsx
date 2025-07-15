import { useState } from "react";
import { TextField, MenuItem, RadioGroup, FormControlLabel, Radio, Chip, Autocomplete, } from "@mui/material";
import { useGetLookupByTypeQuery } from "../../../redux/api/lookupApi";
import type { LookupItem } from "../../../domain/types/LookupItem";
import type RegisterFormData from "../../../domain/types/RegisterFormData";

interface Props {
  data: RegisterFormData;
  setData: (val: RegisterFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step3Skills = ({ data, setData, onNext, onBack }: Props) => {
  const { data: levelsResponse } = useGetLookupByTypeQuery("level");
  const levels = levelsResponse?.value ?? [];

  const { data: skillsResponse } = useGetLookupByTypeQuery("skilles");
  const skills = skillsResponse?.value ?? [];

  const { data: interestsResponse } = useGetLookupByTypeQuery("field");
  const interests = interestsResponse?.value ?? [];

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
            value={data.levelId || ""}
            onChange={(e) => setData({ ...data, levelId: e.target.value })}
          >
            <MenuItem value="" disabled>
              اختر من القائمة
            </MenuItem>
            {levels.map((lvl: LookupItem) => (
              <MenuItem key={lvl.id} value={lvl.id}>
                {lvl.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">ما هي مهاراتك الحالية؟</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.skills?.map((skillObj: { skillId: string }, index: number) => {
              const skillName = skills.find((s: LookupItem) => s.id === skillObj.skillId)?.name ?? "غير معروف";
              return (
                <span
                  key={skillObj.skillId}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {skillName}
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        skills: data.skills.filter((s: { skillId: string }) => s.skillId !== skillObj.skillId),

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
                if (val && !data.skills?.some((s: { skillId: string }) => s.skillId === val)
                ) {
                  setData({
                    ...data,
                    skills: [...(data.skills || []), { skillId: val }],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {skills.map((skill: LookupItem) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-800 mb-1 text-right">المجالات التي تريد تعلمها</label>
          <div className="border border-gray-300 rounded-md px-3 py-2 min-h-[56px] flex flex-wrap items-center gap-2 bg-white">
            {data.learningInterests?.map((item: { learningInterestId: string }, index: number) => {
              const name = interests.find((i: LookupItem) => i.id === item.learningInterestId)?.name ?? "غير معروف";
              return (
                <span
                  key={item.learningInterestId}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        learningInterests: data.learningInterests.filter(
                          (i: { learningInterestId: string }) => i.learningInterestId !== item.learningInterestId
                        ),
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
                if (
                  val &&
                  !data.learningInterests?.some((i: { learningInterestId: string }) => i.learningInterestId === val)
                ) {
                  setData({
                    ...data,
                    learningInterests: [...(data.learningInterests || []), { learningInterestId: val }],
                  });
                }
              }}
              className="bg-transparent text-gray-700 text-sm focus:outline-none pr-4 h-[32px]"
            >
              <option value="" disabled>
                اختر من القائمة
              </option>
              {interests.map((item: LookupItem) => (
                <option key={item.id} value={item.id}>
                  {item.name}
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
              onClick={() => window.location.href = "/"}
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