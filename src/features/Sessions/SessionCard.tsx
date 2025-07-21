import React from "react";
import type { SessionResponse } from "../Auth/RegisterMentor/types";
import { Button, Chip, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const statusColor = {
  "0": { label: "قيد الانتظار", color: "warning" },
  "1": { label: "تم القبول", color: "success" },
  "2": { label: "مرفوضة", color: "error" },
};

interface Props {
  session: SessionResponse;
}

const SessionCard = ({ session }: Props) => {
  const statusInfo = statusColor[session.status.toString() as "0" | "1" | "2"];

  return (
    <Paper elevation={3} className="p-4 rounded-xl space-y-4">
      <div dir="rtl" className="flex justify-between items-center">
        <Typography variant="body2" color="text.secondary">
          الوقت: {new Date(session.requestedDateTime).toLocaleString("ar-EG")}
        </Typography>
        <Chip label={statusInfo.label} variant="outlined" size="small" />
      </div>

      <div dir="rtl" className="text-right space-y-1">
        {/* <Typography><strong>اسم الطالب:</strong> {session.studentName}</Typography> */}
        <Typography>
          <strong>الوصف:</strong> {session.description || "لا يوجد وصف"}
        </Typography>
        <Typography>
          <strong>المادة:</strong> {session.subject}
        </Typography>
        <Typography>
          <strong>عدد النقاط:</strong> {session.pointsAmount}
        </Typography>
        <Typography>
          <strong>المدة المتوقعة:</strong> {session.estimatedDurationMinutes}{" "}
          دقيقة
        </Typography>
        <Typography>
          <strong>تاريخ القبول:</strong>{" "}
          {session.acceptedAt
            ? new Date(session.acceptedAt).toLocaleString("ar-EG")
            : "لم يتم القبول بعد"}
        </Typography>
      </div>

      {session.status === 1 && (
        <Link to="/chat">
          <Button
            variant="contained"
            fullWidth
            className="!mt-3 !bg-blue-600 hover:!bg-blue-700"
          >
            بدء محادثة مع المرشـد
          </Button>
        </Link>
      )}
    </Paper>
  );
};

export default SessionCard;
