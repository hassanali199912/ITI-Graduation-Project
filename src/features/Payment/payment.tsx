import React from "react";
import Button from "../../shared/components/button";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Fade } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4"
      dir="rtl"
    >
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          className="rounded-3xl p-10 flex flex-col items-center max-w-md w-full shadow-2xl border border-green-200 bg-white/90"
          sx={{ backdropFilter: 'blur(2px)' }}
        >
          <span className="mb-6 animate-bounce">
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#1B8354' }} />
          </span>
          <Typography
            variant="h3"
            className="font-extrabold text-green-700 mb-2 text-center"
            style={{ fontFamily: 'Zain, sans-serif', letterSpacing: '-1px' }}
          >
            تمت العملية بنجاح!
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-700 text-center mb-6"
            style={{ fontFamily: 'Zain, sans-serif' }}
          >
            شكراً لك على الدفع. تم إتمام عملية الدفع بنجاح ويمكنك الآن الاستمتاع بخدماتنا.
          </Typography>
          <Button
            onClick={() => navigate("/landingpage")}
        
            size="md"
            className="w-full text-lg py-3 mt-2 shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer !bg-green-600 hover:bg-green-700 text-white border-none"
          >
            العودة للصفحة الرئيسية
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default PaymentSuccess;
