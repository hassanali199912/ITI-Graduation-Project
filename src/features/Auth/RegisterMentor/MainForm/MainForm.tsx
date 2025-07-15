import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';
import { type FormData } from '../types';

interface Props {
  activeStep: number;
  formData: FormData;
  updateFormData: (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  triggerSubmit: (step: number, submitFn: () => Promise<boolean>) => void;
}

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
      {activeStep === 4 && (
        <StepFour
          data={formData.stepFour}
          updateData={(data) => updateFormData('stepFour', data)}
          triggerSubmit={(submitFn) => triggerSubmit(4, submitFn)}
        />
      )}
      {activeStep === 5 && (
        <StepFive
          data={formData.stepFive}
          updateData={(data) => updateFormData('stepFive', data)}
          triggerSubmit={(submitFn) => triggerSubmit(5, submitFn)}
        />
      )}
    </>
  );
}