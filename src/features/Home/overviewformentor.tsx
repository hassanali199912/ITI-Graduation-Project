import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#2c23e1", "#3e81cd", "#f5c870", "#ff7f50"];

const sessionsByTopic = [
  { name: "تطوير الويب", value: 15 },
  { name: "الذكاء الاصطناعي", value: 10 },
  { name: "UI/UX", value: 7 },
  { name: "قواعد البيانات", value: 5 },
];

const studentRequests = [
  { name: "أحمد", session: "تطوير الويب", time: "الأحد 5 م" },
  { name: "سارة", session: "UI/UX", time: "الإثنين 3 م" },
];

const messages = [
  { student: "محمد", msg: "محتاج مساعده في المشروع النهائي" },
  { student: "لينا", msg: "موعد الجلسة امتى؟" },
];

const reviews = [
  { student: "فاطمة", text: "مرشد ممتاز وساعدني أفهم الكود 👍" },
  { student: "خالد", text: "جلسة مفيدة جدًا وتنظيم ممتاز" },
];

const Overviewmentor = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
        لوحة تحكم المرشد
      </h1>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow mb-10">
        
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">
            توزيع الجلسات حسب التخصص
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sessionsByTopic}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {sessionsByTopic.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        
        <div className="flex flex-col justify-center items-center bg-blue-50 rounded-lg p-6">
          <p className="text-lg text-blue-800 font-semibold mb-4">أقرب جلسة مجدولة</p>
          <p className="text-xl font-bold text-gray-700">مع: سارة</p>
          <p className="text-md text-gray-600 mt-1">التخصص: UI/UX</p>
          <p className="text-md text-gray-600 mt-1">التوقيت: اليوم الساعة 4 مساءً</p>
          <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
            بدء الجلسة
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
        <div className="bg-yellow-50 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-blue-800 mb-4">طلبات مجدولة</h2>
          {studentRequests.map((r, i) => (
            <div key={i} className="flex justify-between items-center bg-white p-3 rounded mb-2 shadow">
              <p>{r.name} - {r.session} - {r.time}</p>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">قبول</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">رفض</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">اقتراح وقت</button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-blue-50 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-blue-800 mb-4">الرسائل الجديدة</h2>
          {messages.map((m, i) => (
            <div key={i} className="bg-white p-3 rounded mb-2 shadow">
              <p className="font-bold">{m.student}:</p>
              <p>{m.msg}</p>
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">رد</button>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold text-blue-800 mb-4">آراء الطلاب</h2>
        {reviews.map((rev, i) => (
          <div key={i} className="border-b border-gray-200 pb-2 mb-2">
            <p className="font-bold">{rev.student}</p>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overviewmentor;
