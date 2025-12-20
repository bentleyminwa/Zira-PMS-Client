import { Bath, Bed, Move, Phone } from 'lucide-react';
import React from 'react';

interface PropertyStatsGridProps {
  bedrooms: number;
  bathrooms: number;
  size: number;
}

export const PropertyStatsGrid: React.FC<PropertyStatsGridProps> = ({
  bedrooms,
  bathrooms,
  size,
}) => {
  return (
    <div className='grid grid-cols-4 gap-4 py-6 border-y border-border/50'>
      <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
        <Bed className='w-5 h-5 text-primary' />
        <span className='text-[10px] font-bold uppercase text-muted-foreground'>
          {bedrooms} Beds
        </span>
      </div>
      <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
        <Bath className='w-5 h-5 text-primary' />
        <span className='text-[10px] font-bold uppercase text-muted-foreground'>
          {bathrooms} Baths
        </span>
      </div>
      <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
        <Move className='w-5 h-5 text-primary' />
        <span className='text-[10px] font-bold uppercase text-muted-foreground'>
          {size} m²
        </span>
      </div>
      <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
        <Phone className='w-5 h-5 text-primary' />
        <span className='text-[10px] font-bold uppercase text-muted-foreground'>
          Contact
        </span>
      </div>
    </div>
  );
};
