import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Logo from './Logo';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height:12,
  borderRadius: 5,
  transform: 'scaleX(-1)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F2F4F8',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#dba507',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

interface Props {
  activeStep: number;
}


export default function CustomizedProgressBars({activeStep}: Props) {
  let totalSteps:number = 5;
  const progressValue = ( activeStep / totalSteps) * 100;
  return (
    <>
    <div dir='rtl'>
      <Logo/>
      <BorderLinearProgress  variant="determinate" value={progressValue} />
    </div>
    </>
  );
}
