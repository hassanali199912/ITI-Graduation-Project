import React, { act, useState } from "react";
import CustomizedProgressBars from "../ProgressBar";
import CircularSteps from "../CircularSteps";
import MainForm from "./MainForm/MainForm";
import SimpleSlider from "./SliderImages";

export default function RegisterMentor() {
  let [active, setActive] = useState(1);
  let continueFunction = () => {
    if(active!=4){
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
            <div className="flex items-center justify-between">
              <button onClick={()=>{backFun()}} className="text-blue-700 flex items-center py-1 px-4 gap-2 cursor-pointer">
                <span>
                  <img src="/arrow-right.png" alt="" />
                </span>
                رجوع
              </button>
              <button onClick={()=>{continueFunction()}} className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center gap-4 cursor-pointer">
                استمرار
                <span>
                  <img src="/arrow-left.png" alt="" />
                </span>
              </button>
              
            </div>
          </div>

          <div className="w-[40%] min-w-[250px] max-w-[500px] p-2 my-4 text-center">
            <SimpleSlider />
          </div>
        </div>
      </div>
    </>
  );
}
