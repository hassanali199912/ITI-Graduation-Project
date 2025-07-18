import React from 'react';
import { Button, Card, CardContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useState } from 'react';
import ChatModal from '../../features/Auth/ChatModal';

const AboutSection = () => {
    const [openChat, setOpenChat] = useState(false);
    const currentUserId = localStorage.getItem('userId') || '';
    const mentorId = localStorage.getItem('viewedMentorId') || '';
    const mentorName = localStorage.getItem('viewedMentorName') || 'المنتور';

    return (
        <div dir="rtl" className="max-w-5xl mx-auto px-4 mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">حول</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
                قائد تقني / مهندس برمجيات بخبرة تزيد عن 20 سنة في دورة التطوير الكاملة، مكرس لدعم نمو الآخرين من خلال الإرشاد.
                <br />
                خلال مسيرتي، طورت مهاراتي في تصميم البرمجيات، التطوير، وإدارة الفرق، أثناء العمل على مشاريع متنوعة من الشركات الناشئة وحتى المؤسسات الكبرى.
            </p>

            <a href="#" className="text-[#0003C7] text-sm underline mb-6 inline-block">
                قراءة المزيد
            </a>

            <Card sx={{ backgroundColor: '#F4F9FB', borderRadius: 2 }}>
                <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6">
                    <div className="text-gray-700 text-sm text-center sm:text-right">
                        <ChatIcon fontSize="small" sx={{ color: '#0003C7' }} />
                        يمكنك مراسلة كاتالين لمناقشة أي أسئلة بعد حجز الخدمة
                    </div>
                    <Button
                        variant="contained"
                        className="!bg-[#0003C7] hover:!bg-gray-900"
                        onClick={() => setOpenChat(true)}
                    >
                        تواصل الآن
                    </Button>

                </CardContent>
            </Card>

            <div className="w-full h-[1.5px] bg-gray-200 my-12" />
            {openChat && (
                <ChatModal
                    currentUserId={currentUserId}
                    otherUserId={mentorId}
                    otherUserName={mentorName}
                    onClose={() => setOpenChat(false)}
                />
            )}

        </div>
    );
};

export default AboutSection;