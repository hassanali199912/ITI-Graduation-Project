import React, { useState } from "react";
import SelectInput from "./components/SelectInput";

export default function StepThree() {
  const fields = ["برمجة", "تصميم", "تسويق", "إدارة مشاريع"];
  const [field, setField] = useState("(مثلاً: برمجة، تصميم...)");
  let yearCategories = ["المهارات"];
  const [yearCat, setYearCat] = useState("");
  let connects = ["دردشة", "مكالمة", "جلسة فيديو"];
  const [connect, setConnect] = useState("");
  const timeNumbers = ["5 ساعات", "6:8 ساعات"];
  const [timeNum, setTimeNum] = useState("");
  const languages = ["English", "Arabic"];
  const [lang, setLang] = useState("");
  return (
    <>
      <div className="my-8">
        <p className="text-3xl font-bold">الإهتمامات والتفضيلات</p>
      </div>
      <form action="">
        <SelectInput
          id="fields"
          label="ما هي المجالات التي تفضل الإرشاد فيها؟"
          value={field}
          onChange={(e) => setField(e.target.value)}
          options={fields}
        />
        <SelectInput
          id="yrs-categories"
          label="ما الفئة العمرية التي تفضل التعامل معها؟"
          value={yearCat}
          onChange={(e) => setYearCat(e.target.value)}
          options={yearCategories}
        />
        <SelectInput
          id="connects"
          label="كيف تفضل التواصل مع المتعلمين؟"
          value={connect}
          onChange={(e) => setConnect(e.target.value)}
          options={connects}
        />
        <SelectInput
          id="time"
          label="كم ساعة يمكنك تخصيصها أسبوعيًا للإرشاد؟"
          value={timeNum}
          onChange={(e) => setTimeNum(e.target.value)}
          options={timeNumbers}
        />
        <SelectInput
          id="lang"
          label="اختر اللغات التي يمكنك الإرشاد بها"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          options={languages}
        />
      </form>
    </>
  );
}
