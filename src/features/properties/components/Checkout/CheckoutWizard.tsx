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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {
    processCheckout,
    loading,
    error: checkoutError,
    success,
  } = useCheckout(property);

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
      endDate: '',
      type: property.listingType === 'RENT' ? 'LONG_TERM' : 'SHORT_TERM',
    },
    payment: {
      method: 'CARD',
      amount: Number(property.price),
    },
  });

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.tenant.firstName.trim())
        newErrors.firstName = 'First name is required';
      if (!formData.tenant.lastName.trim())
        newErrors.lastName = 'Last name is required';
      if (!formData.tenant.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.tenant.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.tenant.idNumber?.trim())
        newErrors.idNumber = 'ID/Passport number is required';
      if (!formData.tenant.phone?.trim())
        newErrors.phone = 'Phone number is required';
    }

    if (currentStep === 2) {
      if (!formData.booking.startDate)
        newErrors.startDate = 'Start date is required';
      if (property.listingType === 'RENT' && !formData.booking.type)
        newErrors.type = 'Lease type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

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
      <DialogContent className='sm:max-w-[500px] overflow-hidden p-0 rounded-3xl border-none shadow-2xl'>
        <div className='bg-linear-to-br from-primary to-primary/80 p-8 text-primary-foreground'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold tracking-tight text-white mb-6'>
              {property.listingType === 'BUY'
                ? 'Purchase Property'
                : 'Rent Property'}
            </DialogTitle>
          </DialogHeader>
          <div className='flex justify-between relative mt-4'>
            {/* Connection lines */}
            <div className='absolute top-5 left-0 w-full h-0.5 bg-white/20 z-0' />
            <div
              className='absolute top-5 left-0 h-0.5 bg-white transition-all duration-500 z-0'
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='flex flex-col items-center gap-2 relative z-10'
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2',
                    step === i
                      ? 'bg-white text-primary border-white scale-110 shadow-lg'
                      : step > i
                      ? 'bg-primary text-white border-white'
                      : 'bg-primary/50 text-white/50 border-white/20'
                  )}
                >
                  {step > i ? '✓' : i}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium uppercase tracking-wider',
                    step >= i ? 'text-white' : 'text-white/40'
                  )}
                >
                  {i === 1 ? 'Details' : i === 2 ? 'Date' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='p-8 min-h-[350px] bg-background'>
          {(checkoutError || errors.submit) && (
            <div className='mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 flex items-start gap-3 animate-in fade-in zoom-in-95'>
              <div className='w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5'>
                !
              </div>
              <p>{checkoutError || errors.submit}</p>
            </div>
          )}

          {step === 1 && (
            <TenantForm
              data={formData.tenant}
              errors={errors}
              onChange={(tenant) => {
                setFormData({ ...formData, tenant });
                if (Object.keys(errors).length > 0) setErrors({});
              }}
            />
          )}

          {step === 2 && (
            <BookingForm
              data={formData.booking}
              errors={errors}
              property={property}
              onChange={(booking) => {
                setFormData({ ...formData, booking });
                if (Object.keys(errors).length > 0) setErrors({});
              }}
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
