import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp';

const MentorsRequests = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMentor, setChatMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [interviewMentor, setInterviewMentor] = useState<any>(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    fetch("http://academix1.runasp.net/api/GetTeachers?status=2&pageNumber=1&pageSize=100")
      .then((res) => res.json())
      .then((data) => {
        console.log("الرد الكامل من الـ API:", data);

        const refused = JSON.parse(localStorage.getItem("refusedMentors") || "[]");
        const accepted = JSON.parse(localStorage.getItem("acceptedMentors") || "[]");
        let mentorsList = [];

        if (Array.isArray(data)) {
          mentorsList = data;
        } else if (Array.isArray(data.data?.teachers)) {
          mentorsList = data.data.teachers;
        }

        const filtered = mentorsList.filter(
          (m: any) =>
            !refused.some((ref: any) => ref.id === m.id) &&
            !accepted.some((acc: any) => acc.id === m.id)
        );

        setMentors(filtered);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("فشل تحميل البيانات");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateMentorStatus = async (mentorId: string, newStatus: number) => {
    try {
      const response = await fetch(`http://academix1.runasp.net/api/updateStatusTeacher/${mentorId}?status=${newStatus}`, {
        method: 'PUT',
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'فشل التحديث');
      }
  
      return true;
    } catch (err) {
      console.error('خطأ في تحديث الحالة:', err);
      alert('حدث خطأ أثناء تحديث حالة المنتور');
      return false;
    }
  };
  

  const handleAction = (action: string, mentor: any) => {
    if (action === 'عرض') {
      localStorage.setItem('selectedMentor', JSON.stringify(mentor));
      navigate(`/mentor/${mentor.firstName}${mentor.lastName}`);
    } else if (action === 'قبول') {
      updateMentorStatus(mentor.id, 0).then((success) => {
        if (success) {
          setMentors((prev) => prev.filter((m) => m.id !== mentor.id));
          alert(`تم قبول ${mentor.firstName} ${mentor.lastName}`);
        }
      });
    } else if (action === 'رفض') {
      updateMentorStatus(mentor.id, 1).then((success) => {
        if (success) {
          setMentors((prev) => prev.filter((m) => m.id !== mentor.id));
          alert(`تم رفض ${mentor.firstName} ${mentor.lastName}`);
        }
      });
    } else if (action === 'تواصل') {
      setChatMentor(mentor);
      setIsChatOpen(true);
    } else if (action === 'مقابلة') {
      setInterviewMentor(mentor);
    }
  };

  const sendInterviewEmail = async () => {
    if (!interviewMentor || !interviewDate || !interviewTime || !meetingLink) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    try {
      const res = await fetch('http://your-api-url/api/sendInterviewEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: interviewMentor.email,
          name: `${interviewMentor.firstName} ${interviewMentor.lastName}`,
          date: interviewDate,
          time: interviewTime,
          link: meetingLink
        })
      });

      const data = await res.json();
      alert(data.message);
      setInterviewMentor(null);
      setInterviewDate('');
      setInterviewTime('');
      setMeetingLink('');
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إرسال الإيميل');
    }
  };

  if (loading) return <p className="text-center p-8 text-gray-500">جاري تحميل البيانات...</p>;
  if (error) return <p className="text-center p-8 text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" dir="rtl">
      {mentors.map((mentor, i) => {
        console.log('Mentor status:', mentor.status, typeof mentor.status);

        return (
          <div key={i} className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300" dir="rtl">
            <img
              src={mentor.profilePictureUrl || img1}
              alt="mentor"
              className="w-full h-44 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {mentor.firstName} {mentor.lastName}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              الحالة: {
                mentor.stutas === 2 ? "قيد الانتظار" :
                mentor.stutas === 1 ? "مرفوض" :
                mentor.stutas === 0 ? "مقبول" : "غير معروف"
              }
            </p>
            <p className="text-gray-600 mb-2">{mentor.bio || 'لا توجد نبذة متاحة'}</p>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('قبول', mentor)}>قبول</button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('تواصل', mentor)}>تواصل</button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('عرض', mentor)}>عرض</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('رفض', mentor)}>رفض</button>
              <button className="bg-green-100 hover:bg-green-200 text-green-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('مقابلة', mentor)}>مقابلة</button>
            </div>
          </div>
        );
      })}

      {isChatOpen && chatMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              تواصل مع {chatMentor.firstName} {chatMentor.lastName}
            </h2>
            <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto mb-4">
              <p className="text-gray-600 text-sm">لا توجد رسائل بعد...</p>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="اكتب رسالتك..." className="flex-1 p-2 rounded border border-gray-300" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">إرسال</button>
            </div>
            <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded" onClick={() => setIsChatOpen(false)}>إغلاق الشات</button>
          </div>
        </div>
      )}

      {interviewMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right" dir="rtl">
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              تحديد موعد المقابلة مع {interviewMentor.firstName} {interviewMentor.lastName}
            </h2>
            <label className="block mb-2 text-sm text-gray-700">تاريخ المقابلة</label>
            <input type="date" className="w-full p-2 mb-4 border rounded" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
            <label className="block mb-2 text-sm text-gray-700">وقت المقابلة</label>
            <input type="time" className="w-full p-2 mb-4 border rounded" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} />
            <label className="block mb-2 text-sm text-gray-700">رابط الاجتماع</label>
            <input type="text" placeholder="https://meet.google.com/xyz" className="w-full p-2 mb-4 border rounded" value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} />
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-2" onClick={sendInterviewEmail}>إرسال دعوة المقابلة</button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded" onClick={() => setInterviewMentor(null)}>إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorsRequests;
