// components/ProfileSection.tsx
import React from 'react';
import PlansCard from './PlansCard';
import { Avatar, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ProfileSection = () => {
  return (
    <>
      <div dir="rtl" className="relative bg-white">
        {/* الخلفية الزرقاء */}
        <div className="bg-[#F4F9FB] h-60 w-full"></div>

        <div className="max-w-7xl mx-auto -mt-20 px-6 flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Right: صورة البروفايل والمعلومات */}
          <div className="flex flex-col items-start w-full lg:w-2/3">
            <div className="flex items-center gap-4">
              <Avatar
                src="/🤖 AI Generated Avatars_ Rohan Sharma.png"
                alt="صورة البروفايل"
                sx={{ width: 150, height: 150, border: '3px solid white' }}
              />
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">كاتالين روسو</h1>
                <p className="text-sm text-gray-600">قائد تقني / مدير تطوير</p>
                <p className="text-sm text-[#0003C7] mt-1">
                  خبرة أكثر من 20 سنة في تطوير البرمجيات
                </p>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <LocationOnIcon fontSize="small" sx={{ color: '#0003C7' }} />
                <span>المملكة المتحدة</span>
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

            <div className="flex gap-2 mt-4">
              <Chip label="C#" />
              <Chip label=".NET" />
              <Chip label="Typescript" />
            </div>
          </div>

          {/* Left: الكارد */}
          <div className="w-full lg:w-1/3">
            <PlansCard />
          </div>
        </div>
      </div>

      {/* الخط الفاصل */}
      <div className="w-full h-[2px] bg-gray-200 my-12" />
    </>
  );
};


export default ProfileSection;

