import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepThreeSchema, type StepThreeData } from '../types';
import FormInput from './components/FormInput';
import AddIcon from '@mui/icons-material/Add';
import { uploadFileDirect } from '../../../../config/apis';

interface Props {
  data: StepThreeData;
  updateData: (data: Partial<StepThreeData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
}

export default function StepThree({ data, updateData, triggerSubmit }: Props) {
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

  // Handle form submission
  const onSubmit = async (formData: StepThreeData) => {
    updateData(formData);
    return true;
  };

  // Register validation and submission
  React.useEffect(() => {
    triggerSubmit(async () => {
      const isValid = await trigger();
      if (!isValid) {
        console.log('StepThree Validation Errors:', JSON.stringify(errors, null, 2));
      }
      if (isValid) {
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    console.log(file, 'file');
    if (!file) return;
    try {
      const response = await uploadFileDirect(file);
      const url = response?.data?.data?.fileUrl || "";
      console.log("Uploaded URL", url);
      // Set only the URL as certificateUrl expects a string or File
      setValue(`certificates.${index}.certificateUrl`, url, { shouldValidate: true });
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className="step-three mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">الشهادات والامتحانات</p>
      </div>
      <form className="my-16">
        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 border-b pb-4">
            <FormInput
              id={`certificates[${index}].name`}
              label="اسم الشهادة"
              placeholder="أدخل اسم الشهادة"
              register={register}
              onChange={() => trigger(`certificates.${index}.name`)}
            />
            {errors.certificates?.[index]?.name?.message && (
              <span className="error">{String(errors.certificates[index].name.message)}</span>
            )}
            <div>
              <label className="block text-right mb-2 font-bold">ملف الشهادة</label>
              <input
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                onChange={(e) => handleFileChange(e, index)}
                className="border rounded px-4 py-2"
              />
              <input
                type="hidden"
                {...register(`certificates.${index}.certificateUrl` as const)}
              />
              {errors.certificates?.[index]?.certificateUrl?.message && (
                <span className="error">{String(errors.certificates[index].certificateUrl.message)}</span>
              )}
            </div>
            <FormInput
              id={`certificates[${index}].issuedBy`}
              label="الجهة المانحة"
              placeholder="أدخل الجهة المانحة"
              register={register}
              onChange={() => trigger(`certificates.${index}.issuedBy`)}
            />
            {errors.certificates?.[index]?.issuedBy?.message && (
              <span className="error">{String(errors.certificates[index].issuedBy.message)}</span>
            )}
            <FormInput
              id={`certificates[${index}].issuedDate`}
              label="تاريخ الإصدار"
              type="date"
              register={register}
              onChange={() => trigger(`certificates.${index}.issuedDate`)}
            />
            {errors.certificates?.[index]?.issuedDate?.message && (
              <span className="error">{String(errors.certificates[index].issuedDate.message)}</span>
            )}
            <FormInput
              id={`certificates[${index}].examResult`}
              label="نتيجة الامتحان"
              placeholder="أدخل النتيجة (اختياري)"
              register={register}
              onChange={() => trigger(`certificates.${index}.examResult`)}
            />
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
              name: '',
              certificateUrl: undefined,
              issuedBy: '',
              issuedDate: '',
              examResult: '',
            })
          }
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">إضافة شهادة أخرى</p>
        </div>
      </form>
    </div>
  );
}