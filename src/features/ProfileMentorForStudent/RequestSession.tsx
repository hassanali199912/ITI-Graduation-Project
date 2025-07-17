import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import { useRequestSessionMutation } from "../Auth/api/session";

interface Props {
  teacherId: string;
}

export default function RequestSessionForm({ teacherId }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [requestSession] = useRequestSessionMutation();
  console.log(teacherId)
  const studentId = localStorage.getItem("studentId");
  console.log(studentId);
  const onSubmit = async (data: any) => {
    const dateTime = dayjs(`${data.date} ${data.time}`).toISOString();
    console.log('submitted');
    const payload = {
      studentId,
      teacherId,
      pointsAmount: 0,
      subject: data.subject,
      description: data.description,
      estimatedDurationMinutes: parseInt(data.duration),
      requestedDateTime: dateTime,
    };
    try {
    console.log("Payload to send:", payload);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sessions/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // لو فيه توكن
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      alert("فشل في إرسال الطلب.");
      return;
    }

    const result = await response.json();
    console.log("API Success:", result);
    alert("تم إرسال الطلب بنجاح!");
    reset(); // Reset the form after success
  } catch (error) {
    console.error("Unexpected Error:", error);
    alert("حدث خطأ أثناء إرسال الطلب.");
  }
  };

  return (
   <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-6 bg-white rounded-2xl p-6 shadow-xl w-full max-w-lg mx-auto"
>
  <h2 className="text-xl font-bold text-gray-800 text-center mb-2">طلب جلسة إرشادية</h2>

  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">عنوان الجلسة</label>
    <input
      {...register("subject", { required: true })}
      placeholder="مثلاً: حل مشكلة في React"
      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.subject && (
      <p className="text-xs text-red-500">العنوان مطلوب</p>
    )}
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">الوصف</label>
    <textarea
      {...register("description", { required: true })}
      rows={4}
      placeholder="اكتب تفاصيل المشكلة أو اللي محتاجه في الجلسة"
      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.description && (
      <p className="text-xs text-red-500">الوصف مطلوب</p>
    )}
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">مدة الجلسة (بالدقائق)</label>
    <input
      type="number"
      {...register("duration", { required: true })}
      placeholder="مثلاً 60"
      className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.duration && (
      <p className="text-xs text-red-500">المدة مطلوبة</p>
    )}
  </div>

  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1 space-y-2">
      <label className="block text-sm font-medium text-gray-700">التاريخ</label>
      <input
        type="date"
        {...register("date", { required: true })}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex-1 space-y-2">
      <label className="block text-sm font-medium text-gray-700">الوقت</label>
      <input
        type="time"
        {...register("time", { required: true })}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-md shadow-md"
  >
    اشترك الآن
  </button>
</form>

  );
}
