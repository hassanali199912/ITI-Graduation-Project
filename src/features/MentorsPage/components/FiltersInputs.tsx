import React from "react";

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
  return (
    <aside className="w-full md:w-1/4">
      <div className="sticky top-6 bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">المهارات</h2>

        <input
          type="search"
          className="block border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 form-input px-2 py-2 rounded-md text-sm w-full"
          placeholder="ابحث عن المهارات"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <ul className="py-2 space-y-1">
          {skills.map((skill) => (
            <li key={skill} className="item">
              <label className="flex items-center cursor-pointer truncate">
                <input
                  type="checkbox"
                  className="form-checkbox border-solid focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ml-2"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => onToggleSkill(skill)}
                />
                <span className="text-sm capitalize truncate">{skill}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
