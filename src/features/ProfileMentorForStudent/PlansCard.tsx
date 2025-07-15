// components/PlansCard.tsx
import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportIcon from '@mui/icons-material/Support';

const PlansCard = () => {
  return (
    <Card dir="rtl" className="shadow-lg rounded-xl overflow-hidden">
      <CardContent className="space-y-4">
        <div className="flex ">
          <div className="flex gap-2 bg-[#FBF6E6] text-[#DBA507] px-4 py-1 rounded-full text-sm font-medium">
            الخطة العادية
          </div>
        </div>

        <h2 className="text-3xl font-bold text-right text-gray-900 px-2">
          240$ <span className="text-base font-normal">/ شهرياً</span>
        </h2>

        <p className="text-right text-sm text-gray-600 px-2">
          الطريقة الأكثر شيوعًا للحصول على الإرشاد، لنعمل على تحقيق أهدافك!
        </p>

        <ul className="space-y-2 text-gray-700 text-sm px-2">
          <li className="flex items-center gap-2">
            <PhoneIcon fontSize="small" sx={{ color: '#0003C7' }} /> 4 مكالمات شهرياً (30 دقيقة لكل مكالمة)
          </li>
          <li className="flex items-center gap-2">
            <ChatIcon fontSize="small" sx={{ color: '#0003C7' }} /> دردشة غير محدودة
          </li>
          <li className="flex items-center gap-2">
            <AccessTimeIcon fontSize="small" sx={{ color: '#0003C7' }} /> الرد خلال 24 ساعة أو أقل
          </li>
          <li className="flex items-center gap-2">
            <SupportIcon fontSize="small" sx={{ color: '#0003C7' }} /> دعم عملي مباشر
          </li>
        </ul>

        <Button variant="contained" fullWidth className="!bg-[#0003C7] hover:!bg-blue-800">
          اشترك الآن
        </Button>

        <p className="text-right text-sm text-gray-500 py-2">تبقّى فقط مقعدين!</p>
      </CardContent>
    </Card>
  );
};

export default PlansCard;

