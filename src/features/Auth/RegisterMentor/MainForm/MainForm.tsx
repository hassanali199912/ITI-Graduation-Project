import React from 'react'
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

type Props = {
  activeStep: number;
};
export default function MainForm({activeStep}:Props) {
  return (
    <>
    {activeStep==1 && <StepOne/>}
    {activeStep==2 && <StepTwo/>}
    {activeStep==3 && <StepThree/>}
    {activeStep==4 && <StepFour/>}
    </>
  )
}
