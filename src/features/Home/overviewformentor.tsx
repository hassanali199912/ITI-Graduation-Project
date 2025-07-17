import { useEffect, useState } from "react";
import { useLazyGetSessionRequestsByTeacherIdQuery } from "../Auth/api/session";
import type { Session } from "../Auth/RegisterMentor/types";


const students = [
 { name: "أحمد", email: "ahmed@gmail.com", major: "الذكاء الاصطناعي",hour:'12:00pm',salary:'100$' },
  { name: "سارة", email: "sara@yahoo.com", major: "تطوير الويب",hour:'3:00pm',salary:'200$' },
  { name: "محمد", email: "mohamed@yahoo.com", major: "UI/UX" ,hour:'6:00pm',salary:'300$' },
  { name: "مصطفى", email: "mostafa@yahoo.com", major: "أنظمة المعلومات",hour:'1:00pm',salary:'400$' },
   { name: "كريم", email: "karim@yahoo.com", major: "تطوير الويب",hour:'8:00pm',salary:'300$' },
    { name: "معز", email: "moaz@yahoo.com", major: "علوم البيانات " ,hour:'12:00pm',salary:'350$'},
];

const Overviewmentor = () => {
  const [trigger, result] = useLazyGetSessionRequestsByTeacherIdQuery();
 const [sessionData, setSessionData] = useState([]);


  useEffect(()=>{
    const teacherId = localStorage.getItem("teacherId") ?? "";
    trigger({
      teacherId : teacherId,
      pageNumber: 1,
      pageSize: 10,
    })
  },[trigger])
  useEffect(() => {
  if (result.isSuccess) {
    console.log(" Data:", result.data);
        setSessionData(result.data.data.sessionRequest); // خزّنت الـ data في state

  }

  if (result.isError) {
    console.error(" Error:", result.error);
  }
}, [result]);
  return (
    // <div className="p-6">
    //   <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
    //     لوحة تحكم المرشد
    //   </h1>
    //     <div className="bg-yellow-50 p-4 rounded shadow"dir="rtl">
    //       <h2 className="text-lg font-bold text-blue-800 mb-4">طلبات مجدولة</h2>
    //       <div className="bg-white p-8 rounded-xl shadow-md">
     

    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {students.map((student, index) => (
    //       <div key={index} className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-md transition "dir="rtl">
    //         <h3 className="text-xl font-bold text-blue-800 mb-2">{student.name}</h3>
           
    //         <p className="text-black"><span className="font-semibold">التخصص:</span> {student.major}</p>
    //          <p className="text-blue-700 mb-1"><span className="font-semibold">البريد:</span> {student.email}</p>
    //           <p className="text-black mb-1 font-bold"><span className="font-semibold">ميعاد الحجز :<br></br></span> {student.hour}</p>
    //            <p className=" mb-1 text-blue-500 font-bold"><span className="font-semibold ">السعر :</span> {student.salary}</p>
    //            <div dir="rtl">
    //            <button className="bg-blue-500 hover:bg-blue-600  text-white  font-medium py-2 px-4 rounded border border-yellow-500 m-2">قبول</button>
    //            <button className="bg-blue-500 hover:bg-blue-600  text-white  font-medium py-2 px-4 rounded border border-yellow-500 m-2">تواصل</button>
    //            <button className="bg-gray-200 hover:bg-gray-300  text-black  font-medium py-2 px-4 rounded border border-yellow-500 m-2">رفض</button>
    //            </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    //     </div>

        
       
    //   </div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
  {sessionData?.map((session: Session) => (
    <div
      key={session.studentId}
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 flex flex-col justify-between text-right dir-rtl font-['Noto_Sans_Arabic'] max-w-sm"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          الطالب: <span className="font-semibold text-gray-800">{session.studentName}</span>
        </h2>

        <div className="space-y-3 text-base text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">المادة:</span>{" "}
            {session.subject}
          </p>
          <p>
            <span className="font-semibold text-gray-800">الوصف:</span>{" "}
            {session.description}
          </p>
          <p>
            <span className="font-semibold text-gray-800">المدة المتوقعة:</span>{" "}
            {new Intl.NumberFormat("ar-EG").format(session.estimatedDurationMinutes)} دقيقة
          </p>
          <p>
            <span className="font-semibold text-gray-800">الموعد:</span>{" "}
            {new Date(session.requestedDateTime).toLocaleString("ar-EG", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <span
          className={`inline-block px-5 py-2 rounded-full text-sm font-bold self-start shadow-sm
            ${
              session.status === 0
                ? "bg-yellow-200 text-yellow-900"
                : session.status === 1
                ? "bg-green-200 text-green-900"
                : session.status === 2
                ? "bg-red-200 text-red-900"
                : "bg-gray-200 text-gray-900"
            }`}
        >
          {session.status === 0
            ? "معلقة"
            : session.status === 1
            ? "مقبولة"
            : session.status === 2
            ? "مرفوضة"
            : "غير معروفة"}
        </span>

        <div className="flex justify-end gap-4">
          <button
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            قبول
          </button>
          <button
            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            رفض
          </button>
        </div>
      </div>
    </div>
  ))}
</div>




      
  
  );
};

export default Overviewmentor;
