import EmployeeOnboardingForm from "@/components/EmployeeOnBoardingForm";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Employee Onboarding
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please fill out the form below to complete the onboarding process.
        </p>
        <EmployeeOnboardingForm />
      </div>
    </div>
  );
}