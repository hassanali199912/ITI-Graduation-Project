import  { useEffect, useState } from 'react';

const MentorsCards = () => {
  const [mentors, setMentors] = useState<any[]>([]); 

  useEffect(() => {
    const stored = localStorage.getItem("acceptedMentors");
    if (stored) {
      setMentors(JSON.parse(stored));
    }
  }, []);
  const [isChatOpen, setIsChatOpen] = useState(false);
const [chatMentor, setChatMentor] = useState<any>(null);
 const handleAction = (action: string, mentor: any) => {
  if(action==="تواصل"){
setChatMentor(mentor);
  setIsChatOpen(true);
}
 }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir='rtl'>
      {mentors.map((mentor, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <img
            src={mentor.img}
            alt="mentor"
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-bold mt-2 cursor-pointer text-blue-800">
            {mentor.name}
          </h3>
          <p>{mentor.job}</p>
          <button
      className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition p-5 m-2"
      onClick={() => handleAction("تواصل", mentor)}
    >
      تواصل
    </button>
         <h3 className="text-sm text-center mt-4 font-bold py-1 rounded bg-gray-50 text-green-500">{mentor.status}</h3>
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

export default MentorsCards;
