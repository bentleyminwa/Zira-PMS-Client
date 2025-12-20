import { Badge } from '@/components/ui/badge';
import { Crosshair, Heart } from 'lucide-react';
import React from 'react';

interface PropertyImageHeaderProps {
  imageUrl: string;
  propertyName: string;
}

export const PropertyImageHeader: React.FC<PropertyImageHeaderProps> = ({
  imageUrl,
  propertyName,
}) => {
  return (
    <div className='relative h-2/5 shrink-0'>
      <img
        src={
          imageUrl ||
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
        }
        alt={propertyName}
        className='w-full h-full object-cover'
      />
      <div className='absolute top-4 right-4 flex gap-2'>
        <button className='p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-colors shadow-sm'>
          <Crosshair className='w-4 h-4' />
        </button>
        <button className='p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-colors shadow-sm'>
          <Heart className='w-4 h-4' />
        </button>
      </div>
      <div className='absolute bottom-4 left-4 p-2 rounded-lg bg-black/30 backdrop-blur-sm text-white flex items-center gap-2'>
        <Badge
          variant='secondary'
          className='bg-white/20 text-white border-white/20'
        >
          360°
        </Badge>
        <span className='text-xs font-medium'>2/16 Photos</span>
      </div>
    </div>
  );
};
