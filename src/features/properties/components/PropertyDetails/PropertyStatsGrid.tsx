import { Card } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { Bath, Bed, Move, Phone } from 'lucide-react';
import React from 'react';

interface PropertyStatsGridProps {
  bedrooms: number;
  bathrooms: number;
  size: number;
}

interface StatItem {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export const PropertyStatsGrid: React.FC<PropertyStatsGridProps> = ({
  bedrooms,
  bathrooms,
  size,
}) => {
  const stats: StatItem[] = [
    { icon: Bed, label: 'Beds', value: bedrooms },
    { icon: Bath, label: 'Baths', value: bathrooms },
    { icon: Move, label: 'm²', value: size },
    { icon: Phone, label: 'Contact', value: '' },
  ];

  return (
    <div className='grid grid-cols-4 gap-4 py-6 border-y border-border/50'>
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card
            key={index}
            className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2 border-0 shadow-none'
          >
            <Icon className='w-5 h-5 text-primary' />
            <span className='text-[10px] font-bold uppercase text-muted-foreground'>
              {stat.value} {stat.label}
            </span>
          </Card>
        );
      })}
    </div>
  );
};
