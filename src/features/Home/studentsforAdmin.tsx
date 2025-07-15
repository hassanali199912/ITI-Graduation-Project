import  { useEffect, useState } from 'react';


const StudentsTable = () => {
  const [students, setStudents] = useState<any[]>([]); 
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  fetch("http://academix1.runasp.net/api/GetStudents")
    .then((res) => res.json())
    .then((data) => {
      console.log("API response:", data);
      if (Array.isArray(data)) {
        setStudents(data);
      } else if (Array.isArray(data.data.students)) {
        setStudents(data.data.students);
      } else {
        throw new Error("البيانات غير متوقعة");
      }
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
      setError("فشل تحميل البيانات");
    })
    .finally(() => {
      setLoading(false);
    });
}, []);


  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center border-b pb-4">قائمة الطلاب</h2>

      {loading ? (
        <p className="text-center text-gray-500">جاري التحميل...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="p-4 border-b text-lg font-semibold">الاسم</th>
                <th className="p-4 border-b text-lg font-semibold">البريد</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}
                >
                  <td className="p-4 border-b font-bold">{student.firstName} {student.lastName}</td>
                  <td className="p-4 border-b font-bold">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
