import React, { useState } from 'react';
import { useAddSkillMutation } from "../../redux/skills/addskill"; 

const AddSkillForm = () => {
  const [skill, setSkill] = useState('');
  const [addSkill, { isLoading, isSuccess, isError }] = useAddSkillMutation();

  const handleSubmit = async () => {
    if (!skill.trim()) return;

    try {
      await addSkill(skill).unwrap();
      setSkill('');
    } catch (err) {
      console.error("فشل إضافة المهارة:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md mx-auto" dir="rtl">
      <h2 className="text-xl font-bold mb-4 text-blue-800">إضافة مهارة جديدة</h2>

      <input
        type="text"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="اسم المهارة"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {isLoading ? "جارٍ الإرسال..." : "إرسال"}
      </button>

      {isSuccess && <p className="text-green-600 mt-4">✅ تمت الإضافة بنجاح</p>}
      {isError && <p className="text-red-600 mt-4">❌ فشل في الإرسال</p>}
    </div>
  );
};

export default AddSkillForm;
