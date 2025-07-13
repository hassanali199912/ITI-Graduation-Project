import React, { useState, useRef } from "react";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormData,
  type StepOneData,
  type StepTwoData,
  type StepThreeData,
  type StepFourData,
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
} from "./types";
import CustomizedProgressBars from "../ProgressBar";
import CircularSteps from "../CircularSteps";
import MainForm from "./MainForm/MainForm";
import SimpleSlider from "./SliderImages";
import FormsHandle from "./FormsHandle";
import { z } from "zod"; // Import z for schema combination

export default function RegisterMentor() {
  const [activeStep, setActiveStep] = useState(1);
  const formMethods: UseFormReturn<FormData> = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        stepOne: stepOneSchema,
        stepTwo: stepTwoSchema,
        stepThree: stepThreeSchema,
        stepFour: stepFourSchema,
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
        gender: 1,
        bio: "",
        lang: "",
        profilePictureUrl: "",
        countryId: "",
      },
      stepTwo: {
        educations: [
          {
            institution: "",
            degree: "",
            field: "",
            startDate: "",
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
            issuedDate: "",
            examResult: "",
          },
        ],
      },
      stepFour: {
        teachingAreaIds: [],
        ageGroupIds: [],
        communicationMethodIds: [],
        teachingLanguageIds: [],
        additionalInterests: [],
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formRefs = useRef<{ [key: number]: () => Promise<boolean> }>({});

  const handleNext = async () => {
    console.log("handleNext called for step:", activeStep);
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
          const firstName = formMethods.getValues("stepOne.firstName");
          const lastName = formMethods.getValues("stepOne.lastName");

          const finalData = {
            email: formMethods.getValues("stepOne.email"),
            password: formMethods.getValues("stepOne.password1"),
            firstName,
            lastName,
            phoneNumber: formMethods.getValues("stepOne.phoneNumber"),
            gender: formMethods.getValues("stepOne.gender"),
            bio: formMethods.getValues("stepOne.bio"),
            profilePictureUrl: formMethods.getValues("stepOne.profilePictureUrl")
              ? await uploadFile(formMethods.getValues("stepOne.profilePictureUrl"))
              : "",
            countryId: formMethods.getValues("stepOne.countryId"),
            educations: formMethods.getValues("stepTwo.educations"),
            certificates: await Promise.all(
              formMethods
                .getValues("stepThree.certificates")
                .map(async (cert) => ({
                  ...cert,
                  certificateUrl: cert.certificateUrl
                    ? await uploadFile(cert.certificateUrl)
                    : "",
                }))
            ),
            teachingAreaIds: formMethods.getValues("stepFour.teachingAreaIds"),
            ageGroupIds: formMethods.getValues("stepFour.ageGroupIds"),
            communicationMethodIds: formMethods.getValues(
              "stepFour.communicationMethodIds"
            ),
            teachingLanguageIds: formMethods.getValues("stepOne.lang")
              ? [formMethods.getValues("stepOne.lang")]
              : formMethods.getValues("stepFour.teachingLanguageIds"),
            additionalInterests: formMethods.getValues(
              "stepFour.additionalInterests"
            ),
          };
          console.log("Submitting to API:", JSON.stringify(finalData, null, 2));
          // await fetch('/api/submit', { method: 'POST', body: JSON.stringify(finalData) });
        } catch (error) {
          console.error("Submission error:", error);
        }
      } else {
        console.log("Validation failed, staying on step:", activeStep);
      }
    } else {
      console.log("No submit function registered for step:", activeStep);
      if (activeStep < 4) {
        setActiveStep((prev) => {
          const nextStep = prev + 1;
          console.log("Advancing to step:", nextStep);
          return nextStep;
        });
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => {
        const prevStep = prev - 1;
        console.log("Going back to step:", prevStep);
        return prevStep;
      });
    }
  };

  const updateFormData = (
    step: keyof FormData,
    data: Partial<FormData[keyof FormData]>
  ) => {
    console.log(
      "Updating formData for step:",
      step,
      "with data:",
      JSON.stringify(data, null, 2)
    );
    formMethods.setValue(step as any, {
      ...formMethods.getValues(step as any),
      ...data,
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    return `https://example.com/uploads/${file.name}`;
  };

  return (
    <>
      <CustomizedProgressBars activeStep={activeStep} />
      <div className="">
        <div className="flex w-full items-start" dir="rtl">
          <CircularSteps activeStep={activeStep} />
          <div className="flex-1 p-4">
            <FormProvider {...formMethods}>
              <MainForm
                activeStep={activeStep}
                formData={formMethods.getValues()}
                updateFormData={updateFormData}
                triggerSubmit={(step, submitFn) => {
                  console.log("Registering submit function for step:", step);
                  formRefs.current[step] = submitFn;
                }}
              />
            </FormProvider>
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