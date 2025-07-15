import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from './components/FormInput';
import AddIcon from '@mui/icons-material/Add';
import { type FormData, type StepTwoData } from '../types';

interface Props {
  data?: StepTwoData;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
  updateData?: (data: Partial<StepTwoData>) => void;
}

const emptyEducation: StepTwoData['educations'][number] = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
};

export default function StepTwo({ triggerSubmit }: Props) {
  const {
    control,
    register,
    formState: { errors },
    trigger,
  } = useFormContext<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stepTwo.educations',
  });

  /* 3. إضافة صف فارغ مرة واحدة فقط بعد mount */
  useEffect(() => {
    if (fields.length === 0) append({ ...emptyEducation });
    // intentionally empty dependency array to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 4. تسجيل دالة التحقق؛ لا نعتمد على updateData لتفادى إعادة الإنشاء */
  useEffect(() => {
    triggerSubmit(async () => await trigger('stepTwo'));
  }, [triggerSubmit, trigger]);

  /* ———————————————————————— UI ———————————————————————— */
  return (
    <div className="step-two mx-4">
      <div className="my-8">
        <p className="text-3xl font-bold">التعليم</p>
      </div>

      <div className="my-16">
        <div className="education-fields">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-8 border-b pb-4">
              {/* المؤسسة التعليمية */}
              <FormInput
                id={`stepTwo.educations.${index}.institution`}
                label="المؤسسة التعليمية"
                placeholder="أدخل اسم المؤسسة"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.institution`)}
              />
              {errors.stepTwo?.educations?.[index]?.institution?.message && (
                <span className="error text-red-500 text-sm">
                  {String(errors.stepTwo.educations[index].institution?.message)}
                </span>
              )}

              {/* الدرجة العلمية */}
              <FormInput
                id={`stepTwo.educations.${index}.degree`}
                label="الدرجة العلمية"
                placeholder="أدخل الدرجة العلمية"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.degree`)}
              />
              {errors.stepTwo?.educations?.[index]?.degree?.message && (
                <span className="error text-red-500 text-sm">
                  {String(errors.stepTwo.educations[index].degree?.message)}
                </span>
              )}

              {/* التخصص */}
              <FormInput
                id={`stepTwo.educations.${index}.field`}
                label="التخصص"
                placeholder="أدخل التخصص"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.field`)}
              />
              {errors.stepTwo?.educations?.[index]?.field?.message && (
                <span className="error text-red-500 text-sm">
                  {String(errors.stepTwo.educations[index].field?.message)}
                </span>
              )}

              {/* تاريخ البداية */}
              <FormInput
                id={`stepTwo.educations.${index}.startDate`}
                label="تاريخ البداية"
                type="date"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.startDate`)}
              />
              {errors.stepTwo?.educations?.[index]?.startDate?.message && (
                <span className="error text-red-500 text-sm">
                  {String(errors.stepTwo.educations[index].startDate?.message)}
                </span>
              )}

              {/* تاريخ النهاية */}
              <FormInput
                id={`stepTwo.educations.${index}.endDate`}
                label="تاريخ النهاية"
                type="date"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.endDate`)}
              />
              {errors.stepTwo?.educations?.[index]?.endDate?.message && (
                <span className="error text-red-500 text-sm">
                  {String(errors.stepTwo.educations[index].endDate?.message)}
                </span>
              )}

              {/* الوصف */}
              <FormInput
                id={`stepTwo.educations.${index}.description`}
                label="الوصف"
                placeholder="أدخل وصفًا (اختياري)"
                register={register}
                onChange={() => trigger(`stepTwo.educations.${index}.description`)}
              />

              {/* زر الحذف */}
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
        </div>

        {/* زر إضافة صف جديد */}
        <div
          className="mb-8 add-details rounded border-blue-500 border-1 py-2 items-center justify-center flex cursor-pointer"
          onClick={() => append({ ...emptyEducation })}
        >
          <span className="p-1 inline-flex items-center justify-center text-white">
            <AddIcon fontSize="small" className="text-blue-500" />
          </span>
          <p className="font-bold text-blue-500">إضافة تعليم آخر</p>
        </div>
      </div>
    </div>
  );
}
