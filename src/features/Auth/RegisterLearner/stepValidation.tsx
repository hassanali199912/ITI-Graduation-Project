import { isValidEmail, isStrongPassword } from "./validation";

/**
 * دالة التحقق من خطوات التسجيل.
 * @param step - رقم الخطوة الحالية
 * @param data - بيانات النموذج
 * @param genders - قائمة الأنواع (ذكر/أنثى) للتحقق من صحة اختيار النوع
 * @returns رسالة خطأ في حال وجود خطأ أو null إذا كانت جميع البيانات صحيحة
 */
export const validateStep = (
  step: number,
  data: Record<string, any>,
  genders: { id: number; name: string }[]
): string | null => {
  switch (step) {
    case 1:
      // التحقق من الحقول المطلوبة في الخطوة الأولى
      if (
        !data.firstName || 
        !data.lastName || 
        !data.email ||
        !data.password || 
        !data.confirmPassword
      ) {
        return "يرجى ملء جميع الحقول المطلوبة";
      }

      // التحقق من اختيار النوع
      const genderValid = genders.some(g => g.id === data.gender);
      if (!genderValid) return "من فضلك اختر النوع";

      // التحقق من البريد الإلكتروني
      if (!isValidEmail(data.email)) {
        return "يرجى إدخال بريد إلكتروني صالح";
      }

      // التحقق من قوة كلمة المرور
      if (!isStrongPassword(data.password)) {
        return "كلمة المرور يجب أن تحتوي على 8 حروف على الأقل وتشمل رقمًا ورمزًا";
      }

      // التحقق من تطابق كلمة المرور مع التأكيد
      if (data.password !== data.confirmPassword) {
        return "كلمة المرور وتأكيدها غير متطابقتين";
      }
      break;

    case 2:
      // تحقق الخطوة الثانية: التخصص ومستوى الدراسة
      if (!data.specialistId) {
        return "يرجى تحديد المستوى الدراسي والتخصص";
      }
      if (data.connectProgramming === null) {
        return "يرجى تحديد إذا كان مجالك متعلق بالبرمجة";
      }
      break;

    case 3:
      // تحقق الخطوة الثالثة: المستوى والمهارات والاهتمامات
      if (!data.levelId) {
        return "يرجى تحديد مستواك";
      }
      if (!data.skills || data.skills.length === 0) {
        return "يرجى اختيار مهارة واحدة على الأقل";
      }
      if (!data.learningInterests || data.learningInterests.length === 0) {
        return "يرجى اختيار اهتمام واحد على الأقل";
      }
      break;

    case 4:
      // النبذة اختيارية، لكن لو عايزاها إجبارية:
      // if (!data.about) return "يرجى كتابة نبذة عنك.";
      break;

    default:
      return null;
  }

  return null; 
};

