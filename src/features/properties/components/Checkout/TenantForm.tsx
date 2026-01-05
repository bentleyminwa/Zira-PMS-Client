import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';
import type { TenantRequest } from '../../types';

interface TenantFormProps {
  data: TenantRequest;
  errors: Record<string, string>;
  onChange: (data: TenantRequest) => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-right-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label
            htmlFor='firstName'
            className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
          >
            First Name
          </Label>
          <Input
            id='firstName'
            placeholder='John'
            className={cn(
              'rounded-xl h-12 border-muted-foreground/20 focus:border-primary transition-all',
              errors.firstName && 'border-red-500 focus-visible:ring-red-500'
            )}
            value={data.firstName}
            onChange={(e) =>
              onChange({
                ...data,
                firstName: e.target.value,
              })
            }
          />
          {errors.firstName && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.firstName}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='lastName'
            className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
          >
            Last Name
          </Label>
          <Input
            id='lastName'
            placeholder='Doe'
            className={cn(
              'rounded-xl h-12 border-muted-foreground/20 focus:border-primary transition-all',
              errors.lastName && 'border-red-500 focus-visible:ring-red-500'
            )}
            value={data.lastName}
            onChange={(e) =>
              onChange({
                ...data,
                lastName: e.target.value,
              })
            }
          />
          {errors.lastName && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>
      <div className='space-y-2'>
        <Label
          htmlFor='email'
          className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
        >
          Email Address
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='john@example.com'
          className={cn(
            'rounded-xl h-12 border-muted-foreground/20 focus:border-primary transition-all',
            errors.email && 'border-red-500 focus-visible:ring-red-500'
          )}
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
        {errors.email && (
          <p className='text-[10px] text-red-500 font-medium px-1'>
            {errors.email}
          </p>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label
            htmlFor='phone'
            className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
          >
            Phone Number
          </Label>
          <Input
            id='phone'
            placeholder='+1 234 567 890'
            className={cn(
              'rounded-xl h-12 border-muted-foreground/20 focus:border-primary transition-all',
              errors.phone && 'border-red-500 focus-visible:ring-red-500'
            )}
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
          />
          {errors.phone && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.phone}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='idNumber'
            className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
          >
            ID / Passport
          </Label>
          <Input
            id='idNumber'
            placeholder='A12345678'
            className={cn(
              'rounded-xl h-12 border-muted-foreground/20 focus:border-primary transition-all',
              errors.idNumber && 'border-red-500 focus-visible:ring-red-500'
            )}
            value={data.idNumber}
            onChange={(e) => onChange({ ...data, idNumber: e.target.value })}
          />
          {errors.idNumber && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.idNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
