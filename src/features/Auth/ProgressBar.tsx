import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Logo from '../Auth/Logo';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height:12,
  borderRadius: 5,
  transform: 'scaleX(-1)',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F2F4F8',
    // ...theme.applyStyles('dark', {
    //   backgroundColor: theme.palette.grey[800],
    // }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#DBA507',
    ...theme.applyStyles('dark', {
      backgroundColor: '#F2F4F8',
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