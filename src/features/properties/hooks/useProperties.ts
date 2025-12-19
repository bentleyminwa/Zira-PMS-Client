import { useSupabase } from '@/hooks/useSupabase';
import { useEffect, useState } from 'react';
import type { Property } from '../types';

export function useProperties(listingType?: 'BUY' | 'RENT') {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        let query = supabase
          .from('Property')
          .select('*, agent:User(*)')
          .eq('status', 'AVAILABLE');

        if (listingType) {
          query = query.eq('listingType', listingType);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProperties(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [supabase, listingType]);

  return { properties, loading, error };
}
