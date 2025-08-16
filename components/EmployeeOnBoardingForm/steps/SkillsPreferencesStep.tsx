'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { SkillsPreferencesStepProps } from '@/types/Form.type';
import { Slider } from '@/components/ui/slider';
import { departmentSkills } from '@/constants/GlobalData';

export default function SkillsPreferencesStep({ form }: SkillsPreferencesStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const remotePreference = watch('skillsPreferences.remoteWorkPreference') ?? 0;


  const department = watch('jobDetails.department');
  const availableSkills = department ? (departmentSkills[department] || []) : [];
  const selectedSkills = (watch('skillsPreferences.primarySkills') as Array<{ skill: string; experience: number }>) || [];

  const addSkill = (skill: string) => {
    const current = [...selectedSkills];
    current.push({ skill, experience: 0 });
    setValue('skillsPreferences.primarySkills', current, { shouldValidate: true, shouldDirty: true });
  };

  const removeSkill = (skill: string) => {
    const current = selectedSkills.filter(s => s.skill !== skill);
    setValue('skillsPreferences.primarySkills', current, { shouldValidate: true, shouldDirty: true });
  };

  const updateExperience = (skill: string, years: number) => {
    const current = selectedSkills.map(s => s.skill === skill ? { ...s, experience: years } : s);
    setValue('skillsPreferences.primarySkills', current, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skills & Preferences</h2>

      <div className="relative">
        <Label>Primary Skills (Select at least 3)</Label>
        <div className="mt-2 space-y-3">
          {availableSkills.length === 0 && (
            <div className="text-sm text-muted-foreground">Select a department to see skills</div>
          )}
          {availableSkills.map((skill) => {
            const isSelected = selectedSkills.some(s => s.skill === skill);
            const experience = selectedSkills.find(s => s.skill === skill)?.experience ?? '';

            return (
              <div key={skill} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    className='text-white'
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (checked) addSkill(skill);
                      else removeSkill(skill);
                    }}
                  />
                  <Label htmlFor={`skill-${skill}`} className="font-normal">
                    {skill}
                  </Label>
                </div>

                {isSelected && (
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Years"
                      className="w-32"
                      value={experience}
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        updateExperience(skill, Number.isNaN(val) ? 0 : val);
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {errors.skillsPreferences?.primarySkills && (
          <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
            {errors.skillsPreferences.primarySkills.message as string}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Label htmlFor="workingHoursStart">Start Time</Label>
          <Input
            id="workingHoursStart"
            type="time"
            {...register('skillsPreferences.workingHours.start')}
            className={`mt-2 ${errors.skillsPreferences?.workingHours?.start ? 'border-red-500' : ''}`}
          />
          {errors.skillsPreferences?.workingHours?.start && (
            <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
              {errors.skillsPreferences.workingHours.start.message as string}
            </span>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="workingHoursEnd">End Time</Label>
          <Input
            id="workingHoursEnd"
            type="time"
            {...register('skillsPreferences.workingHours.end')}
            className={`mt-2 ${errors.skillsPreferences?.workingHours?.end ? 'border-red-500' : ''}`}
          />
          {errors.skillsPreferences?.workingHours?.end && (
            <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
              {errors.skillsPreferences.workingHours.end.message as string}
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        <Label>Remote Work Preference ({remotePreference}%)</Label>
        <div className="mt-2">
          <Slider
            value={[Number(remotePreference)]}
            onValueChange={(vals: number[]) =>
              setValue('skillsPreferences.remoteWorkPreference', vals[0], { shouldValidate: true, shouldDirty: true })
            }
            max={100}
            step={1}
            className="h-6"
          />
        </div>
        {errors.skillsPreferences?.remoteWorkPreference && (
          <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
            {errors.skillsPreferences.remoteWorkPreference.message as string}
          </span>
        )}
      </div>

      {remotePreference > 50 && (
        <div className="relative flex items-center space-x-2">
          <Checkbox
            id="managerApproval"
            checked={Boolean(watch('jobDetails.managerApproval'))}
            className='text-white'
            onCheckedChange={(checked) => setValue('jobDetails.managerApproval', checked === true, { shouldValidate: true, shouldDirty: true })}
          />
          <Label htmlFor="managerApproval">Manager Approval for Remote Work</Label>
          {errors.jobDetails?.managerApproval && (
            <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
              {errors.jobDetails.managerApproval.message as string}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <Label htmlFor="extraNotes">Additional Notes (Optional)</Label>
        <Textarea
          id="extraNotes"
          {...register('skillsPreferences.extraNotes')}
          placeholder="Any additional information..."
          maxLength={500}
          className={`mt-2 ${errors.skillsPreferences?.extraNotes ? 'border-red-500' : ''}`}
        />
        {errors.skillsPreferences?.extraNotes && (
          <span className="absolute bottom-[-20px] left-0 text-xs text-red-500">
            {errors.skillsPreferences.extraNotes.message as string}
          </span>
        )}
      </div>
    </div>
  );
}