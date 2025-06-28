import React from "react";
import AddIcon from "@mui/icons-material/Add";
const StepTwo = () => {
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
      <form action="" className="my-16">
        <div className="form-control mb-8">
          <label htmlFor="qualification" className="block text-right mb-2 font-bold">
            المؤهل الدراسي
          </label>
          <input
            type="text"
            id="qualification"
            className="bg-blue-50 p-2 w-full rounded"
            placeholder="ما هو آخر مؤهل حصلت عليه؟"
          />
        </div>
        <div className="form-control mb-8">
          <label htmlFor="org" className="block text-right mb-2 font-bold">
            المؤسسة التعليمية
          </label>
          <input
            type="text"
            className="bg-blue-50 p-2 w-full rounded"
            id="org"
            placeholder="من أين حصلت على هذا المؤهل؟"
          />
        </div>
        <div className="form-control mb-8">
          <label htmlFor="spec" className="block text-right mb-2 font-bold">
            التخصص الدراسى
          </label>
          <input
            type="text"
            className="bg-blue-50 p-2 w-full rounded"
            id="spec"
            placeholder="ما هو تخصصك الأكاديمى ؟ "
          />
        </div>
        <div className="flex gap-4">
          <div className="form-control mb-8 w-1/2">
            <label htmlFor="type" className="block text-right mb-2 font-bold">
              تاريخ البدايه
            </label>
            <div className="flex gap-2">
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
              </select>
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

          <div className="form-control mb-8 w-1/2">
            <label htmlFor="type" className="block text-right mb-2 font-bold">
              تاريخ النهاية
            </label>
            <div className="flex gap-2">
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
              </select>
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
         <div className="add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer">
            <span className="p-1 inline-flex items-center justify-center text-white">
              <AddIcon fontSize="small" className="text-blue-500"/>
            </span>
            <p className="font-bold text-blue-500">
              اضف بيانات تعليم
            </p>
          </div>
      </form>
    </>
  );
};

export default StepTwo;
