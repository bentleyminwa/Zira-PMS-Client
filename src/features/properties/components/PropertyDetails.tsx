import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Bath,
  Bed,
  Crosshair,
  Heart,
  Mail,
  MapPin,
  Move,
  Phone,
} from 'lucide-react';
import React from 'react';
import { useCreateBooking } from '../hooks/useCreateBooking';
import type { Property } from '../types';

interface PropertyDetailsProps {
  property: Property;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
}) => {
  const { createBooking, loading, success, error } = useCreateBooking();

  const handleBooking = async () => {
    await createBooking({
      propertyId: property.id,
      leaseType: 'LONG_TERM',
      startDate: format(new Date(), 'yyyy-MM-dd'),
    });
  };
  return (
    <div className='h-full bg-card border-l border-border flex flex-col overflow-hidden'>
      <div className='relative h-2/5 shrink-0'>
        <img
          src={
            property.image ||
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
          }
          alt={property.name}
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

      <div className='flex-1 p-6 space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-start justify-between'>
            <div className='space-y-1'>
              <h2 className='text-xl font-black tracking-tight leading-tight'>
                {property.name}
              </h2>
              <div className='flex items-center gap-1.5 text-muted-foreground'>
                <MapPin className='w-3.5 h-3.5' />
                <span className='text-xs font-bold'>{property.address}</span>
              </div>
            </div>
            <button className='text-muted-foreground hover:text-primary transition-colors'>
              <Heart className='w-5 h-5' />
            </button>
          </div>

          <div className='flex items-baseline gap-2'>
            <span className='text-3xl font-black text-primary'>
              ${Number(property.price).toLocaleString()}
            </span>
            {property.size > 0 && (
              <span className='text-muted-foreground text-sm font-medium'>
                (${(Number(property.price) / property.size).toFixed(0)} / m²)
              </span>
            )}
          </div>

          <div className='grid grid-cols-4 gap-4 py-6 border-y border-border/50'>
            <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
              <Bed className='w-5 h-5 text-primary' />
              <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                {property.bedrooms} Beds
              </span>
            </div>
            <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
              <Bath className='w-5 h-5 text-primary' />
              <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                {property.bathrooms} Baths
              </span>
            </div>
            <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
              <Move className='w-5 h-5 text-primary' />
              <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                {property.size} m²
              </span>
            </div>
            <div className='bg-accent/30 p-3 rounded-xl flex flex-col items-center gap-2'>
              <Phone className='w-5 h-5 text-primary' />
              <span className='text-[10px] font-bold uppercase text-muted-foreground'>
                Contact
              </span>
            </div>
          </div>
        </div>

        {/* Description and Map removed to fit in one view */}
      </div>

      <div className='p-6 border-t border-border flex flex-col gap-3'>
        {error && (
          <p className='text-xs text-red-500 font-medium text-center'>
            {error}
          </p>
        )}
        {success && (
          <p className='text-xs text-green-600 font-medium text-center'>
            Request sent successfully!
          </p>
        )}

        <div className='flex items-center gap-3'>
          <Button variant='outline' className='h-14 w-14 rounded-2xl shrink-0'>
            <Phone className='w-5 h-5' />
          </Button>
          <Button
            className='flex-1 h-14 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50'
            onClick={handleBooking}
            disabled={loading || success}
          >
            {loading
              ? 'Sending...'
              : success
              ? 'Request Sent'
              : 'Check Availability'}
          </Button>
          <Button variant='outline' className='h-14 w-14 rounded-2xl shrink-0'>
            <Mail className='w-5 h-5' />
          </Button>
        </div>
      </div>
    </div>
  );
};
