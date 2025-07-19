export default interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: number | null;
    residenceCountryId: string;
    profilePictureUrl: string;
    bio: string;
    github: string;
    connectProgramming: boolean | null;
    levelId: string;
    graduationStatusId: string;
    specialistId: string;
    experiences: { id: string }[];
    skills: { skillId: string }[];
    learningInterests: { learningInterestId: string }[];
  }
  