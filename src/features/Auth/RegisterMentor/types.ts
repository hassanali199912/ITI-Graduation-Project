import { z } from "zod";

export const stepOneSchema = z
  .object({
    firstName: z.string().min(1, { message: "الإسم الأول مطلوب" }),
    lastName: z.string().min(1, { message: "الإسم الثانى مطلوب" }),
    skills: z.array(z.string().uuid()).optional(),
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
    gender: z.number().int().min(0).max(1, { message: "النوع مطلوب" }),
    salary: z.number().int({ message: "السعر مطلوب" }),
    bio: z.string().min(1, { message: "السيرة الذاتية مطلوبة" }),
    lang: z.string().refine((val) => ["Arabic", "English"].includes(val), {
      message: "يرجى اختيار اللغة",
    }),
    profilePictureUrl: z
      .union([z.string().url(), z.instanceof(File)])
      .optional(),
    countryId: z.string().uuid({ message: "البلد مطلوب" }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password2"],
  });

export const stepTwoSchema = z.object({
  educations: z.array(
    z.object({
      institution: z.string().min(1, "المؤسسة مطلوبة"),
      degree: z.string().min(1, "الدرجة العلمية مطلوبة"),
      field: z.string().min(1, "التخصص مطلوب"),
      startDate: z.string(), // أو z.date().transform(String)
      endDate: z.string(), // أو z.date().transform(String)
      description: z.string(),
    })
  ),
});
const fileSchema = z
  .instanceof(File)
  .refine(
    (f) =>
      f.size <= 5 * 1024 * 1024 &&
      ["image/jpeg", "image/png", "application/pdf"].includes(f.type),
    {
      message:
        "يجب أن يكون الملف صورة (JPEG/PNG) أو PDF بحجم أقل من 10 ميجابايت",
    }
  );
export const stepThreeSchema = z.object({
  certificates: z
    .array(
      z.object({
        name: z.string().min(1, { message: "اسم الشهادة مطلوب" }),
        certificateUrl: z
          .object({
            file: fileSchema,
            url: z.string().url(),
          })
          .optional(),
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
  additionalInterests: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});
// types.ts
// ----------

// مهارة واحدة
export interface Skill {
  skillId: string;
  skillName: string;
}

// التخصص (Teaching Area)
export interface Specialist {
  teachingAreaId: string;
  nameAr: string;
  nameEn: string;
}

// بيانات التقييم
export interface RatingSummary {
  averageRating: number;
  totalComments: number;
}
export type Session = {
  studentId: string;
  studentName: string;
  teacherId: string;
  pointsAmount: number;
  subject: string;
  description: string;
  estimatedDurationMinutes: number;
  requestedDateTime: string;
  status: number;
  acceptedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
};
// الكيان الأساسي: Teacher / Mentor
export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePictureUrl?: string; // اختياري
  salary: number;
  skills: Skill[];
  specialists: Specialist[];
  rating: RatingSummary;
  stutas: number;
  comments: [];
  // لو الـ backend هيصلحها لـ status غيّر الاسم هنا
}

// شكل الـ Response الكامل للـ API
export interface GetTeachersResponse {
  status: boolean;
  massage: string; // برضه دي typo من API، خليها كما هي أو اعمل alias
  statusCode: number;

  data: {
    teachers: Teacher[];
    totalCount: number;
    totalPages: number;
    PageSize: number;
    pageNumber: number;
    hasPreviousPage: Boolean;
    hasNextPage: Boolean;
  };
}

// ========== أمثلة تانية لو محتاجها ==========
// لو عندك Page Filters
export interface GetTeachersArgs {
  pageNumber?: number;
  pageSize?: number;
  orderByRating?: boolean;
  search?: string;
}

// Step 5 validation schema
export const stepFiveSchema = z
  .object({
    hasExams: z.enum(["yes", "no"], {
      required_error: "يرجى اختيار هل اجتزت اختبارات",
    }),
    exams: z
      .array(
        z.object({
          examName: z.string().min(1, { message: "اسم الامتحان مطلوب" }),
          rate: z.string().min(1, { message: "التقييم مطلوب" }),
          givingOrg: z.string().min(1, { message: "الجهة المانحة مطلوبة" }),
          examCertificates: z.string().optional(),
          certificateFile: z.any().optional(),
          examMonth: z.string().min(1, { message: "الشهر مطلوب" }),
          examYear: z.string().min(1, { message: "السنة مطلوبة" }),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasExams === "yes") {
      if (!data.exams || data.exams.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "يجب إضافة امتحان واحد على الأقل",
          path: ["exams"],
        });
      }
    }
  });

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
