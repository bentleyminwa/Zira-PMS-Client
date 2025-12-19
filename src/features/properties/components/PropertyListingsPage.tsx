import { FilterSidebar } from '@/features/properties/components/FilterSidebar';
import { PropertyDetails } from '@/features/properties/components/PropertyDetails';
import { PropertyResults } from '@/features/properties/components/PropertyResults';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MOCK_PROPERTIES } from '../config/mockData'; // Keep this for fallback as per instruction
import { useProperties } from '../hooks/useProperties';
import type { Property } from '../types';

interface PropertyListingsPageProps {
  listingType: 'BUY' | 'RENT';
}

export const PropertyListingsPage: React.FC<PropertyListingsPageProps> = ({
  listingType,
}) => {
  const { properties, loading, error } = useProperties(listingType);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [activeType, setActiveType] = useState<string>('Apartment');

  // Set initial selection when data arrives
  useEffect(() => {
    if (properties.length > 0 && !selectedProperty) {
      setSelectedProperty(properties[0]);
    }
  }, [properties, selectedProperty]);

  if (loading) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background'>
        <div className='text-center space-y-4'>
          <p className='text-red-500 font-bold text-lg'>
            Error loading properties
          </p>
          <p className='text-muted-foreground'>{error}</p>
        </div>
      </div>
    );
  }

  const filteredProperties =
    properties.length > 0 ? properties : MOCK_PROPERTIES;

  return (
    <div className='flex h-[calc(100vh-64px)] overflow-hidden bg-background'>
      {/* Column 1: Filters */}
      <FilterSidebar activeType={activeType} onTypeChange={setActiveType} />

      {/* Column 2: Results */}
      <PropertyResults
        properties={filteredProperties}
        selectedId={selectedProperty?.id}
        onSelect={setSelectedProperty}
      />

      {/* Column 3: Details */}
      <AnimatePresence mode='wait'>
        {selectedProperty && (
          <motion.div
            key={selectedProperty.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className='flex-1 min-w-[400px]'
          >
            <PropertyDetails property={selectedProperty} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
