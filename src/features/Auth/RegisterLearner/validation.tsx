export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isStrongPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    return passwordRegex.test(password);
  };
  
  export const hasEmptyFields = (data: Record<string, any>, requiredFields: string[]): boolean => {
    return requiredFields.some((field) => !data[field]?.toString().trim());
  };
  
