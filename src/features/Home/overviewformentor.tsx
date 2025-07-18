import { useEffect, useState } from "react";
import { useAcceptSessionRequestMutation, useLazyGetSessionRequestsByTeacherIdQuery } from "../Auth/api/session";
import type { Session } from "../Auth/RegisterMentor/types";
import { toast } from "react-toastify";


const Overviewmentor = () => {
  const [trigger, result] = useLazyGetSessionRequestsByTeacherIdQuery();
 const [sessionData, setSessionData] = useState([]);
 const [acceptSession, { isLoading: isAccepting }] = useAcceptSessionRequestMutation();

  const fetchSessions = () => {
    const teacherId = localStorage.getItem("teacherId") ?? "";
    trigger({
      teacherId: teacherId,
      pageNumber: 1,
      pageSize: 10,
    });
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (result.isSuccess) {
      setSessionData(result.data.data.sessionRequest);
    }

    if (result.isError) {
      console.error("Error:", result.error);
    }
  }, [result]);

  // ✅ دالة القبول بـ fetch


const acceptSession = async (sessionRequestId: string) => {
  const teacherId = localStorage.getItem("teacherId") ?? "";
  setIsAccepting(true);
console.log({
  sessionRequestId,
  teacherId,
  scheduledStartTime: new Date().toISOString(),
});
  try {
    const res: any = await acceptRequest({
      sessionRequestId,
      teacherId,
      scheduledStartTime: new Date().toISOString(),
    }).unwrap();

    if (res.status) {
      toast.success("تم قبول الجلسة بنجاح");
      fetchSessions();
    } else {
      toast.error(`فشل القبول: ${res.message || "حدث خطأ"}`);
    }
  } catch (err: any) {
    console.error("خطأ في القبول:", err);
    toast.error(err || "حدث خطأ أثناء محاولة القبول");
  } finally {
    setIsAccepting(false);
  }
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {sessionData?.map((session: Session) => (
        <div
          key={session.id}
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
  onClick={async () => {
    const teacherId = localStorage.getItem("teacherId") ?? "";
    try {
      await acceptSession({
        sessionRequestId: session.id,
        teacherId: teacherId,
        scheduledStartTime: new Date().toISOString(),
      });

      toast.success(" تم قبول الجلسة بنجاح");

      // إعادة تحميل البيانات
      trigger({
        teacherId: teacherId,
        pageNumber: 1,
        pageSize: 10,
      });
    } catch (err) {
      toast.error(" حدث خطأ أثناء القبول");
      console.error(err);
    }
  }}
  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
  {isAccepting ? "جارٍ القبول..." : "قبول"}
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
