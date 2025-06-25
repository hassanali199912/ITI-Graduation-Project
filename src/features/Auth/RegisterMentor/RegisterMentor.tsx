import React from 'react'
import CustomizedProgressBars from './ProgressBar'
import CircularSteps from './CircularSteps'
export default function RegisterMentor() {
  return (
    <>
    {/* <div>RegisterMentor</div> */}
    
    <CustomizedProgressBars activeStep={3}/>
    <CircularSteps  activeStep={1}></CircularSteps>
    </>
  )
}
