import React, { useState, useRef } from 'react';
import CustomizedProgressBars from '../ProgressBar';
import CircularSteps from '../CircularSteps';
import MainForm from './MainForm/MainForm';
import SimpleSlider from './SliderImages';
import FormsHandle from './FormsHandle';
import type{ FormData, StepOneData, StepTwoData, StepThreeData, StepFourData } from './types';

export default function RegisterMentor() {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    stepOne: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      phoneNumber: '',
      gender: 0,
      bio: '',
      lang: '',
      profilePictureUrl: undefined,
      countryId: '',
    },
    stepTwo: { educations: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }] },
    stepThree: { certificates: [{ name: '', certificateUrl: undefined, issuedBy: '', issuedDate: '', examResult: '' }] },
    stepFour: { teachingAreaIds: [], ageGroupIds: [], communicationMethodIds: [], teachingLanguageIds: [], additionalInterests: [] },
  });

  const formRefs = useRef<{ [key: number]: () => Promise<boolean> }>({});

  const handleNext = async () => {
    console.log('handleNext called for step:', activeStep);
    if (formRefs.current[activeStep]) {
      const isValid = await formRefs.current[activeStep]();
      console.log('Step valid:', isValid, 'Current formData:', JSON.stringify(formData, null, 2));
      if (isValid && activeStep < 4) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log('Advancing to step:', nextStep);
          return nextStep;
        });
      } else if (isValid && activeStep === 4) {
        console.log('Final Form Data:', JSON.stringify(formData, null, 2));
        try {
          const firstName = formData.stepOne.firstName;
          const lastName = formData.stepOne.lastName;

          const finalData = {
            email: formData.stepOne.email,
            password: formData.stepOne.password1,
            firstName,
            lastName,
            phoneNumber: formData.stepOne.phoneNumber,
            gender: formData.stepOne.gender,
            bio: formData.stepOne.bio,
            profilePictureUrl: formData.stepOne.profilePictureUrl ? await uploadFile(formData.stepOne.profilePictureUrl) : '',
            countryId: formData.stepOne.countryId,
            educations: formData.stepTwo.educations,
            certificates: await Promise.all(
              formData.stepThree.certificates.map(async (cert) => ({
                ...cert,
                certificateUrl: cert.certificateUrl ? await uploadFile(cert.certificateUrl) : '',
              }))
            ),
            teachingAreaIds: formData.stepFour.teachingAreaIds,
            ageGroupIds: formData.stepFour.ageGroupIds,
            communicationMethodIds: formData.stepFour.communicationMethodIds,
            teachingLanguageIds: formData.stepOne.lang ? [formData.stepOne.lang] : formData.stepFour.teachingLanguageIds,
            additionalInterests: formData.stepFour.additionalInterests,
          };
          console.log('Submitting to API:', JSON.stringify(finalData, null, 2));
          // await fetch('/api/submit', { method: 'POST', body: JSON.stringify(finalData) });
        } catch (error) {
          console.error('Submission error:', error);
        }
      } else {
        console.log('Validation failed, staying on step:', activeStep);
      }
    } else {
      console.log('No submit function registered for step:', activeStep);
      if (activeStep < 4) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log('Advancing to step:', nextStep);
          return nextStep;
        });
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => {
        const prevStep = prev - 1;
        console.log('Going back to step:', prevStep);
        return prevStep;
      });
    }
  };

  const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    console.log('Updating formData for step:', step, 'with data:', JSON.stringify(data, null, 2));
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  // Mock file upload function
  const uploadFile = async (file: File): Promise<string> => {
    return `https://example.com/uploads/${file.name}`;
  };

  return (
    <>
      <CustomizedProgressBars activeStep={activeStep}  />
      <div className="">
        <div className="flex w-full items-start" dir="rtl">
          <CircularSteps activeStep={activeStep}  />
          <div className="flex-1 p-4">
            <MainForm
              activeStep={activeStep}
              formData={formData}
              updateFormData={updateFormData}
              triggerSubmit={(step, submitFn) => {
                console.log('Registering submit function for step:', step);
                formRefs.current[step] = submitFn;
              }}
            />
            <FormsHandle
              backFun={handleBack}
              nextFun={handleNext}
              isLastStep={activeStep === 4}
            />
          </div>
          <div className="w-[40%] min-w-[250px] max-w-[500px] p-2 my-4 text-center">
            <SimpleSlider />
          </div>
        </div>
      </div>
    </>
  );
}