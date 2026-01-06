import { useSupabase } from '@/hooks/useSupabase';
import { useState } from 'react';
import type { CheckoutData, Property } from '../types';

export function useCheckout(property: Property) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = useSupabase();

  const processCheckout = async (data: CheckoutData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('Starting checkout process for:', data.tenant.email);

      // 1. Ensure Tenant exists (or create one)
      const { data: tenant, error: searchError } = await supabase
        .from('Tenant')
        .select('id')
        .eq('email', data.tenant.email)
        .maybeSingle();

      if (searchError) {
        console.error('Error searching for tenant:', searchError);
        throw new Error(`Failed to verify tenant: ${searchError.message}`);
      }

      let tenantId = tenant?.id;

      if (!tenantId) {
        console.log('Creating new tenant...');
        const newId = crypto.randomUUID();
        const now = new Date().toISOString();
        const { data: newTenant, error: createError } = await supabase
          .from('Tenant')
          .insert([
            {
              id: newId,
              firstName: data.tenant.firstName,
              lastName: data.tenant.lastName,
              email: data.tenant.email,
              phone: data.tenant.phone,
              idNumber: data.tenant.idNumber,
              createdAt: now,
              updatedAt: now,
            },
          ])
          .select()
          .single();

        if (createError) {
          console.error('Error creating tenant:', createError);
          throw new Error(
            `Failed to create tenant profile: ${createError.message}`
          );
        }
        tenantId = newTenant.id;
        console.log('Tenant created with ID:', tenantId);
      } else {
        console.log('Found existing tenant with ID:', tenantId);
      }

      // 2. Create Booking
      console.log('Creating booking for property:', property.id);
      const bookingId = crypto.randomUUID();
      const now = new Date().toISOString();

      // Calculate default endDate if missing to satisfy mandatory constraint
      let calculatedEndDate = data.booking.endDate;
      if (!calculatedEndDate) {
        const start = new Date(data.booking.startDate);
        if (data.booking.type === 'LONG_TERM') {
          start.setFullYear(start.getFullYear() + 1); // +1 Year
        } else {
          start.setMonth(start.getMonth() + 1); // +1 Month default
        }
        calculatedEndDate = start.toISOString().split('T')[0];
      }

      const { data: booking, error: bookingError } = await supabase
        .from('Booking')
        .insert([
          {
            id: bookingId,
            propertyId: property.id,
            tenantId: tenantId,
            startDate: data.booking.startDate,
            endDate: calculatedEndDate,
            type: data.booking.type,
            status: 'PENDING',
            notes: data.booking.notes || '',
            totalPrice: data.payment.amount,
            createdAt: now,
            updatedAt: now,
          },
        ])
        .select()
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        throw new Error(`Failed to submit booking: ${bookingError.message}`);
      }
      console.log('Booking created with ID:', booking.id);

      // 3. Create Payment (Mock)
      const paymentNow = new Date().toISOString();
      const { error: paymentError } = await supabase.from('Payment').insert([
        {
          id: crypto.randomUUID(),
          amount: data.payment.amount,
          method: data.payment.method,
          type: property.listingType === 'RENT' ? 'RENT' : 'FEE',
          status: 'PENDING',
          bookingId: booking.id,
          tenantId: tenantId,
          date: paymentNow,
          createdAt: paymentNow,
          updatedAt: paymentNow,
        },
      ]);

      if (paymentError) {
        console.error('Error creating payment:', paymentError);
        // We don't necessarily throw here if booking succeeded, but for completeness:
        throw new Error(
          `Booking recorded, but payment record failed: ${paymentError.message}`
        );
      }

      setSuccess(true);
      console.log('Checkout completed successfully');
    } catch (err: unknown) {
      console.error('Checkout failed:', err);
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { processCheckout, loading, error, success };
}
