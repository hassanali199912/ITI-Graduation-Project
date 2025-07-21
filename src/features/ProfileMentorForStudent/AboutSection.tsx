// components/AboutSection.tsx
import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
interface AboutProps {
    bio: string,
    id: string,
    firstName: string,

}
const AboutSection = ({ bio, id , firstName }: AboutProps) => {


    const navegator = useNavigate();
    const NavigateToChat = (id: string) => {
        
        navegator("/chat");
    }


    return (
        <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-16">
            {/* العنوان */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">حول</h2>

            {/* الفقرة التعريفية */}
            <p className="text-gray-700 leading-relaxed mb-4">
                {bio}
            </p>

            {/* قراءة المزيد */}
            <a href="#" className="text-[#0003C7] text-sm underline mb-6 inline-block">
                قراءة المزيد
            </a>

            {/* الكارد مع الزر */}
            <Card sx={{ backgroundColor: '#F4F9FB', borderRadius: 2 }}>
                <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6">
                    <div className="text-gray-700 text-sm text-center sm:text-right">
                        <ChatIcon fontSize="small" sx={{ color: '#0003C7' }} />
                        يمكنك مراسلة {firstName} لطرح أي أسئلة قبل حجز الخدمة
                    </div>
                    <Button variant="contained"
                        className="!bg-blue-600 hover:!bg-blue-700"
                        onClick={() => NavigateToChat(id)}>
                        تواصل الآن
                    </Button>
                </CardContent>
            </Card>


            {/* الخط الفاصل الداخلي */}
            <div className="w-full h-[1.5px] bg-gray-200 my-12" />
        </div>
    );
};

export default AboutSection;
