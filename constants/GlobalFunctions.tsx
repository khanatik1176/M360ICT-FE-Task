import { OnboardingForm } from '@/schema/OnboardingSchema';

export const getFieldsForStep = (
  step: number,
  age: number | null
): Array<keyof OnboardingForm> => {
  switch (step) {
    case 1:
      return ['personalInfo'];
    case 2:
      return ['jobDetails'];
    case 3:
      return ['skillsPreferences'];
    case 4:
      return age !== null && age < 21 ? ['emergencyContact'] : [];
    case 5:
      return [];
    default:
      return [];
  }
};

export const calculateAge = (dob: Date | string | null) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
