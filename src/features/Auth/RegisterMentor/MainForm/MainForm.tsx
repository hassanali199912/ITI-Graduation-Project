import React from 'react'
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

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
    {activeStep==5 && <StepFive/>}
    </>
  )
}
