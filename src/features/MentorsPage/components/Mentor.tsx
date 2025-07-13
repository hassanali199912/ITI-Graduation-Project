import React from 'react'
interface MentorProps {
  firstName: string;
  lastName: string;
  bio: string;
  position: string;
  skills: string[];
  salary: number;
  imgUrl?: string; // علامة ? معناها إنه اختياري
}
export default function Mentor({firstName,lastName,bio,position,skills,salary,imgUrl} : MentorProps) {
  return (
    <div
  dir="rtl"
  className="my-4 relative box px-7 py-8 transition-all duration-150 mb-6 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-sm"
>
  <div className="sm:grid grid-cols-24 sm:space-x-10">
    {/* صورة الـ Mentor */}
    <div className="col-span-7 md:col-span-5 relative">
      <a
        href="#"
        className="relative w-full h-60 bg-center bg-cover inline-block rounded-lg overflow-hidden md:mb-20"
      >
        <img
          src={imgUrl}
          alt="Mentor"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </a>
    </div>

    {/* المحتوى */}
    <div className="main-content-col col-span-full col-start-8 md:col-start-6 border-0 pr-10 text-right">
      <div className="relative h-full">
        {/* الاسم */}
        <h3 className="text-2xl text-gray-900 font-bold mb-2">
          {firstName}  {lastName}
        </h3>

        {/* الوظيفة */}
        <p className="text-sm text-gray-900 mb-4">
          {position}
        </p>

        {/* نبذة */}
        <p className="text-sm leading-6 mb-6 max-w-screen-md">
         {bio}
        </p>

        {/* المهارات / البادچز */}
        <div className="flex flex-wrap gap-3 mb-6 justify-end">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* السعر و الزر */}
        <div className="md:grid grid-cols-5 items-center gap-4">
          <div className="col-span-2 mb-4 sm:mb-0">
            <div className="text-black text-2xl lg:text-3xl font-bold leading-none">
              <span className="block text-gray-500 text-sm font-medium">
                يبدأ من
              </span>
              ${salary}
              <span className="font-semibold text-lg"> / شهر</span>
            </div>
          </div>

          <div className="col-span-3">
            <a
              href="#"
              className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors duration-150"
            >
              عرض الملف
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
