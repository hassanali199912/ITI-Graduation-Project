import React from 'react'
type Props = {
  activeStep: number;
};

export default function CircularSteps({ activeStep }: Props) {
<<<<<<< Updated upstream
  const steps = [1, 2, 3, 4]; 

=======
  const steps = [1, 2, 3, 4,5]; 
>>>>>>> Stashed changes
  return (
    <div className="flex  flex-col m-16 " dir="rtl">
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