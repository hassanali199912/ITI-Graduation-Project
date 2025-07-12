import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema, type StepOneData } from '../types';
import FormInput from './components/FormInput';
import SelectInput from './components/SelectInput';
import { useLazyGetCountriesQuery, useLazyGetGenderQuery } from '../../api/lookups';

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
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [triggerCountries, { data: countries }] = useLazyGetCountriesQuery();
  const [triggerGender, { data: gender }] = useLazyGetGenderQuery();

  // Fetch lookups
  useEffect(() => {
    triggerCountries();
    triggerGender();
  }, [triggerCountries, triggerGender]);

  // Log errors and form data
  const formData = watch();
  useEffect(() => {
    // console.log('StepOne Errors:', JSON.stringify(errors, null, 2));
    console.log('StepOne Form Data:', JSON.stringify(formData, null, 2));
    console.log('Countries:', JSON.stringify(countries, null, 2));
    console.log('Gender:', JSON.stringify(gender, null, 2));
  }, [errors, formData, countries, gender]);

  // Handle form submission
  const onSubmit = async (formData: StepOneData) => {
    console.log('StepOne onSubmit:', JSON.stringify(formData, null, 2));
    updateData(formData);
    return true;
  };

  // Register validation and submission
  useEffect(() => {
    console.log('Registering triggerSubmit for StepOne');
    triggerSubmit(async () => {
      console.log('Validating StepOne...');
      const isValid = await trigger();
      console.log('StepOne isValid:', isValid);
      if (!isValid) {
        // console.log('StepOne Validation Errors:', JSON.stringify(errors, null, 2));
      }
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  // Handle file upload
  const handleFileChange = (file: File | undefined) => {
    setValue('profilePictureUrl', file, { shouldValidate: true });
    trigger('profilePictureUrl');
  };

  const avatarFile = watch('profilePictureUrl');

  return (
    <div className="step-one mx-4">
      <div className="mt-8">
        <p className="text-3xl font-bold">
          ابدأ رحلتك معنا: لنبدأ بالتعرّف عليك!
        </p>
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
              accept="image/jpeg,image/png"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
              className="border rounded px-4 py-2"
            />
            {errors.profilePictureUrl?.message && <span className="error">{String(errors.profilePictureUrl.message)}</span>}
          </div>
        </div>

        <FormInput
          id="firstName"
          label="الإسم الأول"
          placeholder="محمد  "
          register={register}
          onChange={() => trigger("firstName")}
        />
        {errors.firstName?.message && <span className="error">{String(errors.firstName.message)}</span>}
        <FormInput
          id="lastName"
          label="الإسم الأخير"
          placeholder="أحمد"
          register={register}
          onChange={() => trigger("lastName")}
        />
        {errors.lastName?.message && <span className="error">{String(errors.lastName.message)}</span>}

        <FormInput
          id="email"
          label="البريد الإلكتروني"
          placeholder="Example@gmail.com"
          register={register}
          onChange={() => trigger("email")}
        />
        {errors.email?.message && <span className="error">{String(errors.email.message)}</span>}

        <div className="flex gap-4">
          <FormInput
            id="password1"
            label="كلمة المرور"
            placeholder="ادخل رقمك السري"
            type="password"
            register={register}
            onChange={() => trigger("password1")}
          />
          {errors.password1?.message && <span className="error">{String(errors.password1.message)}</span>}
          <FormInput
            id="password2"
            label="أعد كتابة كلمة المرور"
            placeholder="أعد كتابة كلمة السر"
            type="password"
            register={register}
            onChange={() => trigger("password2")}
          />
          {errors.password2?.message && <span className="error">{String(errors.password2.message)}</span>}
        </div>

        <FormInput
          id="phoneNumber"
          label="رقم الهاتف"
          placeholder="أدخل رقم الهاتف"
          register={register}
          onChange={() => trigger("phoneNumber")}
        />
        {errors.phoneNumber?.message && <span className="error">{String(errors.phoneNumber.message)}</span>}

        <FormInput
          id="bio"
          label="السيرة الذاتية"
          placeholder="أدخل سيرتك الذاتية"
          register={register}
          onChange={() => trigger("bio")}
        />
        {errors.bio?.message && <span className="error">{String(errors.bio.message)}</span>}

        <SelectInput
          id="gender"
          label="النوع"
          options={gender?.value || []}
          register={register}
          setValueAs={(value) => (value === '' ? undefined : parseInt(value, 10))}
        />
        {errors.gender?.message && <span className="error">{String(errors.gender.message)}</span>}

       
        <SelectInput
          id="countryId"
          label="من أي بلد؟"
          options={countries?.value || []}
          register={register}
        />
        {errors.countryId?.message && <span className="error">{String(errors.countryId.message)}</span>}

        <SelectInput
          id="lang"
          label="اللغة التي تتحدث بها"
          options={[
            { id: 'Arabic', name: 'Arabic' },
            { id: 'English', name: 'English' },
          ]}
          register={register}
        />
        {errors.lang?.message && <span className="error">{String(errors.lang.message)}</span>}
      </form>
    </div>
  );
}