// components/MenteesReviews.tsx
import React from 'react';
import { Avatar, Rating } from '@mui/material';

const reviews = [
  {
    name: 'ديميترو',
    date: '30 مايو 2025',
    plan: 'خطة لايت · منذ 14 شهرًا',
    content: 'على مدار العام الماضي، كانت إرشادات كاتالين دعمًا رائعًا في مسيرتي...',
    avatar: '/Ellipse 18.png',
  },
  {
    name: 'بهوپندرا',
    date: '16 نوفمبر 2024',
    plan: 'الخطة العادية · منذ 9 أشهر',
    content: 'كاتالين مرشد رائع، ودود جدًا وذو معرفة كبيرة في مجاله...',
    avatar: '/Ellipse 17.png',
  },
  {
    name: 'إبنول',
    date: '21 مارس 2025',
    plan: 'الخطة العادية · منذ 5 أشهر',
    content: 'كاتالين ساعدني كثيرًا في البحث عن وظيفة في .NET...',
    avatar: '/Ellipse 16.png',
  },
];

const MenteesReviews = () => {
  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">ماذا يقول المتدربون</h2>

      <div className="space-y-12">
        {reviews.map((review, index) => (
          <div key={index}>
            {/* صورة واسم وتفاصيل */}
            <div className="flex items-start gap-4 mb-2">
              <Avatar
                src={review.avatar}
                sx={{ width: 80, height: 80 }}
              />
              <div className="flex flex-col text-sm w-full">
                {/* الاسم */}
                <span className="font-medium text-gray-900">{review.name}</span>

                {/* ⭐ التقييم + التاريخ + الخطة */}
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  {/* يمين: تقييم + تاريخ */}
                  <div className="flex items-center gap-2">
                    <Rating value={5} readOnly size="small" sx={{ direction: 'ltr' }} />
                    <span>{review.date}</span>
                  </div>

                  {/* يسار: الخطة */}
                  <span>{review.plan}</span>
                </div>
              </div>
            </div>

            {/* محتوى المراجعة */}
            <p className="text-gray-800 text-sm leading-relaxed mt-2">
              {review.content}
            </p>

            {/* خط فاصل بعد كل تقييم (ما عدا الأخير) */}
            {index !== reviews.length - 1 && (
              <div className="w-full h-[1.5px] bg-gray-200 my-12" />
            )}
          </div>
        ))}
      </div>

      {/* زر عرض المزيد */}
      <div className="text-center mt-10">
        <button className="text-sm text-blue-700 underline hover:text-blue-900 mb-4">
          عرض المزيد من المراجعات
        </button>
      </div>
    </div>
  );
};

export default MenteesReviews;


