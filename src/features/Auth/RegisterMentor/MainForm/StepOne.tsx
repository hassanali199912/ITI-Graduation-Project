import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema, type StepOneData } from '../types';

type Props = {
  data: StepOneData;
  updateData: (data: Partial<StepOneData>) => void;
  triggerSubmit: (submitFn: () => Promise<boolean>) => void;
};

export default function StepOne({ data, updateData, triggerSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: data,
    mode: 'onChange', // Validate on every input change
  });

  // Watch avatar file for preview
  const avatarFile = watch('avatar');

  // Handle form submission
  const onSubmit = async (formData: StepOneData) => {
    updateData(formData); // Update parent state
    return true; // Indicate successful validation
  };

  // Register validation and submission function
  React.useEffect(() => {
    triggerSubmit(async () => {
      const isValid = await trigger(); // Validate all fields
      if (isValid) {
        const formData = watch(); // Get current form values
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any); // Trigger submission
        updateData(formData); // Update parent state
      }
      return isValid; // Return validation status
    });
  }, [triggerSubmit, trigger, handleSubmit, updateData, watch]);

  return (
    <div className="step-one mx-4">
      <div className="mt-8">
        <p className="text-3xl font-bold">ابدأ رحلتك معنا: لنبدأ بالتعرّف عليك!</p>
        <p className="text-3xl font-bold">معلومات أساسية</p>
      </div>

      <form className="mb-10 mt-4">
        <div className="flex items-center gap-4">
          <div className="my-8">
            <img
              src={avatarFile instanceof File ? URL.createObjectURL(avatarFile) : '/avatar.png'}
              alt="Avatar"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div>
            <p className="font-bold text-base text-blue-500">حدد الصورة (اختياري)</p>
            <p className="text-base text-gray-500">تأكد أن حجم الصورة لا يتعدى 2MB</p>
            <input
              type="file"
              accept="image/*"
              {...register('avatar')}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue('avatar', file, { shouldValidate: true });
                }
              }}
            />
            {errors.avatar?.message && <span className="error">{String(errors.avatar.message)}</span>}
          </div>
        </div>

        <div className="form-control mb-8">
          <label htmlFor="name" className="block text-right mb-2 font-bold">
            الإسم بالكامل
          </label>
          <input
            type="text"
            id="name"
            className="bg-blue-50 p-2 w-full rounded"
            placeholder="محمد جمال أحمد"
            {...register('name')}
          />
          {errors.name?.message && <span className="error">{String(errors.name.message)}</span>}
        </div>

        <div className="form-control mb-8">
          <label htmlFor="email" className="block text-right mb-2 font-bold">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            className="bg-blue-50 p-2 w-full rounded"
            placeholder="Example@gmail.com"
            {...register('email')}
          />
          {errors.email?.message && <span className="error">{String(errors.email.message)}</span>}
        </div>

        <div className="flex gap-4">
          <div className="form-control mb-8 w-1/2">
            <label htmlFor="password1" className="block text-right mb-2 font-bold">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password1"
              className="bg-blue-50 p-2 w-full rounded"
              placeholder="ادخل رقمك السري"
              {...register('password1')}
            />
            {errors.password1?.message && <span className="error">{String(errors.password1.message)}</span>}
          </div>
          <div className="form-control mb-8 w-1/2">
            <label htmlFor="password2" className="block text-right mb-2 font-bold">
              أعد كتابة كلمة المرور
            </label>
            <input
              type="password"
              id="password2"
              className="bg-blue-50 p-2 w-full rounded"
              placeholder="أعد كتابة كلمة السر"
              {...register('password2')}
            />
            {errors.password2?.message && <span className="error">{String(errors.password2.message)}</span>}
          </div>
        </div>

        <div className="form-control mb-8">
          <label htmlFor="type" className="block text-right mb-2 font-bold">
            النوع
          </label>
          <select
            id="type"
            className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
            {...register('type')}
          >
            <option value="" disabled>
              النوع
            </option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>
          {errors.type?.message && <span className="error">{String(errors.type.message)}</span>}
        </div>

        <div className="form-control mb-8">
          <label htmlFor="country" className="block text-right mb-2 font-bold">
            من أي بلد؟
          </label>
          <select
            id="country"
            className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
            {...register('country')}
          >
            <option value="" disabled>
              مصر
            </option>
            <option value="السعودية">السعودية</option>
            <option value="الإمارات">الإمارات</option>
          </select>
          {errors.country?.message && <span className="error">{String(errors.country.message)}</span>}
        </div>

        <div className="form-control mb-8">
          <label htmlFor="lang" className="block text-right mb-2 font-bold">
            اللغة التي تتحدث بها
          </label>
          <select
            id="lang"
            className="appearance-none border w-full mt-2 border-gray-300 rounded px-4 py-2 text-sm text-gray-600 bg-white custom-select"
            {...register('lang')}
          >
            <option value="" disabled>
              Arabic
            </option>
            <option value="English">English</option>
          </select>
          {errors.lang?.message && <span className="error">{String(errors.lang.message)}</span>}
        </div>
      </form>
    </div>
  );
}