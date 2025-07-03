import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema, type StepTwoData } from '../types';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  data: StepTwoData;
  updateData: (data: Partial<StepTwoData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
};

export default function StepTwo({ data, updateData, triggerSubmit }: Props) {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  const years = Array.from({ length: 2025 - 1998 + 1 }, (_, i) => 1998 + i);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: data,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  // Log errors and form data for debugging
  const formData = watch();
  React.useEffect(() => {
    console.log('StepTwo Errors:', errors);
    console.log('StepTwo Form Data:', formData);
  }, [errors, formData]);

  // Handle form submission
  const onSubmit = async (formData: StepTwoData) => {
    console.log('StepTwo onSubmit:', formData);
    updateData(formData);
    return true;
  };

  // Register validation and submission function
  React.useEffect(() => {
    console.log('Registering triggerSubmit for StepTwo');
    triggerSubmit(async () => {
      console.log('Validating StepTwo...');
      const isValid = await trigger();
      console.log('StepTwo isValid:', isValid);
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch]);

  return (
    <div className="step-two mx-4">
      <div className="mt-8">
        <p className="text-3xl font-bold">التعليم</p>
      </div>
      <form className="my-16">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 border-b pb-4">
            <div className="form-control mb-8">
              <label
                htmlFor={`education[${index}].qualification`}
                className="block text-right mb-2 font-bold"
              >
                المؤهل الدراسي
              </label>
              <input
                type="text"
                id={`education[${index}].qualification`}
                className="bg-blue-50 p-2 w-full rounded"
                placeholder="ما هو آخر مؤهل حصلت عليه؟"
                {...register(`education.${index}.qualification` as const)}
              />
              {errors.education?.[index]?.qualification?.message && (
                <span className="error">
                  {String(errors.education[index].qualification.message)}
                </span>
              )}
            </div>
            <div className="form-control mb-8">
              <label
                htmlFor={`education[${index}].org`}
                className="block text-right mb-2 font-bold"
              >
                المؤسسة التعليمية
              </label>
              <input
                type="text"
                id={`education[${index}].org`}
                className="bg-blue-50 p-2 w-full rounded"
                placeholder="من أين حصلت على هذا المؤهل؟"
                {...register(`education.${index}.org` as const)}
              />
              {errors.education?.[index]?.org?.message && (
                <span className="error">{String(errors.education[index].org.message)}</span>
              )}
            </div>
            <div className="form-control mb-8">
              <label
                htmlFor={`education[${index}].spec`}
                className="block text-right mb-2 font-bold"
              >
                التخصص الدراسي
              </label>
              <input
                type="text"
                id={`education[${index}].spec`}
                className="bg-blue-50 p-2 w-full rounded"
                placeholder="ما هو تخصصك الأكاديمي؟"
                {...register(`education.${index}.spec` as const)}
              />
              {errors.education?.[index]?.spec?.message && (
                <span className="error">{String(errors.education[index].spec.message)}</span>
              )}
            </div>
            <div className="flex gap-4">
              <div className="form-control mb-8 w-1/2">
                <label
                  htmlFor={`education[${index}].startMonth`}
                  className="block text-right mb-2 font-bold"
                >
                  تاريخ البداية
                </label>
                <div className="flex gap-2">
                  <select
                    className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                    {...register(`education.${index}.startMonth` as const)}
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
                  <select
                    className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                    {...register(`education.${index}.startYear` as const)}
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
                </div>
                {errors.education?.[index]?.startMonth?.message && (
                  <span className="error">{String(errors.education[index].startMonth.message)}</span>
                )}
                {errors.education?.[index]?.startYear?.message && (
                  <span className="error">{String(errors.education[index].startYear.message)}</span>
                )}
              </div>
              <div className="form-control mb-8 w-1/2">
                <label
                  htmlFor={`education[${index}].endMonth`}
                  className="block text-right mb-2 font-bold"
                >
                  تاريخ النهاية
                </label>
                <div className="flex gap-2">
                  <select
                    className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                    {...register(`education.${index}.endMonth` as const)}
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
                  <select
                    className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
                    {...register(`education.${index}.endYear` as const)}
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
                </div>
                {errors.education?.[index]?.endMonth?.message && (
                  <span className="error">{String(errors.education[index].endMonth.message)}</span>
                )}
                {errors.education?.[index]?.endYear?.message && (
                  <span className="error">{String(errors.education[index].endYear.message)}</span>
                )}
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
          className="add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer"
          onClick={() =>
            append({
              qualification: '',
              org: '',
              spec: '',
              startMonth: '',
              startYear: '',
              endMonth: '',
              endYear: '',
            })
          }
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">اضف بيانات تعليم</p>
        </div>
      </form>
    </div>
  );
}