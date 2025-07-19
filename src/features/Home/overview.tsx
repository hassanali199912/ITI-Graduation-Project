import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// =====================================
// إعدادات عامة
// =====================================
const BASE_URL = "http://academix1.runasp.net/api";

// قيم حالات المرشد (حسب ما وضحتي)
const TEACHER_STATUS = {
  Accepted: 0, // مقبول
  Rejected: 1, // مرفوض
  Pending: 2,  // قيد الانتظار
};

// ألوان للـ Pie (هتتكرر لو عدد التخصصات أكبر)
const COLORS = ["#2c23e1ff", "#3e81cdff", "#f5c870ff", "#ff7f50", "#82ca9d", "#8884d8", "#ffc658", "#ff8042"];

// لو محتاجة headers (Authorization مثلاً) ضيفيهم هنا
const fetchOptions: RequestInit = {
  // headers: { Authorization: `Bearer ${token}` }
};

// =====================================
// Helpers
// =====================================

// استدعاء بسيط يرجع JSON أو يرمي خطأ
async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
}

// استدعاء Teachers مع pagination وجمع كل الصفحات (لازم عشان نبني توزيع التخصصات)
async function fetchAllTeachersByStatus(status: number): Promise<any[]> {
  const pageSize = 100; // عدلي لو الـ API يسمح بأكبر/أصغر
  let pageNumber = 1;
  let all: any[] = [];
  let hasNext = true;

  while (hasNext) {
    const url = `${BASE_URL}/GetTeachers?status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const json: any = await fetchJSON<any>(url);
    const teachersPage = json?.data?.teachers ?? [];
    all = all.concat(teachersPage);

    const totalPages = json?.data?.totalPages ?? pageNumber;
    hasNext = pageNumber < totalPages;
    pageNumber += 1;
  }

  return all;
}

// استدعاء واحد فقط لجلب العدد (باستخدام pageSize=1 لتقليل الداتا المنقولة)
async function fetchTeacherCount(status: number): Promise<number> {
  const url = `${BASE_URL}/GetTeachers?status=${status}&pageNumber=1&pageSize=1`;
  const json: any = await fetchJSON<any>(url);
  return json?.data?.totalCount ?? 0;
}

// تجميع التخصصات من مصفوفة المرشدين المقبولين
function buildSpecialtiesCounts(teachers: any[]): { name: string; value: number }[] {
  const counts: Record<string, number> = {};

  teachers.forEach((t) => {
    const specs = t?.specialists ?? [];
    specs.forEach((s: any) => {
      // بنختار الاسم العربي أولاً لو متاح، ثم الإنجليزي، وإلا "غير محدد"
      const label = s?.nameEn || "غير محدد";
      counts[label] = (counts[label] || 0) + 1;
    });
  });

  // تحويل إلى Array تناسب Recharts
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

// =====================================
// Component
// =====================================
const Overview: React.FC = () => {
  const [studentCount, setStudentCount] = useState<number>(0);
  const [pendingTeachers, setPendingTeachers] = useState<number>(0);
  const [acceptedTeachers, setAcceptedTeachers] = useState<number>(0);
  const [rejectedTeachers, setRejectedTeachers] = useState<number>(0);
  const [specialtiesData, setSpecialtiesData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorMsg("");

      try {
        // نشغل الاستدعاءات في نفس الوقت
        const [
          studentsJson,
          pendingCount,
          acceptedCount,
          rejectedCount,
          acceptedTeachersData,
        ] = await Promise.all([
          fetchJSON<any>(`${BASE_URL}/GetStudents`),
          fetchTeacherCount(TEACHER_STATUS.Pending),
          fetchTeacherCount(TEACHER_STATUS.Accepted),
          fetchTeacherCount(TEACHER_STATUS.Rejected),
          fetchAllTeachersByStatus(TEACHER_STATUS.Accepted),
        ]);

        if (cancelled) return;

        // الطلاب
        const stuCount = studentsJson?.data?.totalCount ?? 0;
        setStudentCount(stuCount);

        // أعداد المرشدين
        setPendingTeachers(pendingCount);
        setAcceptedTeachers(acceptedCount);
        setRejectedTeachers(rejectedCount);

        // Pie: توزيع التخصصات بناءً على المرشدين المقبولين
        const pieData = buildSpecialtiesCounts(acceptedTeachersData);
        setSpecialtiesData(pieData);
      } catch (err: any) {
        if (!cancelled) {
          setErrorMsg("تعذر تحميل البيانات. يرجى المحاولة لاحقًا.");
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // حالة التحميل / الخطأ
  if (loading) {
    return (
      <div className="flex-1 p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">لوحة التحكم - المسؤول</h1>
        <p className="text-gray-500">جاري تحميل البيانات...</p>
      </div>
    );
  }
  if (errorMsg) {
    return (
      <div className="flex-1 p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">لوحة التحكم - المسؤول</h1>
        <p className="text-red-600">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">
        لوحة التحكم - المسؤول
      </h1>

      {/* بطاقات الأرقام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">عدد الطلاب</p>
          <p className="text-2xl mt-2 font-extrabold">{studentCount}</p>
        </div>
        <div className="bg-yellow-100 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">مرشدين قيد الانتظار</p>
          <p className="text-2xl mt-2 font-extrabold">{pendingTeachers}</p>
        </div>
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">مرشدين مقبولين</p>
          <p className="text-2xl mt-2 font-extrabold">{acceptedTeachers}</p>
        </div>
        <div className="bg-yellow-100 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">مرشدين مرفوضين</p>
          <p className="text-2xl mt-2 font-extrabold">{rejectedTeachers}</p>
        </div>
      </div>

      {/* توزيع التخصصات (منتصف الصفحة) */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
          <h2 className="text-lg font-bold mb-4 text-blue-800 text-center">
            توزيع تخصصات المرشدين المقبولين
          </h2>
          {specialtiesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specialtiesData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {specialtiesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">لا يوجد بيانات تخصصات.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;


