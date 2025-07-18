import React, { useState } from "react";

interface FiltersProps {
  skills: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSkills: string[];
  onToggleSkill: (skill: string) => void;
}

export default function FiltersInputs({
  skills,
  searchQuery,
  onSearchChange,
  selectedSkills,
  onToggleSkill,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full md:w-1/4">
      <div className="sticky top-6 bg-white border border-gray-200 rounded-xl p-4 shadow-md space-y-4">
        <h2 className="text-lg font-bold text-gray-800 text-right">المهارات</h2>

        <input
          type="search"
          className="block border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 form-input px-3 py-2 rounded-md text-sm w-full text-right"
          placeholder="ابحث عن المهارات"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <div className="relative text-right">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-white hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-sm"
          >
            اختر المهارات
          </button>

          {isOpen && (
        <div
  dir="rtl"
  className="absolute z-10 mt-2 right-0 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-xl"
>
  <ul className="py-2 space-y-2 px-3">
    {skills.map((skill) => (
      <li key={skill}>
        <label className="flex items-center justify-end gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox text-indigo-600 rounded focus:ring-indigo-500"
            checked={selectedSkills.includes(skill)}
            onChange={() => onToggleSkill(skill)}
          />
          <span className="text-sm truncate">{skill}</span>
        </label>
      </li>
    ))}
  </ul>
</div>


          )}
        </div>
      </div>
    </aside>
  );
}
