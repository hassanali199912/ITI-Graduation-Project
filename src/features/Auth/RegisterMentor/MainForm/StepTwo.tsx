import React, { useEffect } from 'react';
import { useFieldArray, useFormContext, useForm } from 'react-hook-form';
import FormInput from './components/FormInput';
import AddIcon from '@mui/icons-material/Add';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema, type StepTwoData } from '../types';

interface Props {
  data: StepTwoData;
  updateData: (data: Partial<StepTwoData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

export default function StepTwo({ data, updateData, triggerSubmit }: Props) {
  //  const { control, handleSubmit, formState: { errors }, trigger, watch, setValue } = useFormContext<FormData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'educations',
  });

  useEffect(() => {
    // if (data.educations && data.educations.length > 0) {
    //   setValue('educations', data.educations);
    // }

    if (data.educations && data.educations.length === 0) {
      append({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })
    }
  }, [])



  const formData = watch();
  React.useEffect(() => {
    const currentEducations = watch('educations');
    if (data.educations && data.educations.length > 0 && JSON.stringify(currentEducations) !== JSON.stringify(data.educations)) {
      setValue('educations', data.educations);
    }
  }, [data.educations, setValue, watch]);

  const onSubmit = async (formData: StepTwoData) => {
    console.log('StepTwo onSubmit - Form Data:', JSON.stringify(formData, null, 2));
    console.log('StepTwo Errors at Submit:', JSON.stringify(errors, null, 2));
    updateData(formData);
    return true;
  };


  React.useEffect(() => {
    triggerSubmit(async () => {
      // Trigger validation for all educations fields separately
      const validationPromises = fields.map((_, index) => [
        trigger(`educations`)
      ].every(p => p));

      const results = await Promise.all(validationPromises);
      const isValid = results.every(result => result === true);

      if (isValid) {
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }

      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, fields]);

  return (
    <div className="step-two mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">التعليم</p>
      </div>
      <form className="my-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="education-fields">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-8 border-b pb-4">
              <FormInput
                id={`educations[${index}].institution`}
                label="المؤسسة التعليمية"
                placeholder="أدخل اسم المؤسسة"
                register={register}
                onChange={() => trigger(`educations.${index}.institution`)}
              />
              {errors?.educations?.[index]?.institution?.message && <span className="error">{String(errors.educations[index].institution.message)}</span>}
              <FormInput
                id={`educations[${index}].degree`}
                label="الدرجة العلمية"
                placeholder="أدخل الدرجة العلمية"
                register={register}
                onChange={() => trigger(`educations.${index}.degree`)}
              />
              {errors?.educations?.[index]?.degree?.message && <span className="error">{String(errors.educations[index].degree.message)}</span>}
              <FormInput
                id={`educations[${index}].field`}
                label="التخصص"
                placeholder="أدخل التخصص"
                register={register}
                onChange={() => trigger(`educations.${index}.field`)}
              />
              {errors?.educations?.[index]?.field?.message && <span className="error">{String(errors.educations[index].field.message)}</span>}
              <FormInput
                id={`educations[${index}].startDate`}
                label="تاريخ البداية"
                type="date"
                register={register}
                onChange={() => trigger(`educations.${index}.startDate`)}
              />
              {errors?.educations?.[index]?.startDate?.message && <span className="error">{String(errors.educations[index].startDate.message)}</span>}
              <FormInput
                id={`educations[${index}].endDate`}
                label="تاريخ النهاية"
                type="date"
                register={register}
                onChange={() => trigger(`educations.${index}.endDate`)}
              />
              {errors?.educations?.[index]?.endDate?.message && <span className="error">{String(errors.educations[index].endDate.message)}</span>}
              <FormInput
                id={`educations[${index}].description`}
                label="الوصف"
                placeholder="أدخل وصفًا (اختياري)"
                register={register}
                onChange={() => trigger(`educations.${index}.description`)}
              />
              {fields.length > 1 && <button type="button" className="text-red-500 mt-2" onClick={() => remove(index)}>إزالة</button>}
            </div>
          ))}
        </div>
        <div className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer" onClick={() => append({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })}>
          <span className="p-1 inline-flex items-center justify-center text-white"><AddIcon fontSize="small" className="text-blue-500" /></span>
          <p className="font-bold text-blue-500">إضافة تعليم آخر</p>
        </div>
      </form>
    </div>
  );
}