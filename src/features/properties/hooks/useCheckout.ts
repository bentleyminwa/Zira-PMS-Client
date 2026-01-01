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

      // 1. Ensure Tenant exists (or create one)
      // Check by email
      let { data: tenant, error: searchError } = await supabase
        .from('Tenant')
        .select('id')
        .eq('email', data.tenant.email)
        .single();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      let tenantId = tenant?.id;

      if (!tenantId) {
        const { data: newTenant, error: createError } = await supabase
          .from('Tenant')
          .insert([data.tenant])
          .select()
          .single();

        if (createError) throw createError;
        tenantId = newTenant.id;
      }

      // 2. Create Booking
      const { data: booking, error: bookingError } = await supabase
        .from('Booking')
        .insert([
          {
            propertyId: property.id,
            tenantId: tenantId,
            startDate: data.booking.startDate,
            endDate: data.booking.endDate,
            type: data.booking.type,
            status: 'PENDING',
            notes: data.booking.notes,
            totalPrice: data.payment.amount,
          },
        ])
        .select()
        .single();

      if (bookingError) throw bookingError;

      // 3. Create Payment (Mock)
      const { error: paymentError } = await supabase.from('Payment').insert([
        {
          amount: data.payment.amount,
          method: data.payment.method,
          type: property.listingType === 'RENT' ? 'RENT' : 'FEE',
          status: 'PENDING', // Stripe will update this later
          bookingId: booking.id,
          tenantId: tenantId,
        },
      ]);

      if (paymentError) throw paymentError;

      setSuccess(true);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  return { processCheckout, loading, error, success };
}
