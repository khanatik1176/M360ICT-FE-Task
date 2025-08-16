'use client';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { ReviewStepProps } from '@/types/Form.type';
import { Controller } from 'react-hook-form';

export default function ReviewStep({ formData, form }: ReviewStepProps) {
  const {
    formState: { errors, touchedFields, isSubmitted },
    control,
  } = form;

  const salary = formData.jobDetails?.salaryExpectation;
  const jobType = formData.jobDetails?.jobType;

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Review Your Information</h2>

      <div className='space-y-6'>
        <section className='space-y-4'>
          <h3 className='border-b pb-2 text-lg font-semibold'>
            Personal Information
          </h3>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Full Name</Label>
              <p className='font-medium'>{formData.personalInfo.fullName}</p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Email</Label>
              <p className='font-medium'>{formData.personalInfo.email}</p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Phone Number</Label>
              <p className='font-medium'>{formData.personalInfo.phoneNumber}</p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Date of Birth</Label>
              <p className='font-medium'>
                {formData.personalInfo.dateOfBirth
                  ? new Date(
                      formData.personalInfo.dateOfBirth
                    ).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h3 className='border-b pb-2 text-lg font-semibold'>Job Details</h3>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Department</Label>
              <p className='font-medium'>{formData.jobDetails.department}</p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Position</Label>
              <p className='font-medium'>{formData.jobDetails.positionTitle}</p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Start Date</Label>
              <p className='font-medium'>
                {formData.jobDetails.startDate
                  ? new Date(formData.jobDetails.startDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Job Type</Label>
              <p className='font-medium'>{jobType}</p>
            </div>

            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>
                {jobType === 'Contract' ? 'Hourly Rate' : 'Annual Salary'}
              </Label>
              <p className='font-medium'>
                {typeof salary === 'number'
                  ? `$${salary.toLocaleString()}${jobType === 'Contract' ? '/hour' : '/year'}`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h3 className='border-b pb-2 text-lg font-semibold'>
            Skills & Preferences
          </h3>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Primary Skills</Label>
              <ul className='mt-2 space-y-1'>
                {formData.skillsPreferences.primarySkills.map((skill) => (
                  <li key={skill.skill} className='font-medium'>
                    {skill.skill}{' '}
                    <span className='text-gray-500'>
                      ({skill.experience}{' '}
                      {skill.experience === 1 ? 'year' : 'years'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Working Hours</Label>
              <p className='font-medium'>
                {formData.skillsPreferences.workingHours.start} -{' '}
                {formData.skillsPreferences.workingHours.end}
              </p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>
                Remote Work Preference
              </Label>
              <p className='font-medium'>
                {formData.skillsPreferences.remoteWorkPreference}%
              </p>
            </div>
            {formData.skillsPreferences.extraNotes && (
              <div className='col-span-2 space-y-1'>
                <Label className='text-sm text-gray-500'>
                  Additional Notes
                </Label>
                <p className='font-medium'>
                  {formData.skillsPreferences.extraNotes}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className='space-y-4'>
          <h3 className='border-b pb-2 text-lg font-semibold'>
            Emergency Contact
          </h3>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Contact Name</Label>
              <p className='font-medium'>
                {formData.emergencyContact.contactName}
              </p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Relationship</Label>
              <p className='font-medium'>
                {formData.emergencyContact.relationship}
              </p>
            </div>
            <div className='space-y-1'>
              <Label className='text-sm text-gray-500'>Phone Number</Label>
              <p className='font-medium'>
                {formData.emergencyContact.phoneNumber}
              </p>
            </div>
            {formData.emergencyContact.guardianContact && (
              <>
                <div className='space-y-1'>
                  <Label className='text-sm text-gray-500'>Guardian Name</Label>
                  <p className='font-medium'>
                    {formData.emergencyContact.guardianContact.name}
                  </p>
                </div>
                <div className='space-y-1'>
                  <Label className='text-sm text-gray-500'>
                    Guardian Phone
                  </Label>
                  <p className='font-medium'>
                    {formData.emergencyContact.guardianContact.phone}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <div className='relative mt-8 border-t pt-4'>
        <div className='flex items-center space-x-3'>
          <Controller
            control={control}
            name='confirmation'
            render={({ field }) => (
              <Checkbox
                id='confirmation'
                type='button'
                checked={!!field.value}
                onCheckedChange={(val) => field.onChange(Boolean(val))}
                className={
                  errors.confirmation &&
                  (isSubmitted || touchedFields?.confirmation)
                    ? 'border-red-500 text-white'
                    : 'text-white'
                }
              />
            )}
          />

          <div className='space-y-1'>
            <Label htmlFor='confirmation' className='font-medium'>
              I confirm that all the information provided is correct and
              complete
            </Label>
          </div>
        </div>
        {errors.confirmation &&
          (isSubmitted || touchedFields?.confirmation) && (
            <p className='absolute text-xs text-red-500'>
              {errors.confirmation.message}
            </p>
          )}
      </div>
    </div>
  );
}
