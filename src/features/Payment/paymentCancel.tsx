import React from "react";
import Button from "../../shared/components/button";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Fade } from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-red-100 px-4"
      dir="rtl"
    >
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          className="rounded-3xl p-10 flex flex-col items-center max-w-md w-full shadow-2xl border border-red-200 bg-white/90"
          sx={{ backdropFilter: 'blur(2px)' }}
        >
          <span className="mb-6 animate-bounce">
            <CancelOutlinedIcon sx={{ fontSize: 80, color: '#D32F2F' }} />
          </span>
          <Typography
            variant="h3"
            className="font-extrabold text-red-700 mb-2 text-center"
            style={{ fontFamily: 'Zain, sans-serif', letterSpacing: '-1px' }}
          >
            تم إلغاء العملية
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-700 text-center mb-6"
            style={{ fontFamily: 'Zain, sans-serif' }}
          >
            لم تكتمل عملية الدفع. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
          </Typography>
          <Button
            onClick={() => navigate("/landingpage")}
            size="md"
            className="w-full text-lg py-3 mt-2 shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer !bg-red-600 hover:bg-red-700 text-white border-none"
          >
            العودة للصفحة الرئيسية
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default PaymentCancel; 