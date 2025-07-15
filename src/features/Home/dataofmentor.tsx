import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MentorDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("selectedMentor");
    if (data) {
      setMentor(JSON.parse(data));
    } else {
      navigate("/"); // لو مفيش بيانات يرجع للصفحة الرئيسية
    }
  }, []);

  if (!mentor) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow" dir="rtl">
      <img src={mentor.img} alt={mentor.name} className="w-full h-60 object-cover rounded" />
      <h2 className="text-3xl font-bold text-blue-700 mt-4">{mentor.name}</h2>
      <p className="text-xl mt-2 text-gray-700">المسمى الوظيفي: {mentor.job}</p>
      <p className="mt-4 text-gray-600">نبذة: {mentor.bio}</p>
      <p className="mt-2 text-gray-600">الحالة: {mentor.status}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
      >
        رجوع
      </button>
    </div>
  );
};

export default MentorDetails;
