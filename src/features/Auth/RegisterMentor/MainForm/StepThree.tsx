import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepThreeSchema, type StepThreeData } from '../types';
import AddIcon from '@mui/icons-material/Add';
import SelectInput from './components/SelectInput';
import FormInput from './components/FormInput';
import DatePicker from './DatePicker';

// Define Props interface
interface Props {
  data: StepThreeData;
  updateData: (data: Partial<StepThreeData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

// Define DatePicker props to fix TypeScript errors
interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
}

export default function StepThree({ data, updateData, triggerSubmit }: Props) {
  const skills = ['برمجة', 'تصميم', 'تسويق', 'تدريس'];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<StepThreeData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  });

  // Log errors and form data for debugging
  const formData = watch();
  React.useEffect(() => {
    // console.log('StepThree Errors:', JSON.stringify(errors, null, 2));
    console.log('StepThree Form Data:', JSON.stringify(formData, null, 2));
  }, [errors, formData]);

  // Handle form submission
  const onSubmit = async (formData: StepThreeData) => {
    console.log('StepThree onSubmit:', JSON.stringify(formData, null, 2));
    updateData(formData);
    return true;
  };

  // Register validation and submission function
  React.useEffect(() => {
    console.log('Registering triggerSubmit for StepThree');
    triggerSubmit(async () => {
      console.log('Validating StepThree...');
      const isValid = await trigger();
      console.log('StepThree isValid:', isValid);
      if (!isValid) {
        console.log('StepThree Validation Errors:', JSON.stringify(errors, null, 2));
      }
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  return (
    <div className="step-three mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">المهارات والشهادات</p>
      </div>
      <form className="my-16">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 border-b pb-4">
            <SelectInput
              id={`certificates[${index}].skill`}
              label="اختر المهارات التي تتقنها ويمكنك تعليمها"
              value={formData.certificates?.[index]?.skill || ''}
              options={skills}
              {...register(`certificates.${index}.skill` as const)}
            />
            {errors.certificates?.[index]?.skill?.message && (
              <span className="error">{String(errors.certificates[index].skill.message)}</span>
            )}
            <div className="flex items-center gap-4">
              <div className="w-3/4">
                <FormInput
                  id={`certificates[${index}].certificate`}
                  label="هل لديك شهادات تثبت مهاراتك؟"
                  placeholder="أضفها هنا"
                  {...register(`certificates.${index}.certificate` as const)}
                  hint="يمكنك رفع ملفات الشهادات بصيغة PDF أو صورة"
                />
                {errors.certificates?.[index]?.certificate?.message && (
                  <span className="error">{String(errors.certificates[index].certificate.message)}</span>
                )}
              </div>
              <div className="w-1/4">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  id={`certificates[${index}].file`}
                  {...register(`certificates.${index}.file` as const)}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setValue(`certificates.${index}.file`, file, { shouldValidate: true });
                    trigger(`certificates.${index}.file`);
                  }}
                />
                <label
                  htmlFor={`certificates[${index}].file`}
                  className="cursor-pointer flex items-center gap-2 px-4 border-1 border-blue-500 text-blue-700 p-2 rounded-lg"
                >
                  <span>
                    <img src="/attach.png" alt="Attach" />
                  </span>
                  تحميل
                </label>
                {errors.certificates?.[index]?.file?.message && (
                  <span className="error">{String(errors.certificates[index].file.message)}</span>
                )}
              </div>
            </div>
            <FormInput
              id={`certificates[${index}].organisation`}
              label="من الجهة التي أصدرت الشهادة؟"
              placeholder="الجهة المانحة"
              {...register(`certificates.${index}.organisation` as const)}
            />
            {errors.certificates?.[index]?.organisation?.message && (
              <span className="error">{String(errors.certificates[index].organisation.message)}</span>
            )}
            <div className="form-control mb-8">
              <label
                htmlFor={`certificates[${index}].certificateDate`}
                className="block text-right mb-2 font-bold"
              >
                متى حصلت على هذه الشهادة؟
              </label>
              <Controller
                control={control}
                name={`certificates.${index}.certificateDate` as const}
                render={({ field }) => (
                  <DatePicker
                    selectedDate={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      field.onChange(date ? date.toISOString().split('T')[0] : '');
                      trigger(`certificates.${index}.certificateDate`);
                    }}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {/* Fallback: Uncomment to test if DatePicker issues persist
              <input
                type="date"
                id={`certificates[${index}].certificateDate`}
                className="bg-blue-50 p-2 w-full rounded"
                {...register(`certificates.${index}.certificateDate` as const)}
                onChange={(e) => {
                  setValue(`certificates.${index}.certificateDate`, e.target.value, { shouldValidate: true });
                  trigger(`certificates.${index}.certificateDate`);
                }}
              />
              */}
              {errors.certificates?.[index]?.certificateDate?.message && (
                <span className="error">{String(errors.certificates[index].certificateDate.message)}</span>
              )}
            </div>
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
          className="add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer"
          onClick={() =>
            append({
              skill: '',
              certificate: '',
              file: undefined,
              organisation: '',
              certificateDate: '',
            })
          }
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">اضف مهاره اخري</p>
        </div>
      </form>
    </div>
  );
}