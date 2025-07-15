import React, { useState, useRef } from 'react';
import CustomizedProgressBars from '../ProgressBar';
import CircularSteps from '../CircularSteps';
import MainForm from './MainForm/MainForm';
import SimpleSlider from './SliderImages';
import FormsHandle from './FormsHandle';
import type{ FormData, StepOneData, StepTwoData, StepThreeData, StepFourData, StepFiveData } from './types';

export default function RegisterMentor() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stepOne: {
      avatar: undefined,
      name: '',
      email: '',
      password1: '',
      password2: '',
      type: '' as any,
      country: '',
      lang: '',
    },
    stepTwo: { education: [{ qualification: '', org: '', spec: '', startMonth: '', startYear: '', endMonth: '', endYear: '' }] },
    stepThree: { certificates: [{ skill: '', certificate: '', file: undefined, organisation: '', certificateDate: '' }] },
    stepFour: { interests: [{ field: '', yearCategory: '', connect: '', timeNum: '', lang: '' }] },
    stepFive: { hasExams: '' as any, exams: [{ examName: '', rate: '', givingOrg: '', examCertificates: '', certificateFile: undefined, examMonth: '', examYear: '' }] },
  });

  const formRefs = useRef<{ [key: number]: () => Promise<boolean> }>({});

  const handleNext = async () => {
    console.log('handleNext called for step:', activeStep);
    if (formRefs.current[activeStep]) {
      const isValid = await formRefs.current[activeStep]();
      console.log('Step valid:', isValid, 'Current formData:', JSON.stringify(formData, null, 2));
      if (isValid && activeStep < 5) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log('Advancing to step:', nextStep);
          return nextStep;
        });
      } else if (isValid && activeStep === 5) {
        console.log('Final Form Data:', JSON.stringify(formData, null, 2));
        // Submit to API
        // await fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
      } else {
        console.log('Validation failed, staying on step:', activeStep);
      }
    } else {
      console.log('No submit function registered for step:', activeStep);
      if (activeStep < 5) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log('Advancing to step:', nextStep);
          return nextStep;
        });
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => {
        const prevStep = prev - 1;
        console.log('Going back to step:', prevStep);
        return prevStep;
      });
    }
  };

  const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    console.log('Updating formData for step:', step, 'with data:', JSON.stringify(data, null, 2));
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  return (
    <>
      <CustomizedProgressBars activeStep={activeStep} />
      <div className="">
        <div className="flex w-full items-start" dir="rtl">
          <CircularSteps activeStep={activeStep} />
          <div className="flex-1 p-4">
            <MainForm
              activeStep={activeStep}
              formData={formData}
              updateFormData={updateFormData}
              triggerSubmit={(step, submitFn) => {
                console.log('Registering submit function for step:', step);
                formRefs.current[step] = submitFn;
              }}
            />
            <FormsHandle
              backFun={handleBack}
              nextFun={handleNext}
              isLastStep={activeStep === 5}
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