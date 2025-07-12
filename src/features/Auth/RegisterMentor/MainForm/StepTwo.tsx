import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { stepTwoSchema, type StepTwoData, type FormData } from '../types';
import FormInput from './components/FormInput';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  data: StepTwoData;
  updateData: (data: Partial<StepTwoData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

export default function StepTwo({ data, updateData, triggerSubmit }: Props) {
  const { control, handleSubmit, formState: { errors }, trigger, watch, setValue } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stepTwo.educations',
  });

  const formData = watch();
  React.useEffect(() => {
    console.log('StepTwo Form Data:', JSON.stringify(formData, null, 2));
    console.log('Fields length:', fields.length);
    console.log('Full Errors:', JSON.stringify(errors, null, 2));
    const currentEducations = watch('stepTwo.educations');
    if (data.educations && data.educations.length > 0 && JSON.stringify(currentEducations) !== JSON.stringify(data.educations)) {
      setValue('stepTwo.educations', data.educations);
    }
  }, [data.educations, setValue, watch]);

  const onSubmit = async (formData: FormData) => {
    console.log('StepTwo onSubmit - Form Data:', JSON.stringify(formData, null, 2));
    console.log('StepTwo Errors at Submit:', JSON.stringify(errors, null, 2));
    updateData(formData.stepTwo);
    return true;
  };

  React.useEffect(() => {
    triggerSubmit(async () => {
      // Trigger validation for all educations fields separately
      const validationPromises = fields.map((_, index) => [
        trigger(`stepTwo.educations[${index}].institution`),
        trigger(`stepTwo.educations[${index}].degree`),
        trigger(`stepTwo.educations[${index}].field`),
        trigger(`stepTwo.educations[${index}].startDate`),
        trigger(`stepTwo.educations[${index}].endDate`),
        trigger(`stepTwo.educations[${index}].description`),
      ].every(p => p === true)); // This is incorrect, see below fix

      const results = await Promise.all(validationPromises);
      const isValid = results.every(result => result === true);
      console.log('Validation Result for each field:', isValid);
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
                id={`stepTwo.educations[${index}].institution`}
                label="المؤسسة التعليمية"
                placeholder="أدخل اسم المؤسسة"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.institution`)}
              />
              {errors.stepTwo?.educations?.[index]?.institution?.message && <span className="error">{String(errors.stepTwo.educations[index].institution.message)}</span>}
              <FormInput
                id={`stepTwo.educations[${index}].degree`}
                label="الدرجة العلمية"
                placeholder="أدخل الدرجة العلمية"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.degree`)}
              />
              {errors.stepTwo?.educations?.[index]?.degree?.message && <span className="error">{String(errors.stepTwo.educations[index].degree.message)}</span>}
              <FormInput
                id={`stepTwo.educations[${index}].field`}
                label="التخصص"
                placeholder="أدخل التخصص"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.field`)}
              />
              {errors.stepTwo?.educations?.[index]?.field?.message && <span className="error">{String(errors.stepTwo.educations[index].field.message)}</span>}
              <FormInput
                id={`stepTwo.educations[${index}].startDate`}
                label="تاريخ البداية"
                type="date"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.startDate`)}
              />
              {errors.stepTwo?.educations?.[index]?.startDate?.message && <span className="error">{String(errors.stepTwo.educations[index].startDate.message)}</span>}
              <FormInput
                id={`stepTwo.educations[${index}].endDate`}
                label="تاريخ النهاية"
                type="date"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.endDate`)}
              />
              {errors.stepTwo?.educations?.[index]?.endDate?.message && <span className="error">{String(errors.stepTwo.educations[index].endDate.message)}</span>}
              <FormInput
                id={`stepTwo.educations[${index}].description`}
                label="الوصف"
                placeholder="أدخل وصفًا (اختياري)"
                register={control.register}
                onChange={() => trigger(`stepTwo.educations.${index}.description`)}
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