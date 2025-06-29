import React, { act, useState } from "react";
import CustomizedProgressBars from "../ProgressBar";
import CircularSteps from "../CircularSteps";
import MainForm from "./MainForm/MainForm";
import SimpleSlider from "./SliderImages";
import FormsHandle from "./FormsHandle";

export default function RegisterMentor() {
  let [active, setActive] = useState(1);
  let continueFunction = () => {
    if(active!=5){
      active++;
      setActive(active);
    }
  }
  let backFun= ()=>{
    if(active!=1){
      active--;
      setActive(active)
    }
  }
  return (
    <>
      <CustomizedProgressBars activeStep={active} />

      <div className="">
        <div className="flex w-full items-start" dir="rtl">
          <CircularSteps activeStep={active} />

          <div className="flex-1 p-4">
            <MainForm activeStep={active}/>
           <FormsHandle
           backFun={backFun}
           nextFun={continueFunction}
           />
          </div>

          <div className="w-[40%] min-w-[250px] max-w-[500px] p-2 my-4 text-center">
            <SimpleSlider />
          </div>
        </div>
      </div>
    </>
  );
}
