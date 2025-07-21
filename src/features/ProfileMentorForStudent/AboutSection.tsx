// components/AboutSection.tsx
import React, { useState } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';

interface AboutProps {
    bio: string,
    id: string,
    userId: string,

}
const AboutSection = ({ bio, id, userId }: AboutProps) => {
    const [open, setOpen] = useState(false);
    const navigator = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        setOpen(false);
        console.log("tjis js sdjsj id", userId);
        navigator("/chat", { state: { mentorId: id, teacherId: userId } });
    };


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
                        يمكنك مراسلة كاتالين لطرح أي أسئلة قبل حجز الخدمة
                    </div>
                    <Button
                        variant="contained"
                        className="!bg-blue-600 hover:!bg-blue-700"
                        onClick={handleOpen}
                    >
                        تواصل الآن
                    </Button>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>تأكيد التواصل</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        هل أنت متأكد أنك تريد التواصل مع هذا المرشد؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        إلغاء
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        نعم، تواصل
                    </Button>
                </DialogActions>
            </Dialog>

            {/* الخط الفاصل الداخلي */}
            <div className="w-full h-[1.5px] bg-gray-200 my-12" />
        </div>
    );
};

export const AboutSectionSkeleton = () => (
    <div className="max-w-5xl mx-auto px-4 mt-16">
        <Skeleton variant="text" width={120} height={32} style={{ marginBottom: 8 }} />
        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginBottom: 16 }} />
        <Skeleton variant="text" width={80} height={24} style={{ marginBottom: 16 }} />
        <Skeleton variant="rectangular" width="100%" height={80} />
    </div>
);

export default AboutSection;
