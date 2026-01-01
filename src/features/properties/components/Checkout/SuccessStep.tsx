import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import type { Property } from '../../types';

interface SuccessStepProps {
  property: Property;
  onClose: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  property,
  onClose,
}) => {
  return (
    <DialogContent className='sm:max-w-[425px] text-center py-10'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center'>
          <CheckCircle2 className='w-10 h-10 text-green-600' />
        </div>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Success!</DialogTitle>
        </DialogHeader>
        <p className='text-muted-foreground'>
          Your {property.listingType === 'BUY' ? 'purchase' : 'booking'} request
          has been submitted successfully. Our team will contact you soon.
        </p>
        <Button onClick={onClose} className='w-full mt-4'>
          Close
        </Button>
      </div>
    </DialogContent>
  );
};
