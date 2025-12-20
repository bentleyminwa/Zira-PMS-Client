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
          <button
            key={type.name}
            onClick={() => onTypeChange(type.name)}
            className={cn(
              'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 gap-1.5',
              activeType === type.name
                ? 'border-primary bg-primary/5 text-primary shadow-sm'
                : 'border-border hover:border-accent hover:bg-accent/5'
            )}
          >
            <type.icon className='w-6 h-6' />
            <span className='text-xs font-semibold'>{type.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
