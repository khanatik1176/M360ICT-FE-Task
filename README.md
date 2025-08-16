# Employee Onboarding Form ( M360ICT Task)

This project is a multi-step **employee onboarding form** built with **Next JS, TypeScript, Tailwind CSS, React Form Hook, zod, Shadcn and Tailwind CSS**.  
The form includes step-by-step navigation, validation, and a final review step before submission.  


## Getting Started

First, install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Explanation of Complex Logic

### Step Navigation and Validation:
 - The form is divided into multiple steps, each corresponding to a specific section of the onboarding process.
 - Navigation between steps is handled using the currentStep state.
 - Validation is performed using react-hook-form and zod. Each step validates only the fields relevant to that step using the trigger function.

Challenge: Ensuring that validation errors are displayed only for the current step.

Solution: A helper function getFieldsForStep dynamically determines which fields to validate based on the current step.

### Review Step and Confirmation Checkbox
 - The final step (ReviewStep) displays a summary of all the entered data and includes a confirmation checkbox.
 - The checkbox is validated only during form submission to prevent premature validation when navigating to the review step.

Challenge: Preventing the checkbox from being triggered or validated during navigation.

Solution: Excluded the confirmation field from validation during navigation and validated it explicitly during submission.

### Error Handling and User Feedback
 - Validation errors are displayed using a toast notification system (use-toast hook).
 - Errors are dynamically mapped to user-friendly messages for better UX. 

Challenge: Providing clear feedback for validation errors across multiple steps.

Solution: Collected errors for the current step and displayed the first error message using a toast.

### Unsaved Changes Warning
 - A beforeunload event listener warns users about unsaved changes when they attempt to leave the page. 

Challenge: Ensuring the warning is displayed only when there are unsaved changes.

Solution: Used the isDirty state from react-hook-form to track changes and conditionally attach the event listener.

## Assumptions Made

- **Default Values:** Default values for the form fields are provided in the useForm configuration. For example, dateOfBirth defaults to the current date, and jobType defaults to "Full-time".
- **Validation Rules:** Validation rules are defined in the onboardingFormSchema using zod. It is assumed that these rules cover all necessary constraints for the form fields.

## Features

- Multi-step form with dynamic validation
- Review step with a summary of entered data
- Toast notifications for validation errors and submission status
- Unsaved changes warning
- Responsive design using Tailwind CSS

## Technologies Used

- **Framework:** Next.js
- **Forms & Validation:** React Hook Form
- **UI Components:** ShadCn UI
