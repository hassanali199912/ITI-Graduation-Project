import React from "react";
import CustomizedProgressBars from "./ProgressBar";
import CircularSteps from "./CircularSteps";
import MainForm from "./MainForm/MainForm";
export default function RegisterMentor() {
  return (
    <>
      {/* <div>RegisterMentor</div> */}
      <CustomizedProgressBars activeStep={3} />
      <div className="flex items-start gap-4 p-4" dir="rtl">
        <CircularSteps activeStep={1} />
        <MainForm />
      </div>
    </>
  );
}
