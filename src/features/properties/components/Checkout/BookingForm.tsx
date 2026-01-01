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
  property: Property;
  onChange: (data: CheckoutData['booking']) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  data,
  property,
  onChange,
}) => {
  return (
    <div className='space-y-4 animate-in fade-in slide-in-from-right-4'>
      <div className='space-y-2'>
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal h-12 rounded-xl',
                !data.startDate && 'text-muted-foreground'
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
          <PopoverContent className='w-auto p-0' align='start'>
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
      </div>

      {property.listingType === 'RENT' && (
        <div className='space-y-2'>
          <Label>Lease Type</Label>
          <div className='grid grid-cols-2 gap-4'>
            <Button
              variant={data.type === 'LONG_TERM' ? 'default' : 'outline'}
              onClick={() => onChange({ ...data, type: 'LONG_TERM' })}
              className='h-12 rounded-xl text-xs'
            >
              Long Term
            </Button>
            <Button
              variant={data.type === 'SHORT_TERM' ? 'default' : 'outline'}
              onClick={() => onChange({ ...data, type: 'SHORT_TERM' })}
              className='h-12 rounded-xl text-xs'
            >
              Short Term
            </Button>
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <Label htmlFor='notes'>Additional Notes</Label>
        <textarea
          id='notes'
          className='w-full min-h-[100px] bg-background border rounded-xl p-3 text-sm'
          placeholder='Tell us more about your requirements...'
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
        />
      </div>
    </div>
  );
};
