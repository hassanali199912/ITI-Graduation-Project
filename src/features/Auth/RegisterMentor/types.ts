import { z } from 'zod';

export const stepOneSchema = z
  .object({
    avatar: z
      .any()
      .optional()
      .refine((file) => !file || (file instanceof File && file.size <= 2 * 1024 * 1024), {
        message: 'حجم الصورة يجب ألا يتجاوز 2 ميجابايت',
      }),
    name: z.string().min(1, { message: 'الإسم بالكامل مطلوب' }),
    email: z.string().min(1, { message: 'البريد الإلكتروني مطلوب' }).email({ message: 'صيغة البريد الإلكتروني غير صحيحة' }),
    password1: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }),
    password2: z.string().min(1, { message: 'تأكيد كلمة المرور مطلوب' }),
    type: z.enum(['ذكر', 'أنثى'], { message: 'النوع مطلوب' }),
    country: z.string().min(1, { message: 'البلد مطلوب' }),
    lang: z.string().min(1, { message: 'اللغة مطلوبة' }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['password2'],
  });

export const stepTwoSchema = z.object({
  education: z
    .array(
      z.object({
        qualification: z.string().min(1, { message: 'المؤهل الدراسي مطلوب' }),
        org: z.string().min(1, { message: 'المؤسسة التعليمية مطلوبة' }),
        spec: z.string().min(1, { message: 'التخصص الدراسي مطلوب' }),
        startMonth: z.string().min(1, { message: 'شهر البداية مطلوب' }),
        startYear: z.string().min(1, { message: 'سنة البداية مطلوبة' }),
        endMonth: z.string().min(1, { message: 'شهر النهاية مطلوب' }),
        endYear: z.string().min(1, { message: 'سنة النهاية مطلوبة' }),
      })
    )
    .min(1, { message: 'يجب إضافة مؤهل دراسي واحد على الأقل' }),
});

export const stepThreeSchema = z.object({
  certificates: z
    .array(
      z.object({
        skill: z.string().min(1, { message: 'المهارة مطلوبة' }),
        certificate: z.string().min(1, { message: 'اسم الشهادة مطلوب' }),
        file: z
          .any()
          .optional()
          .refine(
            (file) =>
              !file || (file instanceof File && file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)),
            { message: 'يجب أن يكون الملف صورة (JPEG/PNG) أو PDF بحجم أقل من 5 ميجابايت' }
          ),
        organisation: z.string().min(1, { message: 'الجهة المانحة مطلوبة' }),
        certificateDate: z.string().min(1, { message: 'تاريخ الشهادة مطلوب' }),
      })
    )
    .min(1, { message: 'يجب إضافة شهادة واحدة على الأقل' }),
});

export const stepFourSchema = z.object({
  interests: z
    .array(
      z.object({
        field: z.string().min(1, { message: 'المجال مطلوب' }),
        yearCategory: z.string().min(1, { message: 'الفئة العمرية مطلوبة' }),
        connect: z.string().min(1, { message: 'طريقة التواصل مطلوبة' }),
        timeNum: z.string().min(1, { message: 'عدد الساعات مطلوب' }),
        lang: z.string().min(1, { message: 'اللغة مطلوبة' }),
      })
    )
    .min(1, { message: 'يجب إضافة اهتمام واحد على الأقل' }),
});

export const stepFiveSchema = z.object({
  hasExams: z.enum(['yes', 'no'], { message: 'يرجى اختيار نعم أو لا' }),
  exams: z.array(
    z.object({
      examName: z.string().min(1, { message: 'اسم الامتحان مطلوب' }),
      rate: z.string().min(1, { message: 'التقييم مطلوب' }),
      givingOrg: z.string().min(1, { message: 'الجهة المانحة مطلوبة' }),
      examCertificates: z.string().optional(),
      certificateFile: z
        .any()
        .optional()
        .refine(
          (file) =>
            !file || (file instanceof File && file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)),
          { message: 'يجب أن يكون الملف صورة (JPEG/PNG) أو PDF بحجم أقل من 5 ميجابايت' }
        ),
      examMonth: z.string().min(1, { message: 'شهر الامتحان مطلوب' }),
      examYear: z.string().min(1, { message: 'سنة الامتحان مطلوبة' }),
    })
  ).optional(),
}).refine(
  (data) => data.hasExams === 'no' || (data.exams && data.exams.length > 0),
  { message: 'يجب إضافة امتحان واحد على الأقل إذا اخترت نعم', path: ['exams'] }
);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type StepFourData = z.infer<typeof stepFourSchema>;
export type StepFiveData = z.infer<typeof stepFiveSchema>;

export interface FormData {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  stepFour: StepFourData;
  stepFive: StepFiveData;
}