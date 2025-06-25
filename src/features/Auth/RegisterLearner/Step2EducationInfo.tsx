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
    <div className="flex flex-col bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700 text-right">
        لنكتشف خلفيتك التعليمية أو العملية
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextField
          label="ما هو وضعك الحالي؟"
          fullWidth
          select
          value={data.educationLevel}
          onChange={(e) => setData({ ...data, educationLevel: e.target.value })}
        >
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="ما هو تخصصك الحالي؟"
          fullWidth
          select
          value={data.specialization}
          onChange={(e) => setData({ ...data, specialization: e.target.value })}
        >
          {fields.map((field) => (
            <MenuItem key={field} value={field}>
              {field}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="ما هي خبراتك؟"
          fullWidth
          select
          value={data.experience || ""}
          onChange={(e) => setData({ ...data, experience: e.target.value })}
        >
          {experiences.map((exp) => (
            <MenuItem key={exp} value={exp}>
              {exp}
            </MenuItem>
          ))}
        </TextField>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            هل مجال عملك مرتبط بالبرمجة؟
          </label>
          <RadioGroup
            row
            value={data.relatedToProgramming || ""}
            onChange={(e) => setData({ ...data, relatedToProgramming: e.target.value })}
          >
            <FormControlLabel value="نعم" control={<Radio />} label="نعم" />
            <FormControlLabel value="لا" control={<Radio />} label="لا" />
          </RadioGroup>
        </div>

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

export default Step2EducationInfo;