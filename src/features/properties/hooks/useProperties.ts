import { useSupabase } from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import type { Property } from '../types';

export function useProperties(listingType?: 'BUY' | 'RENT') {
  const supabase = useSupabase();

  const {
    data: properties = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['properties', listingType],
    queryFn: async () => {
      let query = supabase
        .from('Property')
        .select('*, agent:User(*)')
        .eq('status', 'AVAILABLE');

      if (listingType) {
        query = query.eq('listingType', listingType);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Property[];
    },
  });

  return {
    properties,
    loading,
    error: error ? (error as Error).message : null,
  };
}
