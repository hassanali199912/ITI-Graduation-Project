import { isValidEmail, isStrongPassword } from "./validation";

export const validateStep = (step: number, data: Record<string, any>): string | null => {
  switch (step) {
    case 1:
      if (
        !data.firstName || !data.lastName || !data.email ||
        !data.password || !data.confirmPassword ||
        !data.birthDate || !data.gender || !data.country || !data.nationality
      ) {
        return "يرجى ملء جميع الحقول المطلوبة";
      }
      if (!isValidEmail(data.email)) {
        return "يرجى إدخال بريد إلكتروني صالح";
      }
      if (!isStrongPassword(data.password)) {
        return "كلمة المرور يجب أن تحتوي على 8 حروف على الأقل وتشمل رقمًا ورمزًا";
      }
      if (data.password !== data.confirmPassword) {
        return "كلمة المرور وتأكيدها غير متطابقتين";
      }
      break;

    case 2:
      if (!data.educationLevel || !data.specialization) {
        return "يرجى تحديد المستوى الدراسي والتخصص";
      }
      if (!data.relatedToProgramming) {
        return "يرجى تحديد إذا كان مجالك متعلق بالبرمجة";
      }
      break;

    case 3:
      if (!data.level) {
        return "يرجى تحديد مستواك";
      }
      if (!data.skills || data.skills.length === 0) {
        return "يرجى اختيار مهارة واحدة على الأقل";
      }
      if (!data.interest || data.interest.length === 0) {
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
