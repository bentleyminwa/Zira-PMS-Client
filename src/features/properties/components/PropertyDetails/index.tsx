import { format } from 'date-fns';
import React from 'react';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import type { Property } from '../../types';
import { PropertyActions } from './PropertyActions';
import { PropertyImageHeader } from './PropertyImageHeader';
import { PropertyStatsGrid } from './PropertyStatsGrid';
import { PropertyTitleSection } from './PropertyTitleSection';

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
      <PropertyImageHeader
        imageUrl={property.image}
        propertyName={property.name}
      />

      <div className='flex-1 p-6 space-y-6'>
        <PropertyTitleSection
          name={property.name}
          address={property.address}
          price={property.price}
          size={property.size}
        />

        <PropertyStatsGrid
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          size={property.size}
        />

        {/* Description and Map removed to fit in one view */}
      </div>

      <PropertyActions
        loading={loading}
        success={success}
        error={error}
        onBooking={handleBooking}
      />
    </div>
  );
};
