import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/images/head-shot-portrait-close-smiling-260nw-1714666150.webp';

const MentorsRequests = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [interviewMentor, setInterviewMentor] = useState<any>(null);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6; 
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`http://academix1.runasp.net/api/GetTeachers?status=2&pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((data) => {
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
        setTotalPages(data.data?.totalPages || 1); 
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("فشل تحميل البيانات");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageNumber]);




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
      console.log('mentor اللي ضغطنا عليه:', mentor);
      setSelectedMentor(mentor);
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
    } else if (action === 'مقابلة') {
      setInterviewMentor(mentor);
    }
  };

  const sendInterviewEmail = async () => {
    if (!interviewMentor || !interviewDate || !interviewTime || !meetingLink) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    const teacherEmail = localStorage.getItem('teacherEmail');
    const teacherId = localStorage.getItem('teacherId');
    const dateISO = `${interviewDate}T${interviewTime}:00.000Z`;

    const payload = {
      email: teacherEmail,
      name: `${interviewMentor.firstName} ${interviewMentor.lastName}`,
      date: dateISO,
      time: interviewTime,
      link: meetingLink,
      teacherId: teacherId
    };

    try {
      const res = await fetch('http://academix1.runasp.net/api/dashboard/interview/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        data.message = await res.text();
      }

      if (!res.ok) {
        throw new Error(data?.message || 'حدث خطأ أثناء إرسال الإيميل');
      }

      alert(data?.message || 'تم إرسال الإيميل بنجاح');
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
      {mentors.map((mentor, i) => (
        <div key={i} className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300">
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

          <div className="grid grid-cols-4 gap-2 mt-2">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('قبول', mentor)}>قبول</button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('عرض', mentor)}>عرض</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('رفض', mentor)}>رفض</button>
            <button className="bg-green-100 hover:bg-green-200 text-green-600 py-2 rounded-md font-semibold transition" onClick={() => handleAction('مقابلة', mentor)}>مقابلة</button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6" dir="rtl">
        <nav className="inline-flex rounded-md shadow-sm bg-gray-100 p-1">
          <button
            className={`px-3 py-2 rounded-l-md text-sm font-medium ${pageNumber === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-200'
              }`}
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`px-3 py-2 text-sm font-medium ${pageNumber === page
                    ? 'bg-blue-600 text-white rounded'
                    : 'text-blue-600 hover:bg-blue-200'
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            className={`px-3 py-2 rounded-r-md text-sm font-medium ${pageNumber === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-200'
              }`}
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber === totalPages}
          >
            »
          </button>
        </nav>
      </div>

      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-2xl text-right overflow-y-auto max-h-screen">
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              تفاصيل المنتور {selectedMentor.firstName} {selectedMentor.lastName}
            </h2>
            {selectedMentor.bio && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-2">نبذة تعريفية</h3>
                <div className="bg-gray-50 p-4 rounded shadow-sm text-sm text-gray-700">
                  {selectedMentor.bio}
                </div>
              </div>
            )}


            {selectedMentor.specialists?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-2">المجالات</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.specialists.map((spec: any, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm">
                      {spec.nameEn}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedMentor.skills?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-2">المهارات</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.skills.map((skill: any, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm">
                      {skill.skillName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedMentor.certificates?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-2">الشهادات</h3>
                <div className="space-y-3">
                  {selectedMentor.certificates.map((cert: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 p-4 rounded shadow-md text-sm text-gray-700 gap-2"
                    >
                      <span className="md:w-1/3"><strong>الشهادة:</strong> {cert.name || 'غير متوفر'}</span>
                      <span className="md:w-1/3"><strong>الجهة المانحة:</strong> {cert.issuedBy || 'غير متوفر'}</span>
                      <span className="md:w-1/3">
                        <strong>الرابط:</strong>{' '}
                        {cert.certificateUrl ? (
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            عرض الشهادة
                          </a>
                        ) : (
                          'غير متوفر'
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {selectedMentor.teacherEducations?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-blue-600 mb-2">المؤهلات التعليمية</h3>
                <div className="space-y-2">
                  {selectedMentor.teacherEducations.map((edu: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 p-3 rounded shadow-md text-sm text-gray-700 gap-2"
                    >
                      <span className="md:w-1/3"><strong>المؤسسة:</strong> {edu.institution}</span>
                      <span className="md:w-1/3"><strong>الدرجة:</strong> {edu.degree}</span>
                      <span className="md:w-1/3"><strong>التخصص:</strong> {edu.field}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded" onClick={() => setSelectedMentor(null)}>إغلاق</button>
          </div>
        </div>
      )}

      {interviewMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-right">
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
