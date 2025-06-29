import React from 'react'
type Props = {
  activeStep: number;
};

export default function CircularSteps({ activeStep }: Props) {
  const steps = [1, 2, 3, 4 , 5]; 

  return (
    <div className="flex justify-center flex-col m-16 " dir="rtl">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full my-4 ${
            step <= activeStep ? "bg-yellow-500" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}

