import { useSupabase } from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';
import type { Property } from '../types';

export function useProperties() {
  const supabase = useSupabase();

  const {
    data: properties = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Property')
        .select('*, agent:User(*)')
        .eq('status', 'AVAILABLE');

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
