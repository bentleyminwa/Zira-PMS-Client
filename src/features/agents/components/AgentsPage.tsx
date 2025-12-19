import { Loader2, Mail, User } from 'lucide-react';
import React from 'react';
import { useAgents } from '../hooks/useAgents';

export const AgentsPage: React.FC = () => {
  const { agents, loading, error } = useAgents();

  if (loading) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background'>
        <div className='text-center space-y-4'>
          <p className='text-red-500 font-bold text-lg'>Error loading agents</p>
          <p className='text-muted-foreground'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex-1 bg-background p-8 overflow-y-auto'>
      <div className='max-w-7xl mx-auto space-y-12'>
        <div className='space-y-4'>
          <h1 className='text-4xl font-black tracking-tight'>
            Our Premium Agents
          </h1>
          <p className='text-muted-foreground text-lg max-w-2xl'>
            Connect with our world-class real estate experts to find your
            perfect property.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {agents.map((agent) => (
            <div
              key={agent.id}
              className='group bg-card rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5'
            >
              <div className='flex items-start gap-6'>
                <div className='relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-primary/10'>
                  {agent.image ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <User className='w-10 h-10 text-primary' />
                    </div>
                  )}
                </div>
                <div className='flex-1 space-y-2'>
                  <h3 className='text-xl font-black group-hover:text-primary transition-colors'>
                    {agent.name}
                  </h3>
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Mail className='w-4 h-4' />
                    <span className='text-sm font-medium'>{agent.email}</span>
                  </div>
                  <div className='pt-4'>
                    <div className='inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest'>
                      Certified Agent
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 pt-8 border-t border-border/50'>
                <button className='w-full h-14 rounded-2xl bg-foreground text-background font-black hover:bg-primary hover:text-white transition-all duration-300'>
                  View Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>

        {agents.length === 0 && (
          <div className='text-center py-20 bg-card rounded-3xl border border-dashed border-border'>
            <p className='text-muted-foreground font-medium'>
              No agents found at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
