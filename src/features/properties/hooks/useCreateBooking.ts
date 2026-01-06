import { useSupabase } from '@/hooks/useSupabase';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import type { BookingRequest } from '../types';

export function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = useSupabase();
  const { user } = useUser();

  const createBooking = async (request: BookingRequest) => {
    if (!user) {
      setError('You must be logged in to request a booking.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const { error: dbError } = await supabase.from('Booking').insert([
        {
          propertyId: request.propertyId,
          tenantId: user.id, // RLS should handle this, but explicit is better
          startDate: request.startDate,
          endDate: request.endDate,
          leaseType: request.type,
          status: 'PENDING',
          notes: request.notes,
        },
      ]);

      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error, success };
}
