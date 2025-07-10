import { z } from "zod";

export const stepOneSchema = z
  .object({
    firstName: z.string().min(1, { message: "الاسم الأول مطلوب" }),
    lastName: z.string().min(1, { message: "اسم العائلة مطلوب" }),
    email: z
      .string()
      .min(1, { message: "البريد الإلكتروني مطلوب" })
      .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
    password1: z
      .string()
      .min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
    password2: z.string().min(1, { message: "تأكيد كلمة المرور مطلوب" }),
    phoneNumber: z
      .string()
      .min(1, { message: "رقم الهاتف مطلوب" })
      .regex(/^\+?\d{7,15}$/, { message: "رقم الهاتف غير صحيح" }),
    gender: z.number().int().min(0).max(1, { message: "النوع مطلوب" }), // 0: Male, 1: Female
    bio: z.string().min(1, { message: "السيرة الذاتية مطلوبة" }),
    lang: z.string().refine((val) => ["Arabic", "English"].includes(val), {
      message: "يرجى اختيار اللغة",
    }),
    profilePictureUrl: z
      .any()
      .optional()
      .refine(
        (file) =>
          !file ||
          (file instanceof File &&
            file.size <= 2 * 1024 * 1024 &&
            ["image/jpeg", "image/png"].includes(file.type)),
        {
          message: "يجب أن تكون الصورة JPEG أو PNG بحجم أقل من 2 ميجابايت",
        }
      ),
    countryId: z.string().uuid({ message: "البلد مطلوب" }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password2"],
  });

export const stepTwoSchema = z.object({
  educations: z
    .array(
      z.object({
        institution: z.string().min(1, { message: "المؤسسة التعليمية مطلوبة" }),
        degree: z.string().min(1, { message: "الدرجة العلمية مطلوبة" }),
        field: z.string().min(1, { message: "التخصص الدراسي مطلوب" }),
        startDate: z
          .string()
          .min(1, { message: "تاريخ البداية مطلوب" })
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "تاريخ البداية غير صحيح",
          }),
        endDate: z
          .string()
          .min(1, { message: "تاريخ النهاية مطلوب" })
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "تاريخ النهاية غير صحيح",
          }),
        description: z.string().optional(),
      })
    )
    .min(1, { message: "يجب إضافة مؤهل دراسي واحد على الأقل" }),
});

export const stepThreeSchema = z.object({
  certificates: z
    .array(
      z.object({
        name: z.string().min(1, { message: "اسم الشهادة مطلوب" }),
        certificateUrl: z
          .any()
          .optional()
          .refine(
            (file) =>
              !file ||
              (file instanceof File &&
                file.size <= 5 * 1024 * 1024 &&
                ["image/jpeg", "image/png", "application/pdf"].includes(
                  file.type
                )),
            {
              message:
                "يجب أن يكون الملف صورة (JPEG/PNG) أو PDF بحجم أقل من 5 ميجابايت",
            }
          ),
        issuedBy: z.string().min(1, { message: "الجهة المانحة مطلوبة" }),
        issuedDate: z
          .string()
          .min(1, { message: "تاريخ الإصدار مطلوب" })
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "تاريخ الإصدار غير صحيح",
          }),
        examResult: z.string().optional(),
      })
    )
    .min(1, { message: "يجب إضافة شهادة واحدة على الأقل" }),
});

export const stepFourSchema = z.object({
  teachingAreaIds: z
    .array(z.string().uuid({ message: "المجال مطلوب" }))
    .min(1, { message: "يجب اختيار مجال واحد على الأقل" }),
  ageGroupIds: z
    .array(z.string().uuid({ message: "الفئة العمرية مطلوبة" }))
    .min(1, { message: "يجب اختيار فئة عمرية واحدة على الأقل" }),
  communicationMethodIds: z
    .array(z.string().uuid({ message: "طريقة التواصل مطلوبة" }))
    .min(1, { message: "يجب اختيار طريقة تواصل واحدة على الأقل" }),
  teachingLanguageIds: z
    .array(z.string().uuid({ message: "اللغة مطلوبة" }))
    .min(1, { message: "يجب اختيار لغة واحدة على الأقل" }),
  additionalInterests: z.array(z.string()).optional(),
});

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type StepFourData = z.infer<typeof stepFourSchema>;

export interface FormData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  stepFour: StepFourData;
}
