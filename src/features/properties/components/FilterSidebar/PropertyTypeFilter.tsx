import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Briefcase, Building2, Home as HomeIcon, Palmtree } from 'lucide-react';
import React from 'react';

interface PropertyTypeFilterProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

const propertyTypes = [
  { name: 'Apartment', icon: Building2 },
  { name: 'House', icon: HomeIcon },
  { name: 'Commercial', icon: Briefcase },
  { name: 'Villas', icon: Palmtree },
];

export const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  activeType,
  onTypeChange,
}) => {
  return (
    <div>
      <label className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
        Property type
      </label>
      <div className='grid grid-cols-2 gap-3 mt-4'>
        {propertyTypes.map((type) => (
          <Button
            key={type.name}
            variant='outline'
            onClick={() => onTypeChange(type.name)}
            className={cn(
              'flex flex-col items-center justify-center p-3 rounded-xl border-2 h-auto hover:text-foreground',
              activeType === type.name
                ? 'border-primary bg-primary/5 text-primary shadow-sm hover:bg-primary/10 hover:text-primary hover:border-primary'
                : 'border-border hover:border-accent hover:bg-accent/5'
            )}
          >
            <type.icon className='w-6 h-6' />
            <span className='text-xs font-semibold'>{type.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
