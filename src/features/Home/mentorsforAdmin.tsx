import { useEffect, useState } from 'react';
import img1 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp'
const MentorsCards = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMentor, setChatMentor] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('acceptedMentors');
    console.log("Data from localStorage:", stored);
    if (stored) {
      setMentors(JSON.parse(stored));
    }
  }, []);

  const handleAction = (action: string, mentor: any) => {
    if (action === 'تواصل') {
      setChatMentor(mentor);
      setIsChatOpen(true);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
      {mentors.map((mentor, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300"
        >
           
          <img
            src={mentor.profilePictureUrl || {img1} }
            // src={img1}
            alt="mentor"
            className="w-full h-44 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {mentor.firstName || ''} {mentor.lastName || ''} {mentor.name || ''}
          </h3>
          <p className="text-gray-600 mb-2">{mentor.bio || mentor.job || 'لا توجد نبذة متاحة'}</p>

          <button
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition mt-2"
            onClick={() => handleAction('تواصل', mentor)}
          >
            تواصل
          </button>

          <h3 className="text-sm text-center mt-4 font-bold py-1 rounded bg-gray-50 text-green-500">
            {mentor.status}
          </h3>
        </div>
      ))}

      {isChatOpen && chatMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              تواصل مع {chatMentor.name || `${chatMentor.firstName} ${chatMentor.lastName}`}
            </h2>

            <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto mb-4">
              <p className="text-gray-600 text-sm">لا توجد رسائل بعد...</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="اكتب رسالتك..."
                className="flex-1 p-2 rounded border border-gray-300"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                إرسال
              </button>
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
