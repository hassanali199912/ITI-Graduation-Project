export default interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    //birthDate:string;
    //nationalityId: string;
    gender: number;
    residenceCountryId: string;
    profilePictureUrl: string;
    bio: string;
    github: string;
    connectProgramming: boolean;
    levelId: string;
    graduationStatusId: string;
    specialistId: string;
    experiences: { id: string }[];
    skills: { skillId: string }[];
    learningInterests: { learningInterestId: string }[];
  }
  