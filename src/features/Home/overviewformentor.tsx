import { useState } from 'react';
import ChatModal from '../../features/Auth/ChatModal';

const students = [
  { name: "أحمد", email: "ahmed@gmail.com", major: "الذكاء الاصطناعي", hour: '12:00pm', salary: '100$' },
  { name: "سارة", email: "sara@yahoo.com", major: "تطوير الويب", hour: '3:00pm', salary: '200$' },
  { name: "محمد", email: "mohamed@yahoo.com", major: "UI/UX", hour: '6:00pm', salary: '300$' },
  { name: "مصطفى", email: "mostafa@yahoo.com", major: "أنظمة المعلومات", hour: '1:00pm', salary: '400$' },
  { name: "كريم", email: "karim@yahoo.com", major: "تطوير الويب", hour: '8:00pm', salary: '300$' },
  { name: "معز", email: "moaz@yahoo.com", major: "علوم البيانات ", hour: '12:00pm', salary: '350$' },
];

const Overviewmentor = () => {
  const [openChat, setOpenChat] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const currentUserId = localStorage.getItem('userId') || '';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
        لوحة تحكم المرشد
      </h1>

      <div className="bg-yellow-50 p-4 rounded shadow" dir="rtl">
        <h2 className="text-lg font-bold text-blue-800 mb-4">طلبات مجدولة</h2>
        <div className="bg-white p-8 rounded-xl shadow-md">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-md transition " dir="rtl">
                <h3 className="text-xl font-bold text-blue-800 mb-2">{student.name}</h3>

                <p className="text-black"><span className="font-semibold">التخصص:</span> {student.major}</p>
                <p className="text-blue-700 mb-1"><span className="font-semibold">البريد:</span> {student.email}</p>
                <p className="text-black mb-1 font-bold"><span className="font-semibold">ميعاد الحجز :<br></br></span> {student.hour}</p>
                <p className=" mb-1 text-blue-500 font-bold"><span className="font-semibold ">السعر :</span> {student.salary}</p>
                <div dir="rtl">
                  <button className="bg-blue-500 hover:bg-blue-600  text-white  font-medium py-2 px-4 rounded border border-yellow-500 m-2">قبول</button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded border border-yellow-500 m-2"
                    onClick={() => {
                      setSelectedStudent(student);
                      setOpenChat(true);
                    }}
                  >
                    تواصل الان
                  </button>

                  <button className="bg-gray-200 hover:bg-gray-300  text-black  font-medium py-2 px-4 rounded border border-yellow-500 m-2">رفض</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openChat && selectedStudent && (
        <ChatModal
          currentUserId={currentUserId}
          otherUserId={selectedStudent.email}
          otherUserName={selectedStudent.name}
          onClose={() => setOpenChat(false)}
        />
      )}
    </div>

  );
};

export default Overviewmentor;