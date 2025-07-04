import { useState } from "react";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2EducationInfo from "./Step2EducationInfo";
import Step3Skills from "./Step3Skills";
import Step4Intro from "./Step4Intro";
import ProgressBar from "../ProgressBar";
import StepSidebar from "./StepSidebar";
import CircularSteps from '../CircularSteps';

const RegisterLearner = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "",
    country: "",
    nationality: "",
    specialization: "",
    educationLevel: "",
    track: "",
    tools: [],
    about: "",
    github: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className=" min-h-screen" dir='rtl'>
      
      <ProgressBar activeStep={step} />
      
      
      <div className=" mx-auto flex bg-white overflow-hidden ">
        <CircularSteps  activeStep={step}/>
        <div className="flex-1 p-8" >
          {step === 1 && (
            <Step1PersonalInfo
              data={formData}
              setData={setFormData}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <Step2EducationInfo
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <Step3Skills
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <Step4Intro
              data={formData}
              setData={setFormData}
              onBack={prevStep}
            />
          )}
        </div>
        <StepSidebar data={formData} />
      </div>
    </div>
  );
};

export default RegisterLearner;