'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  onboardingFormSchema,
  type OnboardingForm,
} from '@/schema/OnboardingSchema';

import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getFieldsForStep } from '@/constants/GlobalFunctions';
import PersonalInfoStep from './steps/PersonalInfoStep';
import JobDetailsStep from './steps/JobDetailsStep';
import SkillsPreferencesStep from './steps/SkillsPreferencesStep';
import EmergencyContactStep from './steps/EmergencyContactStep';
import ReviewStep from './steps/ReviewStep';
import { Progress } from '@radix-ui/react-progress';
import { Button } from '../ui/button';

const TOTAL_STEPS = 5;

export default function EmployeeOnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
      },
      jobDetails: {
        department: 'Engineering',
        positionTitle: '',
        startDate: new Date(),
        jobType: 'Full-time',
        salaryExpectation: undefined as unknown as number | undefined,
        manager: '',
      },
      skillsPreferences: {
        primarySkills: [],
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        remoteWorkPreference: 0,
        extraNotes: '',
      },
      emergencyContact: {
        contactName: '',
        relationship: 'Other',
        phoneNumber: '',
      },
      confirmation: false,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    trigger,
    watch,
    reset,
  } = form;

  const formValues = watch();

  

  const onSubmit = async (data: OnboardingForm) => {
  const isConfirmationValid = await trigger('confirmation');
  if (!isConfirmationValid) {
    toast({
      title: 'Validation Error',
      description: 'Please confirm that the information is correct.',
      variant: 'destructive',
    });
    return;
  }

  setIsSubmitting(true);
  console.log('Submitting form data:', data);
  try {

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);

    toast({
      title: 'Success!',
      description: 'Employee onboarding form submitted successfully.',
      variant: 'default',
    });

    reset();
    setCurrentStep(1);
  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: 'Error',
      description:
        'There was an error submitting the form. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleNext = async () => {
  if (currentStep >= TOTAL_STEPS) return;

  const currentFields = getFieldsForStep(currentStep);
  const isStepValid = await trigger(currentFields);

  console.log('Validating step', currentStep, 'Fields:', currentFields, 'Is valid:', isStepValid);

  if (isStepValid) {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  } else {
    const currentErrors = currentFields
      .map((field) => errors[field]?.message)
      .filter(Boolean);

    toast({
      title: 'Validation Error',
      description:
        currentErrors[0] || 'Please fill in all required fields correctly.',
      variant: 'destructive',
    });
  }
};

  const handleBack = () => {
  if (currentStep === TOTAL_STEPS) {
    form.setValue('confirmation', false);
  }
  setCurrentStep((prev) => Math.max(prev - 1, 1));
};

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <JobDetailsStep form={form} />;
      case 3:
        return <SkillsPreferencesStep form={form} />;
      case 4:
        return <EmergencyContactStep form={form} />;
      case 5:
        return <ReviewStep formData={formValues} form={form} />;
      default:
        return null;
    }
  };

  const onFormError = (errs: any) => {
    const firstKey = Object.keys(errs || {})[0];
    const firstError = firstKey ? (errs as any)[firstKey] : null;
    const message =
      firstError?.message ||
      (firstError && typeof firstError === 'object'
        ? JSON.stringify(firstError)
        : 'Please fix the highlighted fields.');
    toast({
      title: 'Validation Error',
      description: message,
      variant: 'destructive',
    });
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && currentStep < TOTAL_STEPS) {
      e.preventDefault();
    }
  };

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <div className='rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900'>
        <div className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <h1 className='text-lg font-semibold'>Employee Onboarding</h1>
            <div className='text-sm text-gray-500'>
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>
          <Progress
            value={(currentStep / TOTAL_STEPS) * 100}
            className='mb-2 h-2 rounded-full'
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onFormError)}
          onKeyDown={handleFormKeyDown}
          className='space-y-8'
        >
          {renderStep()}

          <div className='mt-6 flex items-center justify-between border-t pt-4'>
            {currentStep > 1 && (
              <Button
                type='button'
                variant='outline'
                onClick={handleBack}
                className='w-28'
              >
                Back
              </Button>
            )}

            <div className='ml-auto flex items-center space-x-3'>
              {currentStep < TOTAL_STEPS ? (
                <Button type='button' onClick={handleNext} className='w-28'>
                  Next
                </Button>
              ) : (
                <Button type='submit' disabled={isSubmitting} className='w-28'>
                  {isSubmitting ? (
                    <div className='flex items-center'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
