import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema, type StepOneData } from "../types";
import FormInput from "./components/FormInput";
import SelectInput from "./components/SelectInput";
import {
  useLazyGetCountriesQuery,
  useLazyGetGenderQuery,
  useLazyGetSkillsQuery,
} from "../../api/lookups";
import Tags from "../../../../shared/components/form/Tags";
import { useUploadFileMutation } from "../../api/regester";
import { uploadFileDirect } from "../../../../config/apis";

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
    control,
    trigger,
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: data,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [triggerCountries, { data: countries }] = useLazyGetCountriesQuery();
  const [triggerGender, { data: gender }] = useLazyGetGenderQuery();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    triggerCountries();
    triggerGender();
  }, [triggerCountries, triggerGender]);

  // Handle form submission
  const onSubmit = async (formData: StepOneData) => {
    updateData(formData);
    return true;
  };

  // Register validation and submission
  useEffect(() => {
    triggerSubmit(async () => {
      const isValid = await trigger();
      if (!isValid) {
        console.log(
          "StepOne Validation Errors:",
          JSON.stringify(errors, null, 2)
        );
        console.log("StepOne Validation Errors:", errors);
      }
      if (isValid) {
        const currentData = watch();
        await handleSubmit(onSubmit)({ target: { elements: [] } } as any);
      }
      return isValid;
    });
  }, [triggerSubmit, trigger, handleSubmit, watch, errors]);

  // Handle file upload
  // const handleFileChange = (file: File | undefined) => {
  //   setValue("profilePictureUrl", file, { shouldValidate: true });
  //   trigger("profilePictureUrl");
  // };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 1) عرّض الصورة محليًا
    setValue("profilePictureUrl", file, { shouldValidate: true });
    try {
      const response = await uploadFileDirect(file);
      let url = response?.data?.fileUrl || ""
      console.log("jhhkhkkhkhk", response?.data?.data?.fileUrl);
      // 2) بعد الرفع، خزّن الـ URL بدل الـ File
      setValue("profilePictureUrl", response?.data?.data?.fileUrl, { shouldValidate: true });
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const skills = watch("skills");
  const avatarFile = watch("profilePictureUrl");
  const [triggerSkills, { data: skillsRes }] = useLazyGetSkillsQuery();
  useEffect(() => {
    triggerSkills();
  }, [triggerSkills]);
  useEffect(() => {
    if (skillsRes?.value) console.log(skillsRes.value);
  }, [skillsRes]);
  const skillsOptions = (skillsRes?.value ?? [])
    .filter((s: { id: string; name: string }) => s.id && s.name)
    .map((s: { id: string; name: string }) => ({
      id: s.id,
      name: s.name,
    }));
  // console.log(skillsOptions);
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
              src={
                avatarFile instanceof File
                  ? URL.createObjectURL(avatarFile)
                  : "/avatar.png"
              }
              alt="Avatar"
              className="h-20 w-20 rounded-full"
            />
          </div>
          <div>
            <p className="font-bold text-base text-blue-500">
              حدد الصورة (اختياري)
            </p>
            <p className="text-base text-gray-500">
              تأكد أن حجم الصورة لا يتعدى 2MB
            </p>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="border rounded px-4 py-2"
            />
            {errors.profilePictureUrl?.message && (
              <span className="error">
                {String(errors.profilePictureUrl.message)}
              </span>
            )}
          </div>
        </div>

        <FormInput
          id="firstName"
          label="الإسم الأول"
          placeholder="محمد  "
          register={register}
          onChange={() => trigger("firstName")}
        />
        {errors.firstName?.message && (
          <span className="error">{String(errors.firstName.message)}</span>
        )}

        <FormInput
          id="lastName"
          label="الإسم الأخير"
          placeholder="أحمد"
          register={register}
          onChange={() => trigger("lastName")}
        />
        {errors.lastName?.message && (
          <span className="error">{String(errors.lastName.message)}</span>
        )}
        {/* <SelectInput
          id="skills" // ⬅️ نفس الـ id فى الـ schema
          label="اختر المهارات"
          options={skillsOptions} // ⬅️ اللى جبناه من فوق
          multiple
          register={register}
        /> */}
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <>
              <label className="block text-right mb-2 font-bold">السعر</label>
              <input
                {...field}
                type="text"
                placeholder="ادخل السعر"
                className="bg-blue-50 p-2 w-full rounded mt-4 mb-8"
                onChange={(e) =>
                  field.onChange(
                    e.target.value.trim() === ""
                      ? undefined
                      : Number(e.target.value)
                  )
                }
              />
            </>
          )}
        />
        {errors.salary?.message && (
          <span className="error">{String(errors.salary.message)}</span>
        )}

        <Controller
          name="skills"
          control={control}
          render={({ field }) => {
            const selectedObjs = skillsOptions.filter(
              (o: { id: string; name: string }) => field.value?.includes(o.id)
            );

            return (
              <Tags
                label="المهارات"
                placeholder="اختر مهارة"
                options={skillsOptions}
                value={selectedObjs}
                onChange={(newObjs) => {
                  const ids = newObjs.map((s) => s.skillId); // رجّع IDs لـ RHF
                  field.onChange(ids);
                }}
              />
            );
          }}
        />

        {errors.skills?.message && (
          <span className="error">{String(errors.skills.message)}</span>
        )}

        {errors.skills?.message && (
          <span className="error">{String(errors.skills.message)}</span>
        )}

        <FormInput
          id="email"
          label="البريد الإلكتروني"
          placeholder="Example@gmail.com"
          register={register}
          onChange={() => trigger("email")}
        />
        {errors.email?.message && (
          <span className="error">{String(errors.email.message)}</span>
        )}

        <div className="flex gap-4">
          <FormInput
            id="password1"
            label="كلمة المرور"
            placeholder="ادخل رقمك السري"
            type="password"
            register={register}
            onChange={() => trigger("password1")}
          />
          {errors.password1?.message && (
            <span className="error">{String(errors.password1.message)}</span>
          )}
          <FormInput
            id="password2"
            label="أعد كتابة كلمة المرور"
            placeholder="أعد كتابة كلمة السر"
            type="password"
            register={register}
            onChange={() => trigger("password2")}
          />
          {errors.password2?.message && (
            <span className="error">{String(errors.password2.message)}</span>
          )}
        </div>

        <FormInput
          id="phoneNumber"
          label="رقم الهاتف"
          placeholder="أدخل رقم الهاتف"
          register={register}
          onChange={() => trigger("phoneNumber")}
        />
        {errors.phoneNumber?.message && (
          <span className="error">{String(errors.phoneNumber.message)}</span>
        )}

        <FormInput
          id="bio"
          label="السيرة الذاتية"
          placeholder="أدخل سيرتك الذاتية"
          register={register}
          onChange={() => trigger("bio")}
        />
        {errors.bio?.message && (
          <span className="error">{String(errors.bio.message)}</span>
        )}

        <SelectInput
          id="gender"
          label="النوع"
          options={gender?.value || []}
          register={register}
          setValueAs={(value) =>
            value === "" ? undefined : parseInt(value, 10)
          }
        />
        {errors.gender?.message && (
          <span className="error">{String(errors.gender.message)}</span>
        )}

        <SelectInput
          id="countryId"
          label="من أي بلد؟"
          options={countries?.value || []}
          register={register}
        />
        {errors.countryId?.message && (
          <span className="error">{String(errors.countryId.message)}</span>
        )}

        <SelectInput
          id="lang"
          label="اللغة التي تتحدث بها"
          options={[
            { id: "Arabic", name: "Arabic" },
            { id: "English", name: "English" },
          ]}
          register={register}
        />
        {errors.lang?.message && (
          <span className="error">{String(errors.lang.message)}</span>
        )}
      </form>
    </div>
  );
}
