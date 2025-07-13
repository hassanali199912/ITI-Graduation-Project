import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepFourSchema, type StepFourData } from "../types";
import FormInput from "./components/FormInput";
import SelectInput from "./components/SelectInput";
import AddIcon from "@mui/icons-material/Add";
import { useLazyGetCommunicationMethodQuery, useLazyGetSpecializationQuery, useLazyGetTeachingAgeAreaQuery, useLazyGetTeachingLangQuery } from "../../api/lookups";

interface Props {
  data: StepFourData;
  updateData: (data: Partial<StepFourData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

interface LookupItem {
  id: string;
  name: string;
}

export default function StepFour({ data, updateData, triggerSubmit }: Props) {
  const [teachingAreas, setTeachingAreas] = useState<LookupItem[]>([]);
  const [ageGroups, setAgeGroups] = useState<LookupItem[]>([]);
  const [teachingLanguages, setTeachingLanguages] = useState<LookupItem[]>([]);
    const [triggerSpec , {data : specializations}] = useLazyGetSpecializationQuery();
  const[triggerTeachingAges , {data : teachingAges}] = useLazyGetTeachingAgeAreaQuery();
  const [triggerMethods , {data : communicationMethods}] = useLazyGetCommunicationMethodQuery();
  const[triggerLanguages , {data : teachingLangs}] = useLazyGetTeachingLangQuery();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<StepFourData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      ...data,
      additionalInterests: data.additionalInterests || [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInterests",
  });

  useEffect(() => {
      // console.log(useLazyGetSpecializationQuery)

    // const fetchLookups = async () => {
    //   try {
    //     const response = await fetch("/api/lookups");
    //     const data = await response.json();
    //     setTeachingAreas(data.teachingAreas || []);
    //     setAgeGroups(data.ageGroups || []);
    //     setCommunicationMethods(data.communicationMethods || []);
    //     setTeachingLanguages(data.teachingLanguages || []);
    //   } catch (error) {
    //     console.error("Error fetching lookups:", error);
    //   }
    // };
    // fetchLookups();

    triggerSpec();
    triggerMethods();
    triggerTeachingAges();
    triggerLanguages()
  }, [triggerSpec, triggerMethods , triggerTeachingAges , triggerLanguages]);

  const formData = watch();
  useEffect(() => {
    console.log("StepFour Errors:", JSON.stringify(errors, null, 2));
    console.log("StepFour Form Data:", JSON.stringify(formData, null, 2));
  }, [errors, formData]);

  const onSubmit = async (formData: StepFourData) => {
    console.log("StepFour onSubmit:", JSON.stringify(formData, null, 2));
    updateData(formData);
    return true;
  };

  useEffect(() => {
    triggerSubmit(async () => {
      const isValid = await trigger();
      if (isValid)
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit]);

  return (
    <div className="step-four mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">الإهتمامات والتفضيلات</p>
      </div>
      <form className="my-16">
        <SelectInput
          id="teachingAreaIds"
          label="ما هي المجالات التي تفضل الإرشاد فيها؟"
          options={(specializations?.value ?? []).map((t:LookupItem) => ({ id: t.id, name: t.name }))}
          multiple
          register={register}
        />
        {errors.teachingAreaIds?.message && (
          <span className="error">
            {String(errors.teachingAreaIds.message)}
          </span>
        )}
        <SelectInput
          id="ageGroupIds"
          label="ما الفئة العمرية التي تفضل التعامل معها؟"
          options={(teachingAges?.value ?? []).map((a:LookupItem) => ({ id: a.id, name: a.name }))}
          multiple
          register={register}
        />
        {errors.ageGroupIds?.message && (
          <span className="error">{String(errors.ageGroupIds.message)}</span>
        )}
        <SelectInput
          id="communicationMethodIds"
          label="كيف تفضل التواصل مع المتعلمين؟"
          options={(communicationMethods?.value ?? []).map((c:LookupItem) => ({
            id: c.id,
            name: c.name,
          }))}
          multiple
          register={register}
        />
        {errors.communicationMethodIds?.message && (
          <span className="error">
            {String(errors.communicationMethodIds.message)}
          </span>
        )}
        <SelectInput
          id="teachingLanguageIds"
          label="اختر اللغات التي يمكنك الإرشاد بها"
          options={(teachingLangs?.value ?? []).map((l:LookupItem) => ({ id: l.id, name: l.name }))}
          multiple
          register={register}
        />
        {errors.teachingLanguageIds?.message && (
          <span className="error">
            {String(errors.teachingLanguageIds.message)}
          </span>
        )}
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4">
            <FormInput
              id={`additionalInterests[${index}]`}
              label="اهتمام إضافي"
              placeholder="أدخل اهتمامًا إضافيًا"
              register={register}
            />
            {errors.additionalInterests?.[index] && (
              <span className="error">
                {String(errors.additionalInterests[index])}
              </span>
            )}
            {fields.length > 1 && (
              <button
                type="button"
                className="text-red-500 mt-2"
                onClick={() => remove(index)}
              >
                إزالة
              </button>
            )}
          </div>
        ))}
        <div
          className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer"
          onClick={() => append({ value: "" })}
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">إضافة اهتمام آخر</p>
        </div>
      </form>
    </div>
  );
}
