import { useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react';
import img1 from '../../assets/images/pexels-olly-762020.jpg';
import img2 from '../../assets/images/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg';
import img3 from '../../assets/images/360_F_367464887_f0w1JrL8PddfuH3P2jSPlIGjKU2BI0rn.jpg';
import img4 from '../../assets/images/premium_photo-1689568126014-06fea9d5d341.jpeg';
import img5 from '../../assets/images/RW_Team_23-removebg-preview-551x408.png';
import img6 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp';
import { useNavigate } from 'react-router-dom';


const initialMentors = [
  {
    name: "أحمد محمد",
    img: img4,
    job: "محلل بيانات",
    bio: "...",
    status: "قيد الانتظار",
  },
  {
    name: "نرمين سعيد",
    img: img5,
    job: "أخصائية أمن سيبراني",
    bio: "...",
    status: "قيد الانتظار",
  },
  {
    name: "خالد ياسر",
    img: img6,
    job: "مدرب قواعد بيانات",
    bio: "...",
    status: "قيد الانتظار",
  },
  {
    name: "سارة علي",
    img: img1,
    job: "مبرمجة  في  الذكاء الاصطناعي",
    bio: "سارة لديها أكثر من 7 سنوات...",
    status: "قيد الانتظار",
  },
  {
    name: "عبد الرحمن",
    img: img2,
    job: "مصمم UI/UX",
    bio: "عبد الرحمن متخصص...",
    status: "قيد الانتظار",
  },
  {
    name: "هالة سمير",
    img: img3,
    job: "مبرمجة في تطوير الويب",
    bio: "هالة تمتلك خبرة...",
    status: "قيد الانتظار",
  },
];

const MentorsRequests = () => {
  

  
 
  const [mentors, setMentors] = useState(() => {
  const acceptedFromStorage = JSON.parse(localStorage.getItem("acceptedMentors") || "[]");
  const refusedFromStorage = JSON.parse(localStorage.getItem("refusedMentors") || "[]");
  const pendingFromStorage = JSON.parse(localStorage.getItem("pendingMentors") || "null");

  if (pendingFromStorage) {
    return pendingFromStorage;
  }

  return initialMentors.filter(
    (mentor) =>
      !acceptedFromStorage.some((acc: any) => acc.name === mentor.name) &&
      !refusedFromStorage.some((ref: any) => ref.name === mentor.name)
  );
});
const [isChatOpen, setIsChatOpen] = useState(false);
const [chatMentor, setChatMentor] = useState<any>(null);


const navigate = useNavigate();



  const handleAction = (action: string, mentor: any) => {
    if (action === "عرض") {
    localStorage.setItem("selectedMentor", JSON.stringify(mentor));
    navigate(`/mentor/${mentor.name}`);
  }
    if (action === "قبول") {
      const updatedMentor = { ...mentor, status: "تم القبول" };
      
      const newMentors = mentors.filter((m: { name: any; }) => m.name !== mentor.name);
      setMentors(newMentors);

    
      const oldAccepted = JSON.parse(localStorage.getItem("acceptedMentors") || "[]");
      const newAccepted = [...oldAccepted, updatedMentor];
      localStorage.setItem("acceptedMentors", JSON.stringify(newAccepted));

      alert(`تم قبول ${mentor.name}`);
    }
else if (action === "رفض") {
  const updatedMentor = { ...mentor, status: "تم الرفض" };

  const newMentors = mentors.filter((m: { name: any; }) => m.name !== mentor.name);
  setMentors(newMentors);
  localStorage.setItem("pendingMentors", JSON.stringify(newMentors)); 

  const oldRefused = JSON.parse(localStorage.getItem("refusedMentors") || "[]");
  const newRefused = [...oldRefused, updatedMentor];
  localStorage.setItem("refusedMentors", JSON.stringify(newRefused));

  alert(`تم رفض ${mentor.name}`);
}

else if(action==="تواصل"){
setChatMentor(mentor);
  setIsChatOpen(true);
}
    
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mentors.map((mentor: { img: string | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; job: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }, i: Key | null | undefined) => (
       <div key={i} className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300" dir="rtl">
  <img src={mentor.img} alt="mentor" className="w-full h-44 object-cover rounded-md mb-4" />

  <h3 className="text-lg font-bold text-gray-800 mb-1">{mentor.name}</h3>
  <p className="text-gray-600 mb-2">
    <span className="font-semibold text-gray-700">المسمى الوظيفي:</span> {mentor.job}
  </p>

  <p className="text-gray-700 text-sm mb-1">
    <span className="font-semibold text-gray-700">الشهادات:</span> ---
  </p>
  <p className="text-gray-700 text-sm mb-3">
    <span className="font-semibold text-gray-700">سعر الجلسة:</span> --- $
  </p>

  <div className="grid grid-cols-4 gap-2">
    <button
      className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition"
      onClick={() => handleAction("قبول", mentor)}
    >
      قبول
    </button>
   
    <button
      className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition"
      onClick={() => handleAction("تواصل", mentor)}
    >
      تواصل
    </button>
    <button
      className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition"
      onClick={() => handleAction("عرض", mentor)}
    >
      عرض
    </button>
    <button
      className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 rounded-md font-semibold transition"
      onClick={() => handleAction("رفض", mentor)}
    >
      رفض
    </button>
  </div>

  <h3 className="text-sm text-center mt-4 font-bold py-1 rounded bg-gray-50 text-gray-500">
    {mentor.status}
  </h3>
</div>

      ))}

      {isChatOpen && chatMentor && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right" dir="rtl">
      <h2 className="text-xl font-bold mb-4 text-blue-800">تواصل مع {chatMentor.name}</h2>

      <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto mb-4">
        {/* محتوى الشات (ممكن تضيف هنا الرسائل لاحقًا) */}
        <p className="text-gray-600 text-sm">لا توجد رسائل بعد...</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="اكتب رسالتك..."
          className="flex-1 p-2 rounded border border-gray-300"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">إرسال</button>
      </div>

      <button
        className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
        onClick={() => setIsChatOpen(false)}
      >
        إغلاق الشات
      </button>
    </div>
  </div>
)}

      
    </div>
    
  );
};

export default MentorsRequests;
