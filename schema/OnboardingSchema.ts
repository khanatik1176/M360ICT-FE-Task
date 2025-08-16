import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/GlobalData';
import { z } from 'zod';


export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
] as const;
export const jobTypes = ['Full-time', 'Part-time', 'Contract'] as const;
export const relationships = [
  'Parent',
  'Spouse',
  'Sibling',
  'Friend',
  'Other',
] as const;

const calculateAge = (birthDate: Date) => {
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

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .refine((name) => name.trim().split(/\s+/).length >= 2, {
      message: 'Please enter at least first and last name',
    }),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
      message: 'Phone number must be in format: +1-123-456-7890',
    }),
  dateOfBirth: z.date().refine((date) => calculateAge(date) >= 18, {
    message: 'You must be at least 18 years old',
  }),
  profilePicture: z
    .any()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, {
      message: `Maximum file size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: 'Only .jpg, .jpeg, and .png formats are supported',
    })
    .optional(),
});

export const jobDetailsSchema = z
  .object({
    department: z.enum(departments, {
      required_error: 'Please select a department',
    }),
    positionTitle: z
      .string()
      .min(3, 'Position title must be at least 3 characters'),
    startDate: z
      .date()
      .refine((date) => date >= new Date(), {
        message: 'Start date cannot be in the past',
      })
      .refine(
        (date) => {
          const maxDate = new Date();
          maxDate.setDate(maxDate.getDate() + 90);
          return date <= maxDate;
        },
        {
          message: 'Start date cannot be more than 90 days in the future',
        }
      ),
    jobType: z.enum(jobTypes, {
      required_error: 'Please select a job type',
    }),
    salaryExpectation: z.number().min(1, 'Salary is required'),
    manager: z.string().min(1, 'Manager is required'),
    managerApproval: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.department === 'HR' || data.department === 'Finance') {
      const startDate = data.startDate;
      if (startDate instanceof Date) {
        const day = startDate.getDay();
        if (day === 5 || day === 6) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['startDate'],
            message:
              'HR and Finance start dates cannot be on a weekend (Friday or Saturday)',
          });
        }
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          expected: 'date',
          received: typeof startDate,
          path: ['startDate'],
          message: 'Invalid start date',
        });
      }
    }
  });

export const skillsPreferencesSchema = z.object({
  primarySkills: z
    .array(
      z.object({
        skill: z.string().min(1, 'Skill name is required'),
        experience: z
          .number()
          .min(0, 'Experience cannot be negative')
          .max(50, 'Experience seems too high'),
      })
    )
    .min(3, 'Please select at least 3 skills'),
  workingHours: z
    .object({
      start: z
        .string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
      end: z
        .string()
        .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    })
    .refine(
      (hours) => {
        const [startHour] = hours.start.split(':').map(Number);
        const [endHour] = hours.end.split(':').map(Number);
        return endHour > startHour;
      },
      {
        message: 'End time must be after start time',
      }
    ),
  remoteWorkPreference: z
    .number()
    .min(0, 'Minimum is 0%')
    .max(100, 'Maximum is 100%'),
  extraNotes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional(),
});

export const emergencyContactSchema = z.object({
  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .refine((name) => name.trim().split(/\s+/).length >= 2, {
      message: 'Please enter full name',
    }),
  relationship: z.enum(relationships, {
    required_error: 'Please select a relationship',
  }),
  phoneNumber: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
    message: 'Phone number must be in format: +1-123-456-7890',
  }),
  guardianContact: z
    .object({
      name: z.string().min(1, 'Guardian name is required'),
      phone: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, {
        message: 'Phone number must be in format: +1-123-456-7890',
      }),
    })
    .optional(),
});

export const onboardingFormSchema = z.object({
  personalInfo: personalInfoSchema,
  jobDetails: jobDetailsSchema,
  skillsPreferences: skillsPreferencesSchema,
  emergencyContact: emergencyContactSchema,
  confirmation: z.boolean().refine((val) => val === true, {
    message: 'You must confirm that the information is correct',
  }),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type JobDetails = z.infer<typeof jobDetailsSchema>;
export type SkillsPreferences = z.infer<typeof skillsPreferencesSchema>;
export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
export type OnboardingForm = z.infer<typeof onboardingFormSchema>;
