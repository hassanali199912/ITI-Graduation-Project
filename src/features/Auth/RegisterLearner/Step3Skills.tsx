import { useState } from "react";
import {TextField, MenuItem, RadioGroup, FormControlLabel, Radio, Chip, Autocomplete,} from "@mui/material";

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
    <div className="flex flex-col bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-6 text-gray-700 text-right">
        شاركنا مهاراتك واهتماماتك لنساعدك تتطور!
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextField
          label="ما هو مستواك؟"
          select
          fullWidth
          value={data.level || ""}
          onChange={(e) => setData({ ...data, level: e.target.value })}
        >
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </TextField>

        <Autocomplete
          multiple
          options={skills}
          value={data.skills || []}
          onChange={(_, value) => setData({ ...data, skills: value })}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="ما هي مهاراتك الحالية؟" fullWidth />
          )}
        />

        <TextField
          label="المجالات التي تريد تعلمها"
          select
          fullWidth
          value={data.interest || ""}
          onChange={(e) => setData({ ...data, interest: e.target.value })}
        >
          {interests.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
          >
            رجوع
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            استمرار
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3Skills;