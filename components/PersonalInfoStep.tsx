'use client';
import React, { useEffect, useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PersonalInfoStepProps } from '@/types/Form.type';

/*
  PersonalInfoStep.tsx
  - Uses your Input component for all fields
  - Converts uploaded File to data URL and renders with Next/Image
  - Keeps error messages absolutely positioned beneath each field
*/

export default function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form as UseFormReturn<any>;

  const profilePicture = watch('personalInfo.profilePicture');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let reader: FileReader | null = null;

    if (profilePicture && typeof profilePicture === 'object' && profilePicture instanceof File) {
      reader = new FileReader();
      reader.onload = () => setPreviewDataUrl(String(reader?.result ?? null));
      reader.onerror = () => setPreviewDataUrl(null);
      reader.readAsDataURL(profilePicture);

      return () => {
        // cleanup
        if (reader) {
          reader.onload = null;
          reader.onerror = null;
        }
        // no revoke necessary for data URL
      };
    }

    if (profilePicture && typeof profilePicture === 'string') {
      setPreviewDataUrl(profilePicture);
      return () => setPreviewDataUrl(null);
    }

    setPreviewDataUrl(null);
    return;
  }, [profilePicture]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>

      <div className="relative">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          {...register('personalInfo.fullName')}
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'fullName' in errors.personalInfo && errors.personalInfo.fullName ? 'border-red-500' : ''}`}
        />
        {errors.personalInfo &&
          typeof errors.personalInfo === 'object' &&
          'fullName' in errors.personalInfo &&
          errors.personalInfo.fullName && (
            <span className="absolute left-0 bottom-[-20px] text-xs text-red-500">
              {typeof (errors.personalInfo as any).fullName?.message === 'string'
                ? (errors.personalInfo as any).fullName.message as string
                : null}
            </span>
        )}
      </div>

      <div className="relative">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
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
            <span className="absolute left-0 bottom-[-20px] text-xs text-red-500">
              {typeof (errors.personalInfo as any).email?.message === 'string'
                ? (errors.personalInfo as any).email.message as string
                : null}
            </span>
          )}
      </div>

      <div className="relative">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          placeholder="+1-123-456-7890"
          {...register('personalInfo.phoneNumber')}
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'phoneNumber' in errors.personalInfo && errors.personalInfo.phoneNumber ? 'border-red-500' : ''}`}
        />
        {errors.personalInfo && typeof errors.personalInfo === 'object' && 'phoneNumber' in errors.personalInfo && errors.personalInfo.phoneNumber && (
          <span className="absolute left-0 bottom-[-20px] text-xs text-red-500">
            {typeof (errors.personalInfo as any).phoneNumber?.message === 'string'
              ? (errors.personalInfo as any).phoneNumber.message as string
              : null}
          </span>
        )}
      </div>

      <div className="relative">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register('personalInfo.dateOfBirth', {
            setValueAs: (v) => (v ? new Date(v) : null),
          })}
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'dateOfBirth' in errors.personalInfo && errors.personalInfo.dateOfBirth ? 'border-red-500' : ''}`}
        />
        {errors.personalInfo && typeof errors.personalInfo === 'object' && 'dateOfBirth' in errors.personalInfo && errors.personalInfo.dateOfBirth && (
          <span className="absolute left-0 bottom-[-20px] text-xs text-red-500">
            {typeof (errors.personalInfo as any).dateOfBirth?.message === 'string'
              ? (errors.personalInfo as any).dateOfBirth.message as string
              : null}
          </span>
        )}
      </div>

      <div className="relative">
        <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>

        <Input
          id="profilePicture"
          type="file"
          accept=".jpg,.jpeg,.png"
          className={`mt-2 ${errors.personalInfo && typeof errors.personalInfo === 'object' && 'profilePicture' in errors.personalInfo && errors.personalInfo.profilePicture ? 'border-red-500' : ''}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            setValue('personalInfo.profilePicture', file, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        {errors.personalInfo && typeof errors.personalInfo === 'object' && 'profilePicture' in errors.personalInfo && errors.personalInfo.profilePicture && (
          <span className="absolute left-0 bottom-[-20px] text-xs text-red-500">
            {typeof (errors.personalInfo as any).profilePicture?.message === 'string'
              ? (errors.personalInfo as any).profilePicture.message as string
              : null}
          </span>
        )}
      </div>

      {/* Next/Image preview container: data URL -> Next/Image */}
      {previewDataUrl && (
        <div className="relative mt-4 h-24 w-24 rounded-full overflow-hidden">
          <Image
            src={previewDataUrl}
            alt="Profile Preview"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}