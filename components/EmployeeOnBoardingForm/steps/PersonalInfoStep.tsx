'use client';
import React, { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PersonalInfoStepProps } from '@/types/Form.type';
import { Controller } from 'react-hook-form';

export default function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form as UseFormReturn<any>;

  const profilePicture = watch('personalInfo.profilePicture');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let reader: FileReader | null = null;

    if (
      profilePicture &&
      typeof profilePicture === 'object' &&
      profilePicture instanceof File
    ) {
      reader = new FileReader();
      reader.onload = () => setPreviewDataUrl(String(reader?.result ?? null));
      reader.onerror = () => setPreviewDataUrl(null);
      reader.readAsDataURL(profilePicture);

      return () => {
        if (reader) {
          reader.onload = null;
          reader.onerror = null;
        }
      };
    }

    if (profilePicture && typeof profilePicture === 'string') {
      setPreviewDataUrl(profilePicture);
      return () => setPreviewDataUrl(null);
    }

    setPreviewDataUrl(null);
  }, [profilePicture]);

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Personal Information</h2>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='fullName'>Full Name</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Input
          id='fullName'
          placeholder='John Doe'
          {...register('personalInfo.fullName')}
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'fullName' in errors.personalInfo && errors.personalInfo.fullName ? 'border-red-500' : ''}`}
        />
        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'fullName' in errors.personalInfo &&
          errors.personalInfo.fullName && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {typeof (errors.personalInfo as any).fullName?.message ===
              'string'
                ? ((errors.personalInfo as any).fullName.message as string)
                : null}
            </span>
          )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='email'>Email</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Input
          id='email'
          type='email'
          placeholder='john.doe@example.com'
          {...register('personalInfo.email')}
          className={`mt-2 ${
            errors.personalInfo &&
            typeof errors.personalInfo === 'object' &&
            'email' in errors.personalInfo &&
            errors.personalInfo.email
              ? 'border-red-500'
              : ''
          }`}
        />
        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'email' in errors.personalInfo &&
          errors.personalInfo.email && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {typeof (errors.personalInfo as any).email?.message === 'string'
                ? ((errors.personalInfo as any).email.message as string)
                : null}
            </span>
          )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='phoneNumber'>Phone Number</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Input
          id='phoneNumber'
          placeholder='+1-123-456-7890'
          {...register('personalInfo.phoneNumber')}
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'phoneNumber' in errors.personalInfo && errors.personalInfo.phoneNumber ? 'border-red-500' : ''}`}
        />
        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'phoneNumber' in errors.personalInfo &&
          errors.personalInfo.phoneNumber && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {typeof (errors.personalInfo as any).phoneNumber?.message ===
              'string'
                ? ((errors.personalInfo as any).phoneNumber.message as string)
                : null}
            </span>
          )}
      </div>

      <div className='relative'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <span className='text-destructive'>*</span>
        </div>
        <Controller
          name='personalInfo.dateOfBirth'
          control={control}
          render={({ field }) => {
            const value = field.value
              ? field.value instanceof Date
                ? field.value
                : new Date(field.value)
              : null;

            return (
              <Input
                id='dateOfBirth'
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
                className={`mt-2 ${
                  errors.personalInfo &&
                  typeof errors.personalInfo === 'object' &&
                  'dateOfBirth' in errors.personalInfo &&
                  errors.personalInfo.dateOfBirth
                    ? 'border-red-500'
                    : ''
                }`}
              />
            );
          }}
        />
        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'dateOfBirth' in errors.personalInfo &&
          errors.personalInfo.dateOfBirth && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {typeof (errors.personalInfo as any).dateOfBirth?.message ===
              'string'
                ? ((errors.personalInfo as any).dateOfBirth.message as string)
                : null}
            </span>
          )}
      </div>

      <div className='relative'>
        <Label htmlFor='profilePicture'>Profile Picture</Label>

        <Controller
          name='personalInfo.profilePicture'
          control={control}
          render={({ field }) => {
            const rawVal = field.value;
            const displayName =
              rawVal instanceof File
                ? rawVal.name
                : typeof rawVal === 'string' && rawVal
                  ? rawVal.split(/[/\\]/).pop()
                  : '';

            return (
              <div className='relative mt-2'>
                {/* Actual file input (invisible but clickable) */}
                <Input
                  id='profilePicture'
                  type='file'
                  accept='.jpg,.jpeg,.png'
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    field.onChange(file);
                  }}
                  className='absolute inset-0 z-10 cursor-pointer opacity-0'
                />

                {/* Styled visible field showing filename */}
                <div
                  className={`border-input bg-background flex h-10 w-full items-center justify-between overflow-hidden rounded-md border px-3 py-2 text-sm ${
                    errors.personalInfo &&
                    typeof errors.personalInfo === 'object' &&
                    'profilePicture' in errors.personalInfo &&
                    errors.personalInfo.profilePicture
                      ? 'border-red-500'
                      : ''
                  }`}
                >
                  <span
                    className={`truncate ${displayName ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {displayName || 'Choose an image...'}
                  </span>
                  <span className='ml-3 shrink-0 text-xs text-primary'>
                    Browse
                  </span>
                </div>

                {errors.personalInfo &&
                  typeof errors.personalInfo === 'object' &&
                  'profilePicture' in errors.personalInfo &&
                  errors.personalInfo.profilePicture && (
                    <span className='absolute -bottom-5 left-0 text-xs text-red-500'>
                      {typeof (errors.personalInfo as any).profilePicture
                        ?.message === 'string'
                        ? ((errors.personalInfo as any).profilePicture
                            .message as string)
                        : null}
                    </span>
                  )}
              </div>
            );
          }}
        />

        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'profilePicture' in errors.personalInfo &&
          errors.personalInfo.profilePicture && (
            <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
              {typeof (errors.personalInfo as any).profilePicture?.message ===
              'string'
                ? ((errors.personalInfo as any).profilePicture
                    .message as string)
                : null}
            </span>
          )}
      </div>

      {/* Next/Image preview container: data URL -> Next/Image */}
      {previewDataUrl && (
        <div className='relative mt-4 h-24 w-24 overflow-hidden rounded-full'>
          <Image
            src={previewDataUrl}
            alt='Profile Preview'
            fill
            sizes='96px'
            className='object-cover'
            priority
          />
        </div>
      )}
    </div>
  );
}
