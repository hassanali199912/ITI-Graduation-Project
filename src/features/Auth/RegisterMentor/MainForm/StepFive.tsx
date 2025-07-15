import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepFiveSchema, type StepFiveData } from '../types';
import AddIcon from '@mui/icons-material/Add';
import FormInput from './components/FormInput';

interface Props {
  data: StepFiveData;
  updateData: (data: Partial<StepFiveData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

export default function StepFive({ data, updateData, triggerSubmit }: Props) {
  const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const years = Array.from({ length: 2025 - 1998 + 1 }, (_, i) => 1998 + i);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<StepFiveData>({
    resolver: zodResolver(stepFiveSchema),
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exams',
  });

  // Log errors and form data for debugging
  const formData = watch();
  React.useEffect(() => {
    // console.log('StepFive Errors:', JSON.stringify(errors, null, 2));
    console.log('StepFive Form Data:', JSON.stringify(formData, null, 2));
  }, [errors, formData]);

  // Handle form submission
  const onSubmit = async (formData: StepFiveData) => {
    console.log('StepFive onSubmit:', JSON.stringify(formData, null, 2));
    updateData(formData);
    return true;
  };

  // Register validation and submission function
  React.useEffect(() => {
    console.log('Registering triggerSubmit for StepFive');
    triggerSubmit(async () => {
      console.log('Validating StepFive...');
      const isValid = await trigger();
      console.log('StepFive isValid:', isValid);
      if (!isValid) {
        console.log('StepFive Validation Errors:', JSON.stringify(errors, null, 2));
      }
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  // Handle file upload
  const handleFileChange = (index: number, file: File | undefined) => {
    setValue(`exams.${index}.certificateFile`, file, { shouldValidate: true });
    trigger(`exams.${index}.certificateFile`);
  };

  return (
    <div className="step-five mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">الإمتحانات السابقة</p>
      </div>
      <div className="flex my-8">
        <div className="w-3/4">
          <p className="font-bold">هل سبق أن اجتزت اختبارات في مجالك؟</p>
        </div>
        <div className="w-1/4">
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                {...register('hasExams', { onChange: () => trigger('hasExams') })}
                className="w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500"
              />
              نعم
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                {...register('hasExams', { onChange: () => trigger('hasExams') })}
                className="w-5 h-5 rounded-full border border-gray-400 checked:bg-blue-500"
              />
              لا
            </label>
          </div>
          {errors.hasExams?.message && <span className="error">{String(errors.hasExams.message)}</span>}
        </div>
      </div>
      {formData.hasExams === 'yes' && (
        <form className="my-16">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-8 border-b pb-4">
              <div className="flex w-full gap-4">
                <div className="w-1/2">
                  <FormInput
                    id={`exams[${index}].examName`}
                    placeholder="اكتب اسم الامتحان"
                    label="اذكر اسم الامتحان"
                    {...register(`exams.${index}.examName` as const, {
                      onChange: () => trigger(`exams.${index}.examName`),
                    })}
                  />
                  {errors.exams?.[index]?.examName?.message && (
                    <span className="error">{String(errors.exams[index].examName.message)}</span>
                  )}
                </div>
                <div className="w-1/2">
                  <FormInput
                    id={`exams[${index}].rate`}
                    placeholder="تقييم الامتحان"
                    label="التقييم"
                    {...register(`exams.${index}.rate` as const, {
                      onChange: () => trigger(`exams.${index}.rate`),
                    })}
                  />
                  {errors.exams?.[index]?.rate?.message && (
                    <span className="error">{String(errors.exams[index].rate.message)}</span>
                  )}
                </div>
              </div>
              <FormInput
                id={`exams[${index}].givingOrg`}
                label="من الجهة التي نظمت الامتحان؟"
                placeholder="الجهة المانحة"
                {...register(`exams.${index}.givingOrg` as const, {
                  onChange: () => trigger(`exams.${index}.givingOrg`),
                })}
              />
              {errors.exams?.[index]?.givingOrg?.message && (
                <span className="error">{String(errors.exams[index].givingOrg.message)}</span>
              )}
              <div className="flex items-center gap-4">
                <div className="w-3/4">
                  <FormInput
                    id={`exams[${index}].examCertificates`}
                    label="هل لديك شهادات لهذا الامتحان؟"
                    placeholder="أضفها هنا"
                    hint="يمكنك رفع ملفات الشهادات بصيغة PDF أو صورة"
                    {...register(`exams.${index}.examCertificates` as const, {
                      onChange: () => trigger(`exams.${index}.examCertificates`),
                    })}
                  />
                  {errors.exams?.[index]?.examCertificates?.message && (
                    <span className="error">{String(errors.exams[index].examCertificates.message)}</span>
                  )}
                </div>
                <div className="w-3/4">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0])}
                    className="cursor-pointer flex items-center gap-2 px-4 border-1 border-blue-500 text-blue-700 p-2 rounded-lg"
                  />
                  {errors.exams?.[index]?.certificateFile?.message && (
                    <span className="error">{String(errors.exams[index].certificateFile.message)}</span>
                  )}
                </div>
              </div>
              <div className="flex w-full items-center mb-8">
                <div className="w-1/2">
                  <label htmlFor={`exams[${index}].examMonth`} className="block text-right mb-2 font-bold">
                    متى اجتزت هذا الاختبار؟
                  </label>
                </div>
                <div className="flex gap-2 w-1/2">
                  <div className="w-1/2">
                    <select
                      className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                      {...register(`exams.${index}.examMonth` as const, {
                        onChange: () => trigger(`exams.${index}.examMonth`),
                      })}
                    >
                      <option value="" disabled>
                        الشهر
                      </option>
                      {months.map((month, i) => (
                        <option key={i} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    {errors.exams?.[index]?.examMonth?.message && (
                      <span className="error">{String(errors.exams[index].examMonth.message)}</span>
                    )}
                  </div>
                  <div className="w-1/2">
                    <select
                      className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                      {...register(`exams.${index}.examYear` as const, {
                        onChange: () => trigger(`exams.${index}.examYear`),
                      })}
                    >
                      <option value="" disabled>
                        السنة
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.exams?.[index]?.examYear?.message && (
                      <span className="error">{String(errors.exams[index].examYear.message)}</span>
                    )}
                  </div>
                </div>
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
            className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer"
            onClick={() =>
              append({
                examName: '',
                rate: '',
                givingOrg: '',
                examCertificates: '',
                certificateFile: undefined,
                examMonth: '',
                examYear: '',
              })
            }
          >
            <span className="p-1 inline-flex items-center justify-center text-white">
              <AddIcon fontSize="small" className="text-blue-500" />
            </span>
            <p className="font-bold text-blue-500">اضف امتحانات اخري</p>
          </div>
        </form>
      )}
    </div>
  );
}