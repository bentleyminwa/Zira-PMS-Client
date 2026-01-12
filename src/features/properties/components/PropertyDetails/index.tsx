import React, { useState } from 'react';
import type { Property } from '../../types';
import { CheckoutWizard } from '../Checkout/CheckoutWizard';
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleBooking = () => {
    setIsCheckoutOpen(true);
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
      </div>

      <PropertyActions loading={false} onBooking={handleBooking} />

      <CheckoutWizard
        property={property}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};
