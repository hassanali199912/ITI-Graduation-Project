import React from 'react'
import StepOne from './StepOne';
import StepTwo from './StepTwo';

type Props = {
  activeStep: number;
};
export default function MainForm({activeStep}:Props) {
  return (
    <>
    {activeStep==1 && <StepOne/>}
    {activeStep==2 && <StepTwo/>}
    </>
  )
}
