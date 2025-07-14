import { useState, useRef } from "react";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormData,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  stepFiveSchema,
} from "./types";
import CustomizedProgressBars from "../ProgressBar";
import CircularSteps from "../CircularSteps";
import MainForm from "./MainForm/MainForm";
import SimpleSlider from "./SliderImages";
import FormsHandle from "./FormsHandle";
import { z } from "zod";
import { useRegesterMentorMutation } from "../api/regester";
import BlurLoader from "../../../shared/components/loaders/Blurloader";
import { toast } from "react-toastify";

export default function RegisterMentor() {
  const [activeStep, setActiveStep] = useState(1);
  const [regesterMentor, { isLoading }] = useRegesterMentorMutation();
  const formMethods: UseFormReturn<FormData> = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        stepOne: stepOneSchema,
        stepTwo: stepTwoSchema,
        stepThree: stepThreeSchema,
        stepFour: stepFourSchema,
        stepFive: stepFiveSchema,
      })
    ),
    defaultValues: {
      stepOne: {
        firstName: "",
        lastName: "",
        email: "",
        password1: "",
        password2: "",
        phoneNumber: "",
        gender: 0,
        bio: "",
        lang: "", // ID of teaching language
        profilePictureUrl: "",
        countryId: "", // ID of country
      },
      stepTwo: {
        educations: [
          {
            institution: "",
            degree: "",
            field: "",
            startDate: "", // or new Date().toISOString().split("T")[0] if needed
            endDate: "",
            description: "",
          },
        ],
      },
      stepThree: {
        certificates: [
          {
            name: "",
            certificateUrl: "",
            issuedBy: "",
            issuedDate: "", // e.g. "2025-07-01"
            examResult: "",
          },
        ],
      },
      stepFour: {
        teachingAreaIds: [],
        ageGroupIds: [],
        communicationMethodIds: [],
        teachingLanguageIds: [],
        additionalInterests: [{ value: "jdkhdfshksdf " }],
      },
      stepFive: {
        exams: [
          {
            examName: "",
            rate: "",
            givingOrg: "",
            examCertificates: "",
            certificateFile: "",
            examMonth: "",
            examYear: "",
          },
        ],
      }
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });



  const formRefs = useRef<{ [key: number]: () => Promise<boolean> }>({});

  const handleSubmit = async (data: FormData) => {
    const finalData = {
      email: data.stepOne.email,
      password: data.stepOne.password1,
      firstName: data.stepOne.firstName,
      lastName: data.stepOne.lastName,
      phoneNumber: data.stepOne.phoneNumber,
      gender: data.stepOne.gender,
      bio: data.stepOne.bio,
      profilePictureUrl: typeof data.stepOne.profilePictureUrl === "string"
        ? data.stepOne.profilePictureUrl
        : "",
      countryId: data.stepOne.countryId,
      educations: data.stepTwo.educations,
      certificates: data.stepThree.certificates.map(cert => ({
        ...cert,
        certificateUrl: typeof cert.certificateUrl === "string" ? cert.certificateUrl : ""
      })),
      teachingAreaIds: data.stepFour.teachingAreaIds,
      ageGroupIds: data.stepFour.ageGroupIds,
      communicationMethodIds: data.stepFour.communicationMethodIds,
      teachingLanguageIds: data.stepFour.teachingLanguageIds,
      additionalInterests: data?.stepFour?.additionalInterests?.map(item => item.value),
      // exams: data?.stepFive?.exams?.map(exam => ({
      //   ...exam,
      //   certificateFile: typeof exam.certificateFile === "string" ? exam.certificateFile : ""
      // })),
      skills: [
        { "skillId": "3a58e810-53bd-4fe6-9bf7-08ddc25fa0b3" },  // HTML
        { "skillId": "dc469252-469c-4d08-9bf8-08ddc25fa0b3" },  // CSS
        { "skillId": "06aba2a1-bfea-432f-9bf9-08ddc25fa0b3" },  // JavaScript
        { "skillId": "4eba2156-8f55-4bc2-9bfb-08ddc25fa0b3" },  // React
        { "skillId": "b80b2614-55cb-4f8b-9bfe-08ddc25fa0b3" },  // Node.js
        { "skillId": "497a8831-93ac-463f-9c03-08ddc25fa0b3" }   // MongoDB
      ],
    };

    console.log("Submitting to API:", JSON.stringify(finalData, null, 2));

    try {
      const res = await regesterMentor(finalData);
      console.log("API response:", res);
      if (res && res?.data && res?.data?.statusCode === 201) {
        toast.success("تم انشاء المستخدم بنجاح ")
      } else {

        toast.error(res?.error?.data || "حدث خطا , برجاء المحاولة لاحقا")
      }


    } catch (error) {
      console.error("API Error:", error);
    }
  };


  const handleNext = async () => {
    console.log("Validation failed, staying on step:", formMethods?.formState.defaultValues);
    if (formRefs.current[activeStep]) {
      const isValid = await formRefs.current[activeStep]();


      if (isValid && activeStep < 5) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log("Advancing to step:", nextStep);
          return nextStep;
        });
      } else if (isValid && activeStep === 5) {
        try {
          handleSubmit(formMethods.getValues());

        } catch (error) {
          console.error("Submission error:", error);
        }
      } else {
        console.log("Validation failed, staying on step:", activeStep);
        console.log("Validation failed, staying on step:", formMethods?.formState);
      }
    } else {
      console.log("No submit function registered for step:", activeStep);
      if (activeStep < 5) {
        if (activeStep < 5) {
          setActiveStep((prev) => {
            const nextStep = prev + 1;
            return nextStep;
          });
        }
      }
    };
  }
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => {
        const prevStep = prev - 1;
        return prevStep;
      });
    }
  };

  const updateFormData = (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>
  ) => {

    formMethods.setValue(step as any, {
      ...formMethods.getValues(step as any),
      ...data,
    });
  };





  return (
    <>
      {isLoading && <BlurLoader />}
      <CustomizedProgressBars activeStep={activeStep} totalSteps={6} />
      <div>
        <div className="flex w-full items-start" dir="rtl">
          <CircularSteps activeStep={activeStep} /> {/* Updated to 5 steps */}
          <div className="flex-1 p-4">
            <FormProvider {...formMethods}>
              <MainForm
                activeStep={activeStep}
                formData={formMethods.getValues()}
                updateFormData={updateFormData}
                triggerSubmit={(step, submitFn) => {
                  formRefs.current[step] = submitFn;
                }}
              />
            </FormProvider>
            <FormsHandle
              backFun={handleBack}
              nextFun={handleNext}
              isLastStep={activeStep === 5}
            />
          </div>
          <div className="w-[40%] min-w-[250px] max-w-[500px] p-2 my-4 text-center">
            <SimpleSlider />
          </div>
        </div>
      </div>
    </>
  )
}