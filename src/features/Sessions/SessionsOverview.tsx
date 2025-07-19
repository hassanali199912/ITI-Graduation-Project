import React, { useState } from "react";
import SessionCard from "./SessionCard";
import { useGetSessionRequestByStudentIdQuery } from "../Auth/api/session";
import type { SessionResponse } from "../Auth/RegisterMentor/types";
import { Tabs, Tab } from "@mui/material";

const tabs = [
  { label: "الكل", value: "all" },
  { label: "قيد الانتظار", value: "pending" },
  { label: "تم القبول", value: "accepted" },
  { label: "مرفوضة", value: "rejected" },
  { label: "منتهية", value: "ended" },
];

const SessionsOverview = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const studentId = localStorage.getItem("studentId") ?? "";
  const payload = {
    studentId,
    pageNumber: 1,
    PageSize: 10,
  };

  const { data, isLoading, isError } = useGetSessionRequestByStudentIdQuery(payload);

  const filteredSessions = data?.data.sessionRequest.filter(
    (session: SessionResponse) => {
      if (selectedTab === "all") return true;
      return session.status === selectedTab;
    }
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">جلساتي</h1>

      {/* Layout Tabs right + content left */}
      <div className="flex flex-row-reverse gap-6">
        {/* Tabs on the right */}
        <div className="w-48">
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            aria-label="جلسات"
            className="border border-gray-200 rounded-md"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                className="!items-end !text-right !font-medium !text-gray-700"
              />
            ))}
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1">
          {isLoading && <p className="text-center text-gray-500">جارٍ التحميل...</p>}
          {isError && <p className="text-center text-red-500">حدث خطأ أثناء جلب الجلسات.</p>}
          {filteredSessions?.length === 0 && (
            <p className="text-center text-gray-600">لا توجد جلسات حالياً.</p>
          )}

          <div className="grid gap-4">
            {filteredSessions?.map((session: SessionResponse) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsOverview;
