import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import type { CheckoutData, Property } from '../../types';

interface BookingFormProps {
  data: CheckoutData['booking'];
  errors: Record<string, string>;
  property: Property;
  onChange: (data: CheckoutData['booking']) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  data,
  errors,
  property,
  onChange,
}) => {
  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-right-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Start Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal h-12 rounded-xl border-muted-foreground/20 hover:border-primary transition-colors',
                  !data.startDate && 'text-muted-foreground',
                  errors.startDate &&
                    'border-red-500 focus-visible:ring-red-500'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {data.startDate ? (
                  format(new Date(data.startDate), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0 rounded-2xl border-none shadow-2xl'
              align='start'
            >
              <Calendar
                mode='single'
                selected={new Date(data.startDate)}
                onSelect={(date: Date | undefined) =>
                  date &&
                  onChange({
                    ...data,
                    startDate: format(date, 'yyyy-MM-dd'),
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.startDate}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            End Date <span className='text-[10px] opacity-50'>(Optional)</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal h-12 rounded-xl border-muted-foreground/20 hover:border-primary transition-colors',
                  !data.endDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {data.endDate ? (
                  format(new Date(data.endDate), 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0 rounded-2xl border-none shadow-2xl'
              align='start'
            >
              <Calendar
                mode='single'
                selected={data.endDate ? new Date(data.endDate) : undefined}
                onSelect={(date: Date | undefined) =>
                  onChange({
                    ...data,
                    endDate: date ? format(date, 'yyyy-MM-dd') : undefined,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {property.listingType === 'RENT' && (
        <div className='space-y-3'>
          <Label className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
            Lease Type
          </Label>
          <div className='grid grid-cols-2 gap-4'>
            <Button
              variant={data.type === 'LONG_TERM' ? 'default' : 'outline'}
              onClick={() => onChange({ ...data, type: 'LONG_TERM' })}
              className={cn(
                'h-14 rounded-2xl flex flex-col gap-1 items-center justify-center transition-all',
                data.type === 'LONG_TERM'
                  ? 'shadow-lg shadow-primary/20'
                  : 'border-muted-foreground/20 opacity-70'
              )}
            >
              <span className='text-sm font-bold'>Long Term</span>
              <span className='text-[10px] opacity-60'>Standard</span>
            </Button>
            <Button
              variant={data.type === 'SHORT_TERM' ? 'default' : 'outline'}
              onClick={() => onChange({ ...data, type: 'SHORT_TERM' })}
              className={cn(
                'h-14 rounded-2xl flex flex-col gap-1 items-center justify-center transition-all',
                data.type === 'SHORT_TERM'
                  ? 'shadow-lg shadow-primary/20'
                  : 'border-muted-foreground/20 opacity-70'
              )}
            >
              <span className='text-sm font-bold'>Short Term</span>
              <span className='text-[10px] opacity-60'>Flexible</span>
            </Button>
          </div>
          {errors.type && (
            <p className='text-[10px] text-red-500 font-medium px-1'>
              {errors.type}
            </p>
          )}
        </div>
      )}

      <div className='space-y-2'>
        <Label
          htmlFor='notes'
          className='text-xs font-bold uppercase tracking-wider text-muted-foreground'
        >
          Additional Notes
        </Label>
        <textarea
          id='notes'
          className='w-full min-h-[120px] bg-background border border-muted-foreground/20 rounded-2xl p-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all'
          placeholder='Tell us more about your requirements...'
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
        />
      </div>
    </div>
  );
};
