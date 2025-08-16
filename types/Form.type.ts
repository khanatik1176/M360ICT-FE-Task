import { OnboardingForm } from "@/schema/OnboardingSchema";
import { UseFormReturn } from "react-hook-form";

export type PersonalInfoStepProps = {
  form: UseFormReturn<OnboardingForm>;
}

export type JobDetailsStepProps = {
  form: UseFormReturn<OnboardingForm>;
}

export type SkillsPreferencesStepProps = {
  form: UseFormReturn<OnboardingForm>;
}

export type EmergencyContactStepProps = {
  form: UseFormReturn<OnboardingForm>;
}

export type ReviewStepProps = {
  formData: OnboardingForm;
  form: UseFormReturn<OnboardingForm>;
}