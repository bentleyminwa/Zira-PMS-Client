import { Button } from '@/components/ui/button';
import { Heart, MapPin } from 'lucide-react';
import React from 'react';

interface PropertyTitleSectionProps {
  name: string;
  address: string;
  price: number;
  size: number;
}

export const PropertyTitleSection: React.FC<PropertyTitleSectionProps> = ({
  name,
  address,
  price,
  size,
}) => {
  return (
    <div className='space-y-4'>
      <div className='flex items-start justify-between'>
        <div className='space-y-1'>
          <h2 className='text-xl font-black tracking-tight leading-tight'>
            {name}
          </h2>
          <div className='flex items-center gap-1.5 text-muted-foreground'>
            <MapPin className='w-3.5 h-3.5' />
            <span className='text-xs font-bold'>{address}</span>
          </div>
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='text-muted-foreground hover:text-primary transition-colors'
        >
          <Heart className='w-5 h-5' />
        </Button>
      </div>

      <div className='flex items-baseline gap-2'>
        <span className='text-3xl font-black text-primary'>
          ${Number(price).toLocaleString()}
        </span>
        {size > 0 && (
          <span className='text-muted-foreground text-sm font-medium'>
            (${(Number(price) / size).toFixed(0)} / m²)
          </span>
        )}
      </div>
    </div>
  );
};
