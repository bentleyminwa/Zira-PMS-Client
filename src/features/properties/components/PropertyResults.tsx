import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bath, Bed, Heart, MapPin, Move } from 'lucide-react';
import React from 'react';
import type { Property } from '../types';

interface PropertyResultsProps {
  properties: Property[];
  selectedId?: string;
  onSelect: (property: Property) => void;
}

export const PropertyResults: React.FC<PropertyResultsProps> = ({
  properties,
  selectedId,
  onSelect,
}) => {
  return (
    <div className='flex-1 min-w-[500px] p-8 overflow-y-auto space-y-6'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-bold'>
          Results{' '}
          <span className='text-muted-foreground font-normal text-lg'>
            ({properties.length})
          </span>
        </h1>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-muted-foreground'>Sort by:</span>
          <select className='bg-transparent text-sm font-semibold border-none focus:ring-0 cursor-pointer outline-none'>
            <option>Newest items</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        {properties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(property)}
            className={cn(
              'group relative bg-card rounded-2xl p-4 flex gap-6 cursor-pointer border-2 transition-all duration-300',
              selectedId === property.id
                ? 'border-primary ring-4 ring-primary/5'
                : 'border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 shadow-sm'
            )}
          >
            <div className='relative w-48 h-32 rounded-xl overflow-hidden shrink-0'>
              <img
                src={
                  property.image ||
                  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
                }
                alt={property.name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              <button className='absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-white transition-colors'>
                <Heart className='w-3.5 h-3.5' />
              </button>
            </div>

            <div className='flex-1 flex flex-col justify-between py-1'>
              <div>
                <h3 className='text-lg font-bold group-hover:text-primary transition-colors'>
                  {property.name}
                </h3>
                <div className='flex items-center gap-1 text-muted-foreground mt-1'>
                  <MapPin className='w-3.5 h-3.5' />
                  <span className='text-xs'>{property.address}</span>
                </div>
              </div>

              <div className='flex items-baseline gap-1 mt-2'>
                <span className='text-xl font-bold text-primary'>
                  ${property.price.toLocaleString()}
                </span>
              </div>

              <div className='flex items-center gap-6 pt-3 border-t border-border/50 text-muted-foreground'>
                <div className='flex items-center gap-1.5'>
                  <Bed className='w-4 h-4' />
                  <span className='text-xs font-semibold'>
                    {property.bedrooms}{' '}
                    <span className='font-normal opacity-70'>Beds</span>
                  </span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Bath className='w-4 h-4' />
                  <span className='text-xs font-semibold'>
                    {property.bathrooms}{' '}
                    <span className='font-normal opacity-70'>Baths</span>
                  </span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Move className='w-4 h-4' />
                  <span className='text-xs font-semibold'>
                    {property.size}{' '}
                    <span className='font-normal opacity-70'>m²</span>
                  </span>
                </div>
              </div>
            </div>

            <div className='absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button className='text-primary font-bold text-sm hover:underline'>
                View details ›
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
