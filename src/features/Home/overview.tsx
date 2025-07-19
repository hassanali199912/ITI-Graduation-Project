import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import { useLazyGetSessionsQuery, useLazyGetStudentsQuery, useLazyGetTeachersQuery } from '../Auth/api/dashboard';

const COLORS = ["#2c23e1ff", "#3e81cdff", "#f5c870ff", "#ff7f50"];

const specialtiesData = [
  { name: "تطوير الويب", value: 400 },
  { name: "الذكاء الاصطناعي", value: 300 },
  { name: "UI/UX", value: 200 },
  { name: "قواعد البيانات", value: 100 },
];

const studentGrowthData = [
  { month: "يناير", طلاب: 50 },
  { month: "فبراير", طلاب: 80 },
  { month: "مارس", طلاب: 120 },
  { month: "أبريل", طلاب: 150 },
  { month: "مايو", طلاب: 200 },
  { month: "يونيو", طلاب: 300 },
  { month: "يوليو", طلاب: 400 },
];

const Overview = () => {
  const [triggerStudents , {data : students}] = useLazyGetStudentsQuery();
  const [triggerSessions , {data : sessions}] = useLazyGetSessionsQuery();
  const [triggerTeachers , {data : teachers}] = useLazyGetTeachersQuery();
  const [totalCountForTechers, setTotalCountForTechers] = useState(0);
const fetchAllTeachers = async () => {
  const requests = await Promise.all([
    triggerTeachers({ status: 0, pageNumber: 1, pageSize: 30 }).unwrap(),
    triggerTeachers({ status: 1, pageNumber: 1, pageSize: 30 }).unwrap(),
    triggerTeachers({ status: 2, pageNumber: 1, pageSize: 30 }).unwrap(),
  ]).then((res)=>{
    console.log(res);
    const total = res.reduce((acc, item) => {
    return acc + (item?.data?.totalCount || 0);
    }, 0);
    setTotalCountForTechers(total);

console.log("إجمالي عدد المدرسين في كل الحالات:", total);
  });

  // const allTeachers = [
  //   ...requests[0],
  //   ...requests[1],
  //   ...requests[2],
  // ];

  // console.log(allTeachers);23w // هنا كل المدرسين من الثلاث حالات
};
  useEffect(() => {
    triggerStudents({
       pageNumber : 1,
       pageSize : 20
    });
    triggerSessions({
      pageNumber : 1,
       pageSize : 30
    });
    triggerTeachers({
      status : 0 ,
      pageNumber : 1,
       pageSize : 30
    });
    fetchAllTeachers();

  }, [triggerStudents , triggerSessions ])
 useEffect(() => {
  if (students ) {
    console.log(students, 'students');
  }
  if ( sessions) { 
    console.log(sessions, 'sessions');
  }
}, [students,sessions]);



  const studentsTotalCount = students?.data.totalCount;
  const sessionTotalCount = sessions?.data.totalCount;
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-blue-800 text-center mb-6">
        لوحة التحكم - المسؤول
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">عدد الطلاب</p>
          <p className="text-2xl mt-2 font-extrabold">{studentsTotalCount}+</p>
        </div>
        <div className="bg-yellow-100 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">عدد الجلسات</p>
          <p className="text-2xl mt-2 font-extrabold">{sessionTotalCount}</p>
        </div>
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">عدد المرشدين</p>
          <p className="text-2xl mt-2 font-extrabold">{totalCountForTechers}</p>
        </div>
        <div className="bg-yellow-100 text-blue-800 p-4 rounded-lg shadow">
          <p className="text-lg font-bold">طلبات الدعم</p>
          <p className="text-2xl mt-2 font-extrabold">18</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4 text-blue-800 text-center">
            نمو الطلاب شهريًا
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="طلاب" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4 text-blue-800 text-center">
            توزيع التخصصات
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={specialtiesData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {specialtiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Overview;
