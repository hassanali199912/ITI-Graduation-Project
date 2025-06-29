import React, { useState } from "react";
import FormInput from "./components/FormInput";
import AddIcon from "@mui/icons-material/Add";
export default function StepFive() {
  const [examName, setExamName] = useState("");
  const [rate, setRate] = useState("");
  const [givingOrg, setGivingOrg] = useState("");
  const [examCertificates, setExamCertificates] = useState("");
  let months: Array<string> = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  let years: Array<number> = Array.from(
    { length: 2025 - 1998 + 1 },
    (_, i) => 1998 + i
  );
  return (
    <>
      <div className="my-8">
        <p className="text-3xl font-bold">الإمتحانات السابقة</p>
      </div>
      <div className="flex my-8">
        <div className="w-3/4">
          <p className="font-bold">هل سبق أن اجتزت اختبارات في مجالك؟</p>
        </div>
        <div className="w-1/4">
          <div className="flex gap-4 items-center">
            {/* نعم */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="accepting"
                className="w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500"
              />
              نعم
            </label>

            {/* لا */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="accepting"
                className="w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500"
              />
              لا
            </label>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <FormInput
            id="exam-name"
            placeholder="اكتب اسم الامتحان "
            label="اذكر اسم الامتحان "
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <FormInput
            id="rate-name"
            placeholder="تقييم الامتحان "
            label="التقييم "
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>
      <FormInput
        id="giving-org"
        label="من الجهة التي نظمت الامتحان ؟"
        placeholder="الجهة المانحة"
        value={givingOrg}
        onChange={(e) => setGivingOrg(e.target.name)}
      />
      <div className="flex items-center gap-4">
        <div className="w-3/4">
          <FormInput
            id="exam-certificates"
            label="هل لديك شهادات لهذا الامتحان؟"
            placeholder="أضفها هنا"
            value={examCertificates}
            onChange={(e) => setExamCertificates(e.target.value)}
            hint="يمكنك رفع ملفات الشهادات بصيغة PDF أو صورة"
          />
        </div>
        <div className="w-1/4">
          <button className="cursor-pointer flex items-center gap-2 px-4 border-1 border-blue-500 text-blue-700 p-2 rounded-lg">
            <span>
              <img src="/attach.png"></img>
            </span>
            تحميل
          </button>
        </div>
      </div>
      <div className="flex w-full items-center mb-8">
        <div className="w-1/2">
            <label htmlFor="exam-time" className="block text-right mb-2 font-bold">
              متى اجتزت هذا الاختبار؟ 
            </label>
        </div>
        <div className="flex gap-2 w-1/2">
          <div className="w-1/2">
          <select
                className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                defaultValue=""
              >
                <option value="" disabled>
                  الشهر
                </option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select></div>
              <div className="w-1/2">
              <select
                className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                defaultValue=""
              >
                <option value="" disabled>
                  السنة
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              </div>
        </div>
      </div>
       <div className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer">
            <span className="p-1 inline-flex items-center justify-center text-white">
              <AddIcon fontSize="small" className="text-blue-500"/>
            </span>
            <p className="font-bold text-blue-500">
              اضف امتحانات اخري
            </p>
          </div>
    </>
  );
}
