import { OnboardingForm } from "@/schema/OnboardingSchema";

  export const getFieldsForStep = (step: number): Array<keyof OnboardingForm> => {
    switch (step) {
      case 1:
        return ['personalInfo'];
      case 2:
        return ['jobDetails'];
      case 3:
        return ['skillsPreferences'];
      case 4:
        return ['emergencyContact'];
      case 5:
        return [];
      default:
        return [];
    }
  };