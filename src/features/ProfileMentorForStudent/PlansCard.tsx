// components/PlansCard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportIcon from '@mui/icons-material/Support';
import RequestSessionForm from './RequestSession';
interface PlansCardProps {
  price: number;
  mentorId:string;  
}

const PlansCard = ({price,mentorId}:PlansCardProps) => {
  const [showForm, setShowForm] = useState(false);
  const studentId = localStorage.getItem("userId");

  const handleSubscribe = () => {
    setShowForm(true);
  };
  useEffect(() => {
    console.log(mentorId);
  }, [mentorId])
  
  return (
    <Card dir="rtl" className="shadow-lg rounded-xl overflow-hidden">
      <CardContent className="space-y-4">
        <div className="flex ">
          <div className="flex gap-2 bg-[#FBF6E6] text-[#DBA507] px-4 py-1 rounded-full text-sm font-medium">
            الخطة العادية
          </div>
        </div>

        <h2 className="text-3xl font-bold text-right text-gray-900 px-2">
          {price}$ <span className="text-base font-normal">/ شهرياً</span>
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

        <Button onClick={handleSubscribe} variant="contained" fullWidth className="!bg-[#0003C7] hover:!bg-blue-800">
          اشترك الآن
        </Button>
         {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-lg shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <RequestSessionForm  teacherId={mentorId} />
          </div>
        </div>
      )}
        <p className="text-right text-sm text-gray-500 py-2">تبقّى فقط مقعدين!</p>
      </CardContent>
    </Card>
  );
};

export default PlansCard;

