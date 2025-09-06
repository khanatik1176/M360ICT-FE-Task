'use client';
import React, { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { departments, jobTypes } from '@/schema/OnboardingSchema';
import { JobDetailsStepProps } from '@/types/Form.type';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockManagers } from '@/constants/GlobalData';
import { Controller } from 'react-hook-form';

export default function JobDetailsStep({ form }: JobDetailsStepProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    control,
  } = form;
  const jobType = watch('jobDetails.jobType');
  const department = watch('jobDetails.department');

  const [managerSearch, setManagerSearch] = useState('');

  const filteredManagers = useMemo(() => {
    if (!department) return [];
    return mockManagers
      .filter((m) => m.department === department)
      .filter((m) =>
        m.name.toLowerCase().includes(managerSearch.trim().toLowerCase())
      );
  }, [department, managerSearch]);

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Job Details</h2>

      <div className='relative'>
        <Label htmlFor='department'>Department</Label>
        <Select
          onValueChange={(value) =>
            setValue(
              'jobDetails.department',
              value as (typeof departments)[number],
              { shouldValidate: true, shouldDirty: true }
            )
          }
          value={watch('jobDetails.department')}
        >
          <SelectTrigger
            className={`mt-2 ${errors.jobDetails?.department ? 'border-red-500' : ''}`}
          >
            <SelectValue placeholder='Select department' />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.jobDetails?.department && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.department.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='positionTitle'>Position Title</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Input
          id='positionTitle'
          placeholder='Senior Developer'
          {...register('jobDetails.positionTitle')}
          className={`mt-2 ${errors.jobDetails?.positionTitle ? 'border-red-500' : ''}`}
        />
        {errors.jobDetails?.positionTitle && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.positionTitle.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='startDate'>Start Date</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Controller
          name='jobDetails.startDate'
          control={control}
          render={({ field }) => {
            const value = field.value
              ? field.value instanceof Date
                ? field.value
                : new Date(field.value)
              : null;
            return (
              <Input
                id='startDate'
                type='date'
                value={
                  value && !isNaN(value.getTime())
                    ? value.toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) => {
                  const v = e.target.value;
                  field.onChange(v ? new Date(v) : null);
                }}
                className={`mt-2 ${errors.jobDetails?.startDate ? 'border-red-500' : ''}`}
              />
            );
          }}
        />
        {errors.jobDetails?.startDate && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.startDate.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label>Job Type</Label>
        <div className='mt-2'>
          <RadioGroup
            value={watch('jobDetails.jobType')}
            onValueChange={(value) =>
              setValue(
                'jobDetails.jobType',
                value as (typeof jobTypes)[number],
                { shouldValidate: true, shouldDirty: true }
              )
            }
            className='flex space-x-4'
          >
            {jobTypes.map((type) => (
              <div key={type} className='flex items-center space-x-2'>
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className='font-normal'>
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        {errors.jobDetails?.jobType && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.jobType.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='salaryExpectation'>
          {jobType === 'Contract' ? (
            <>
              Hourly Rate ($50-$150) <span className='text-destructive'>*</span>
            </>
          ) : (
            <>
              Annual Salary ($30,000-$200,000){' '}
              <span className='text-destructive'>*</span>
            </>
          )}
        </Label>
        <Input
          id='salaryExpectation'
          type='number'
          {...register('jobDetails.salaryExpectation', {
            setValueAs: (value) => (value ? Number(value) : null),
          })}
          className={`mt-2 ${errors.jobDetails?.salaryExpectation ? 'border-red-500' : ''}`}
          placeholder={jobType === 'Contract' ? '50' : '30000'}
        />
        {errors.jobDetails?.salaryExpectation && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.salaryExpectation.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='manager'>Manager</Label>
          <span className='text-destructive'>*</span>
        </div>

        <Select
          onValueChange={(value) => {
            setValue('jobDetails.manager', value as string, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          value={watch('jobDetails.manager')}
        >
          <SelectTrigger
            className={`mt-2 ${errors.jobDetails?.manager ? 'border-red-500' : ''}`}
          >
            <SelectValue
              placeholder={
                department ? 'Select manager' : 'Select department first'
              }
            />
          </SelectTrigger>

          <SelectContent>
            <div className='p-2'>
              <input
                type='search'
                value={managerSearch}
                onChange={(e) => setManagerSearch(e.target.value)}
                placeholder='Search manager...'
                className='w-full rounded-md border px-2 py-1 text-sm'
              />
            </div>

            {department ? (
              filteredManagers.length > 0 ? (
                filteredManagers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                    <div className='text-muted-foreground text-xs'>{m.id}</div>
                  </SelectItem>
                ))
              ) : (
                <div className='text-muted-foreground px-3 py-2 text-sm'>
                  No managers found
                </div>
              )
            ) : (
              <div className='text-muted-foreground px-3 py-2 text-sm'>
                Please select a department first
              </div>
            )}
          </SelectContent>
        </Select>

        {errors.jobDetails?.manager && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.jobDetails.manager.message}
          </span>
        )}
      </div>

      {watch('skillsPreferences.remoteWorkPreference', 0) > 50 && (
        <div className='relative'>
          <Label htmlFor='managerApproval'>
            Manager Approval for Remote Work
          </Label>
          <Input
            id='managerApproval'
            type='checkbox'
            {...register('jobDetails.managerApproval')}
            className={`mt-2 h-5 w-5 ${errors.jobDetails?.managerApproval ? 'border-red-500' : ''}`}
          />
          {errors.jobDetails?.managerApproval && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {errors.jobDetails.managerApproval.message}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
