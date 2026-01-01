import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';
import type { CheckoutData, Property } from '../../types';

interface PaymentFormProps {
  data: CheckoutData['payment'];
  property: Property;
  onChange: (data: CheckoutData['payment']) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  data,
  property,
  onChange,
}) => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-right-4'>
      <div className='p-4 bg-muted/50 rounded-2xl border border-border space-y-3'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-muted-foreground'>Total Price</span>
          <span className='text-lg font-bold'>
            ${property.price.toLocaleString()}
          </span>
        </div>
        <div className='h-px bg-border' />
        <div className='flex justify-between items-center text-xs'>
          <span className='text-muted-foreground'>Property</span>
          <span className='font-medium'>{property.name}</span>
        </div>
      </div>

      <div className='space-y-3'>
        <Label>Payment Method</Label>
        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant={data.method === 'CARD' ? 'default' : 'outline'}
            onClick={() => onChange({ ...data, method: 'CARD' })}
            className='h-14 rounded-2xl flex flex-col gap-1 items-center justify-center'
          >
            <span className='text-sm font-bold'>Credit Card</span>
            <span className='text-[10px] opacity-70'>Safe & Fast</span>
          </Button>
          <Button
            variant={data.method === 'BANK_TRANSFER' ? 'default' : 'outline'}
            onClick={() =>
              onChange({
                ...data,
                method: 'BANK_TRANSFER',
              })
            }
            className='h-14 rounded-2xl flex flex-col gap-1 items-center justify-center'
          >
            <span className='text-sm font-bold'>Bank Transfer</span>
            <span className='text-[10px] opacity-70'>Direct Pay</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
