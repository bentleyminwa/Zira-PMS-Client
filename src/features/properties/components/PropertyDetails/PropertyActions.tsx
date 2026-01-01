import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import React from 'react';

interface PropertyActionsProps {
  loading: boolean;
  onBooking: () => void;
  listingType: 'BUY' | 'RENT';
}

export const PropertyActions: React.FC<PropertyActionsProps> = ({
  loading,
  onBooking,
  listingType,
}) => {
  return (
    <div className='p-6 border-t border-border flex flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <Button variant='outline' className='h-14 w-14 rounded-2xl shrink-0'>
          <Phone className='w-5 h-5' />
        </Button>
        <Button
          className='flex-1 h-14 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50'
          onClick={onBooking}
          disabled={loading}
        >
          {listingType === 'BUY' ? 'Buy Now' : 'Rent Now'}
        </Button>
        <Button variant='outline' className='h-14 w-14 rounded-2xl shrink-0'>
          <Mail className='w-5 h-5' />
        </Button>
      </div>
    </div>
  );
};
