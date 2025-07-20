import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2EducationInfo from "./Step2EducationInfo";
import Step3Skills from "./Step3Skills";
import Step4Intro from "./Step4Intro";
import ProgressBar from "../ProgressBar";
import StepSidebar from "./StepSidebar";
import CircularSteps from '../CircularSteps';
import { validateStep } from "./stepValidation";
import type RegisterFormData  from "../../../domain/types/RegisterFormData";
import { useGetLookupByTypeQuery } from "../../../redux/api/lookupApi";

const MySwal = withReactContent(Swal);

const RegisterLearner = () => {
  const [step, setStep] = useState(1);

  const { data: countriesResponse } = useGetLookupByTypeQuery("country");
  const countries = countriesResponse?.value ?? [];

  const { data: graduationStatusesResponse } = useGetLookupByTypeQuery("graduationStatus");
  const graduationStatuses = graduationStatusesResponse?.value ?? [];

  const { data: specialistsResponse } = useGetLookupByTypeQuery("specialization");
  const specialists = specialistsResponse?.value ?? [];

  const { data: skillsResponse } = useGetLookupByTypeQuery("skilles");
  const skills = skillsResponse?.value ?? [];

  const { data: genderData } = useGetLookupByTypeQuery("gender");
  const genders = genderData?.value ?? [];


  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: null,
    residenceCountryId: "",
    profilePictureUrl: "",
    bio: "",
    github: "",
    connectProgramming:  null,
    levelId: "",
    graduationStatusId: "",
    specialistId: "",
    experiences: [],
    skills: [],
    learningInterests: [],
  });

  const nextStep = () => {
    const error = validateStep(step, formData, genders);
    console.log("validation error:", error);
    if (error) {
      MySwal.fire({
        title: 'تنبيه',
        text: error,
        icon: 'warning',
        confirmButtonText: 'حسنًا',
        confirmButtonColor: '#0003C7',
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className=" min-h-screen" dir='rtl'>
      
      <ProgressBar activeStep={step} totalSteps={4} />
      
      <div className=" mx-auto flex bg-white overflow-hidden ">
        <CircularSteps  activeStep={step}/>
        <div className="flex-1 p-8" >
          {step === 1 && (
            <Step1PersonalInfo
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              genders={genders}
            />
          )}
          {step === 2 && (
            <Step2EducationInfo
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <Step3Skills
              data={formData}
              setData={setFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <Step4Intro
              data={formData}
              setData={setFormData}
              onBack={prevStep}
            />
          )}
        </div>
        <StepSidebar data={formData} 
           countries={countries} 
           specialists={specialists}
           graduationStatuses={graduationStatuses} 
           skills={skills}
           genders={genders}/>
      </div>
    </div>
  );
};

export default RegisterLearner;