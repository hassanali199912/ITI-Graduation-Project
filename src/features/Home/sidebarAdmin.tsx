
import React from "react";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaCog, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdAddBox } from "react-icons/md"; // Material Icons


type Props = {
  setView: (view: 'overview' | 'students' | 'mentors'|'mentorsrequests'|'addskill') => void;
};

const Sidebar: React.FC<Props> = ({ setView }) => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen w-64 bg-blue-800 text-white flex flex-col p-6 shadow-lg sticky top-0">

      <div className="text-2xl font-bold mb-10 text-center">لوحة التحكم المسؤول</div>

      <ul className="space-y-6 text-right pr-4">
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer" onClick={() => navigate('/landingpage')}>
          <span>الصفحة الرئيسية</span>
          <FaHome />
        </li>
        
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer"onClick={() => setView('mentors')}>
          <span>المرشدين الفعالة</span>
          <FaChalkboardTeacher />
        </li>
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer"onClick={() => setView('mentorsrequests')}>
          <span>الطلبات</span>
          <FaChalkboardTeacher />
        </li>

        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer"onClick={() => setView('overview')}>
                  <span>لوحة التحكم</span>
        <MdDashboard></MdDashboard>
                </li>
        
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer"onClick={() => setView('students')}>
          <span>الطلاب</span>
          <FaUserGraduate />
        </li>
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer"onClick={() => setView('addskill')}>
          <span>اضافة مهارة</span>
          <MdAddBox />
        </li>
        <li className="flex items-center justify-end gap-3 hover:text-yellow-400 cursor-pointer">
          <span>الإعدادات</span>
          <FaCog />
        </li>
        <li className="flex items-center justify-end gap-3 hover:text-red-400 cursor-pointer mt-auto">
          <span>تسجيل الخروج</span>
          <FaSignOutAlt />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
