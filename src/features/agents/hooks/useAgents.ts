import type { Agent } from '@/features/properties/types';
import { useSupabase } from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';

export function useAgents() {
  const supabase = useSupabase();

  const {
    data: agents = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('role', 'AGENT');

      if (error) throw error;
      return data as Agent[];
    },
  });

  return {
    agents,
    loading,
    error: error ? (error as Error).message : null,
  };
}
