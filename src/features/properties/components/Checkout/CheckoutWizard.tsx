import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronRight, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useCheckout } from '../../hooks/useCheckout';
import type { CheckoutData, Property } from '../../types';
import { BookingForm } from './BookingForm';
import { PaymentForm } from './PaymentForm';
import { SuccessStep } from './SuccessStep';
import { TenantForm } from './TenantForm';

interface CheckoutWizardProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutWizard: React.FC<CheckoutWizardProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const { processCheckout, loading, error, success } = useCheckout(property);

  const [formData, setFormData] = useState<CheckoutData>({
    tenant: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      idNumber: '',
    },
    booking: {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      type: property.listingType === 'RENT' ? 'LONG_TERM' : 'SHORT_TERM',
    },
    payment: {
      method: 'CARD',
      amount: property.price,
    },
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    await processCheckout(formData);
  };

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <SuccessStep property={property} onClose={onClose} />
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px] overflow-hidden p-0'>
        <div className='bg-primary p-6 text-primary-foreground'>
          <DialogHeader>
            <DialogTitle className='text-xl text-white'>
              {property.listingType === 'BUY'
                ? 'Purchase Property'
                : 'Rent Property'}
            </DialogTitle>
          </DialogHeader>
          <div className='flex mt-4 gap-2'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-300',
                  step >= i ? 'bg-white' : 'bg-white/20'
                )}
              />
            ))}
          </div>
        </div>

        <div className='p-6 min-h-[300px]'>
          {error && (
            <div className='mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100'>
              {error}
            </div>
          )}

          {step === 1 && (
            <TenantForm
              data={formData.tenant}
              onChange={(tenant) => setFormData({ ...formData, tenant })}
            />
          )}

          {step === 2 && (
            <BookingForm
              data={formData.booking}
              property={property}
              onChange={(booking) => setFormData({ ...formData, booking })}
            />
          )}

          {step === 3 && (
            <PaymentForm
              data={formData.payment}
              property={property}
              onChange={(payment) => setFormData({ ...formData, payment })}
            />
          )}
        </div>

        <div className='p-6 bg-muted/30 border-t border-border flex gap-3'>
          {step > 1 && (
            <Button variant='outline' onClick={prevStep} disabled={loading}>
              Back
            </Button>
          )}
          <Button
            className='flex-1 h-12 rounded-xl text-md font-bold'
            onClick={step === 3 ? handleSubmit : nextStep}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className='w-5 h-5 animate-spin' />
            ) : step === 3 ? (
              property.listingType === 'BUY' ? (
                'Confirm Purchase'
              ) : (
                'Book Now'
              )
            ) : (
              <>
                Next Step <ChevronRight className='ml-2 w-4 h-4' />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
