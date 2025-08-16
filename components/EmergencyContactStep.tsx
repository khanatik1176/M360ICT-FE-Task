import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { relationships } from '@/constants/GlobalData';
import { EmergencyContactStepProps } from '@/types/Form.type';



export default function EmergencyContactStep({ form }: EmergencyContactStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const dateOfBirth = watch('personalInfo.dateOfBirth');
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold'>Emergency Contact</h2>

      <div className='relative'>
        <Label htmlFor='contactName'>Contact Name</Label>
        <Input
          id='contactName'
          placeholder='Jane Doe'
          {...register('emergencyContact.contactName')}
          className={`mt-2 ${errors.emergencyContact?.contactName ? 'border-red-500' : ''}`}
        />
        {errors.emergencyContact?.contactName && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.emergencyContact.contactName.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='relationship'>Relationship</Label>
        <Select
          onValueChange={(value) => setValue('emergencyContact.relationship', value)}
          value={watch('emergencyContact.relationship')}
        >
          <SelectTrigger
            id='relationship'
            className={`mt-2 ${errors.emergencyContact?.relationship ? 'border-red-500' : ''}`}
          >
            <SelectValue placeholder='Select relationship' />
          </SelectTrigger>
          <SelectContent>
            {relationships.map((rel) => (
              <SelectItem key={rel} value={rel}>
                {rel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.emergencyContact?.relationship && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.emergencyContact.relationship.message}
          </span>
        )}
      </div>

      <div className='relative'>
        <Label htmlFor='phoneNumber'>Phone Number</Label>
        <Input
          id='phoneNumber'
          placeholder='+1-123-456-7890'
          {...register('emergencyContact.phoneNumber')}
          className={`mt-2 ${errors.emergencyContact?.phoneNumber ? 'border-red-500' : ''}`}
        />
        {errors.emergencyContact?.phoneNumber && (
          <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
            {errors.emergencyContact.phoneNumber.message}
          </span>
        )}
      </div>

      {age < 21 && (
        <div className='space-y-6'>
          <h3 className='text-lg font-semibold'>Guardian Contact</h3>
          
          <div className='relative'>
            <Label htmlFor='guardianName'>Guardian Name</Label>
            <Input
              id='guardianName'
              placeholder="Guardian's full name"
              {...register('emergencyContact.guardianContact.name')}
              className={`mt-2 ${
                errors.emergencyContact?.guardianContact?.name ? 'border-red-500' : ''
              }`}
            />
            {errors.emergencyContact?.guardianContact?.name && (
              <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
                {errors.emergencyContact.guardianContact.name.message}
              </span>
            )}
          </div>

          <div className='relative'>
            <Label htmlFor='guardianPhone'>Guardian Phone Number</Label>
            <Input
              id='guardianPhone'
              placeholder='+1-123-456-7890'
              {...register('emergencyContact.guardianContact.phone')}
              className={`mt-2 ${
                errors.emergencyContact?.guardianContact?.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.emergencyContact?.guardianContact?.phone && (
              <span className='absolute bottom-[-20px] left-0 text-xs text-red-500'>
                {errors.emergencyContact.guardianContact.phone.message}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}