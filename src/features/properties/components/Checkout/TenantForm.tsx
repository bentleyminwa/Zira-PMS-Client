import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import type { TenantRequest } from '../../types';

interface TenantFormProps {
  data: TenantRequest;
  onChange: (data: TenantRequest) => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({ data, onChange }) => {
  return (
    <div className='space-y-4 animate-in fade-in slide-in-from-right-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            id='firstName'
            placeholder='John'
            value={data.firstName}
            onChange={(e) =>
              onChange({
                ...data,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            id='lastName'
            placeholder='Doe'
            value={data.lastName}
            onChange={(e) =>
              onChange({
                ...data,
                lastName: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email Address</Label>
        <Input
          id='email'
          type='email'
          placeholder='john@example.com'
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='phone'>Phone Number</Label>
        <Input
          id='phone'
          placeholder='+1 234 567 890'
          value={data.phone}
          onChange={(e) => onChange({ ...data, phone: e.target.value })}
        />
      </div>
    </div>
  );
};
