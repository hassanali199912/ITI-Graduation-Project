import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepFourSchema, type StepFourData } from '../types';
import AddIcon from '@mui/icons-material/Add';
import SelectInput from './components/SelectInput';

interface Props {
  data: StepFourData;
  updateData: (data: Partial<StepFourData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

export default function StepFour({ data, updateData, triggerSubmit }: Props) {
  const fieldsOptions = ['برمجة', 'تصميم', 'تسويق', 'إدارة مشاريع'];
  const yearCategories = ['18-25', '26-35', '36-50', '50+'];
  const connects = ['دردشة', 'مكالمة', 'جلسة فيديو'];
  const timeNumbers = ['5 ساعات', '6-8 ساعات', '9-12 ساعة', '12+ ساعة'];
  const languages = ['English', 'Arabic'];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<StepFourData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interests',
  });

  // Log errors and form data for debugging
  const formData = watch();
  React.useEffect(() => {
    // console.log('StepFour Errors:', JSON.stringify(errors, null, 2));
    console.log('StepFour Form Data:', JSON.stringify(formData, null, 2));
  }, [errors, formData]);

  // Handle form submission
  const onSubmit = async (formData: StepFourData) => {
    console.log('StepFour onSubmit:', JSON.stringify(formData, null, 2));
    updateData(formData);
    return true;
  };

  // Register validation and submission function
  React.useEffect(() => {
    console.log('Registering triggerSubmit for StepFour');
    triggerSubmit(async () => {
      console.log('Validating StepFour...');
      const isValid = await trigger();
      console.log('StepFour isValid:', isValid);
      if (!isValid) {
        console.log('StepFour Validation Errors:', JSON.stringify(errors, null, 2));
      }
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  return (
    <div className="step-four mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">الإهتمامات والتفضيلات</p>
      </div>
      <form className="my-16">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 border-b pb-4">
            <SelectInput
              id={`interests[${index}].field`}
              label="ما هي المجالات التي تفضل الإرشاد فيها؟"
              value={formData.interests?.[index]?.field || ''}
              options={fieldsOptions}
              {...register(`interests.${index}.field` as const, {
                onChange: () => trigger(`interests.${index}.field`),
              })}
            />
            {errors.interests?.[index]?.field?.message && (
              <span className="error">{String(errors.interests[index].field.message)}</span>
            )}
            <SelectInput
              id={`interests[${index}].yearCategory`}
              label="ما الفئة العمرية التي تفضل التعامل معها؟"
              value={formData.interests?.[index]?.yearCategory || ''}
              options={yearCategories}
              {...register(`interests.${index}.yearCategory` as const, {
                onChange: () => trigger(`interests.${index}.yearCategory`),
              })}
            />
            {errors.interests?.[index]?.yearCategory?.message && (
              <span className="error">{String(errors.interests[index].yearCategory.message)}</span>
            )}
            <SelectInput
              id={`interests[${index}].connect`}
              label="كيف تفضل التواصل مع المتعلمين؟"
              value={formData.interests?.[index]?.connect || ''}
              options={connects}
              {...register(`interests.${index}.connect` as const, {
                onChange: () => trigger(`interests.${index}.connect`),
              })}
            />
            {errors.interests?.[index]?.connect?.message && (
              <span className="error">{String(errors.interests[index].connect.message)}</span>
            )}
            <SelectInput
              id={`interests[${index}].timeNum`}
              label="كم ساعة يمكنك تخصيصها أسبوعيًا للإرشاد؟"
              value={formData.interests?.[index]?.timeNum || ''}
              options={timeNumbers}
              {...register(`interests.${index}.timeNum` as const, {
                onChange: () => trigger(`interests.${index}.timeNum`),
              })}
            />
            {errors.interests?.[index]?.timeNum?.message && (
              <span className="error">{String(errors.interests[index].timeNum.message)}</span>
            )}
            <SelectInput
              id={`interests[${index}].lang`}
              label="اختر اللغات التي يمكنك الإرشاد بها"
              value={formData.interests?.[index]?.lang || ''}
              options={languages}
              {...register(`interests.${index}.lang` as const, {
                onChange: () => trigger(`interests.${index}.lang`),
              })}
            />
            {errors.interests?.[index]?.lang?.message && (
              <span className="error">{String(errors.interests[index].lang.message)}</span>
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
          onClick={() =>
            append({
              field: '',
              yearCategory: '',
              connect: '',
              timeNum: '',
              lang: '',
            })
          }
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">اضف اهتمامات اخري</p>
        </div>
      </form>
    </div>
  );
}