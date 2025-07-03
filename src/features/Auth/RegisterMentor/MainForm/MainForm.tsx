import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { type FormData } from '../types';

type Props = {
  activeStep: number;
  formData: FormData;
  updateFormData: (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  triggerSubmit: (step: number, submitFn: () => Promise<boolean>) => void;
};

export default function MainForm({ activeStep, formData, updateFormData, triggerSubmit }: Props) {
  console.log('Rendering MainForm with activeStep:', activeStep);
  return (
    <>
      {activeStep === 1 && (
        <StepOne
          data={formData.stepOne}
          updateData={(data) => updateFormData('stepOne', data)}
          triggerSubmit={(submitFn) => triggerSubmit(1, submitFn)}
        />
      )}
      {activeStep === 2 && (
        <StepTwo
          data={formData.stepTwo}
          updateData={(data) => updateFormData('stepTwo', data)}
          triggerSubmit={(submitFn) => triggerSubmit(2, submitFn)}
        />
      )}
      {activeStep === 3 && (
        <StepThree
          data={formData.stepThree}
          updateData={(data) => updateFormData('stepThree', data)}
          triggerSubmit={(submitFn) => triggerSubmit(3, submitFn)}
        />
      )}
      
    </>
  );
}