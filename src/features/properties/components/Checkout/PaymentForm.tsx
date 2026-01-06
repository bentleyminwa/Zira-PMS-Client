import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
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
    <div className='space-y-8 animate-in fade-in slide-in-from-right-4'>
      <div className='p-6 bg-muted/30 rounded-4xl border border-border space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-muted-foreground'>
            Summary
          </span>
          <div className='px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest leading-none'>
            {property.listingType}
          </div>
        </div>
        <div className='space-y-1'>
          <h4 className='font-bold text-lg'>{property.name}</h4>
          <p className='text-xs text-muted-foreground leading-relaxed'>
            {property.address}
          </p>
        </div>
        <div className='h-px bg-border/50' />
        <div className='flex justify-between items-end'>
          <span className='text-sm text-muted-foreground'>Total Price</span>
          <span className='text-2xl font-black text-primary'>
            ${data.amount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className='space-y-4'>
        <Label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
          Payment Method
        </Label>
        <div className='grid grid-cols-2 gap-4'>
          {[
            { id: 'CARD', label: 'Credit Card', sub: 'Safe & instant' },
            {
              id: 'BANK_TRANSFER',
              label: 'Bank Transfer',
              sub: 'Direct deposit',
            },
          ].map((m) => (
            <Button
              key={m.id}
              variant={data.method === m.id ? 'default' : 'outline'}
              onClick={() =>
                onChange({
                  ...data,
                  method: m.id as CheckoutData['payment']['method'],
                })
              }
              className={cn(
                'h-16 rounded-2xl flex flex-col gap-1 items-center justify-center transition-all',
                data.method === m.id
                  ? 'shadow-xl shadow-primary/20'
                  : 'border-muted-foreground/20 opacity-70'
              )}
            >
              <span className='text-sm font-bold'>{m.label}</span>
              <span className='text-[10px] opacity-60'>{m.sub}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
