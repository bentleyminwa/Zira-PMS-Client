import type { Agent } from '@/features/properties/types';
import { useSupabase } from '@/hooks/useSupabase';
import { useEffect, useState } from 'react';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('User')
          .select('*')
          .eq('role', 'AGENT');

        if (error) throw error;
        setAgents(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, [supabase]);

  return { agents, loading, error };
}
