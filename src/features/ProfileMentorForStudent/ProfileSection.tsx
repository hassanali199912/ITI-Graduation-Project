import React, { useEffect, useState } from 'react';
import PlansCard from './PlansCard';
import { Avatar, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { Teacher } from '../Auth/RegisterMentor/types';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ProfileSection = ({
  id,
  firstName,
  lastName,
  bio,
  specialists = [],
  skills = [],
  salary,
  profilePictureUrl,
}: Teacher) => {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <div dir="rtl" className="relative bg-white">
      {/* الخلفية العلوية */}
      <div className="bg-[#F4F9FB] h-64 w-full rounded-b-3xl"></div>

      <div className="max-w-7xl mx-auto -mt-24 px-6 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* معلومات المرشد */}
        <div className="flex flex-col items-start w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-5">
            <Avatar
              src={profilePictureUrl}
              alt="صورة البروفايل"
              sx={{ width: 130, height: 130, border: '4px solid white' }}
            />
            <div>
              <div className="flex items-center justify-between gap-50 ">
  <h1 className="text-xl font-semibold text-gray-900">{firstName + " " + lastName}</h1>

  {role === "teacher" && (
    <button
      onClick={() => navigate("/editprofile")}
      className="flex items-center mt-5 gap-2 bg-white border border-blue-600 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300 px-4 py-1.5 rounded-full shadow-sm hover:shadow-md"
    >
      <FaEdit className="text-blue-700 hover:text-white transition-all duration-300" />
      <span className="text-sm font-medium"> تعديل الملف الشخصى </span>
    </button>
  )}
</div>

              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                {specialists.map((specialist: any, index) => (
                  <span key={specialist.id || index} className="bg-blue-50 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {specialist.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mt-4 leading-relaxed border-r-4 border-blue-600 pr-3">{bio}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <LocationOnIcon fontSize="small" sx={{ color: '#0003C7' }} />
              <span>موقع غير محدد</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon fontSize="small" sx={{ color: '#0003C7' }} />
              <span>5.0 (22 مراجعة)</span>
            </div>
            <div className="flex items-center gap-2">
              <AccessTimeIcon fontSize="small" sx={{ color: '#0003C7' }} />
              <span>نشط اليوم - يرد عادة خلال ساعات</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {skills?.map((skill: any) => (
              <Chip key={skill.skillId} label={skill.skillName} />
            ))}
          </div>
        </div>

        {/* عرض الباقات للطالب */}
        {role === "student" && (
          <div className="w-full lg:w-1/3">
            <PlansCard price={salary} mentorId={id} />
          </div>
        )}

        
        
      </div>

      {/* خط فاصل سفلي */}
      <div className="w-full h-px bg-gray-200 mt-12 mb-6" />
    </div>
  );
};

export default ProfileSection;
