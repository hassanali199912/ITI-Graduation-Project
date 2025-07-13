import React from 'react';

const students = [
  { name: "أحمد", email: "ahmed@gmail.com", major: "الذكاء الاصطناعي" },
  { name: "سارة", email: "sara@yahoo.com", major: "تطوير الويب" },
  { name: "محمد", email: "mohamed@yahoo.com", major: "UI/UX" },
  { name: "مصطفى", email: "mostafa@yahoo.com", major: "أنظمة المعلومات" },
];

const StudentsTable = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center border-b pb-4">قائمة الطلاب</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-center border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              
              <th className="p-4 border-b text-lg font-semibold">التخصص</th>
              
              <th className="p-4 border-b text-lg font-semibold">البريد</th>
              <th className="p-4 border-b text-lg font-semibold">الاسم</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}
              >
                
                
                <td className="p-4 border-b font-bold">{student.major}</td>
                <td className="p-4 border-b font-bold">{student.email}</td>
                <td className="p-4 border-b font-bold">{student.name}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
