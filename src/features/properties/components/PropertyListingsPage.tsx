import { FilterSidebar } from '@/features/properties/components/FilterSidebar';
import { PropertyDetails } from '@/features/properties/components/PropertyDetails';
import { PropertyResults } from '@/features/properties/components/PropertyResults';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { MOCK_PROPERTIES } from '../config/mockData'; // Keep this for fallback as per instruction
import { useProperties } from '../hooks/useProperties';
import type { Property } from '../types';

interface PropertyListingsPageProps {
  listingType: 'BUY' | 'RENT';
}

export type SortOption = 'newest' | 'price-low' | 'price-high';

export interface FilterState {
  type: string;
  location: string;
  minPrice: number;
  maxPrice: number;
}

const DEFAULT_FILTERS: FilterState = {
  type: 'Apartment',
  location: 'California, USA',
  minPrice: 0,
  maxPrice: 3000000,
};

export const PropertyListingsPage: React.FC<PropertyListingsPageProps> = ({
  listingType,
}) => {
  // 1. All hooks must be called at the very top, unconditionally
  const { properties, loading, error } = useProperties(listingType);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Memoize base properties to avoid unnecessary re-filtering of mock data
  const baseProperties = useMemo(() => {
    return properties.length > 0
      ? properties
      : MOCK_PROPERTIES.filter((p) => p.listingType === listingType);
  }, [properties, listingType]);

  // Memoize filtered and sorted list
  const filteredAndSortedProperties = useMemo(() => {
    return baseProperties
      .filter((p) => {
        if (!p) return false;

        // Defensive checks for potential missing data in Supabase
        const pType = p.type || 'APARTMENT';
        const pCity = p.city || '';
        const pPrice = p.price || 0;

        // Map 'Villas' to 'CONDO' for matching
        const targetType = filters.type === 'Villas' ? 'CONDO' : filters.type;

        const matchesType = pType.toUpperCase() === targetType.toUpperCase();
        const matchesLocation =
          filters.location === 'California, USA' ||
          pCity.toLowerCase().includes(filters.location.toLowerCase()) ||
          filters.location.includes(pCity);
        const matchesPrice =
          pPrice >= filters.minPrice && pPrice <= filters.maxPrice;

        return matchesType && matchesLocation && matchesPrice;
      })
      .sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'newest')
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        return 0;
      });
  }, [baseProperties, filters, sortBy]);

  // Handle initial selection and auto-selection after filtering
  useEffect(() => {
    if (filteredAndSortedProperties.length > 0 && !selectedProperty) {
      setSelectedProperty(filteredAndSortedProperties[0]);
    } else if (filteredAndSortedProperties.length === 0 && selectedProperty) {
      setSelectedProperty(null);
    }
  }, [filteredAndSortedProperties, selectedProperty]);

  // 2. Early returns happen only after all top-level hooks have been called
  if (loading) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-1 items-center justify-center bg-background p-6'>
        <div className='text-center space-y-4 max-w-md'>
          <p className='text-red-500 font-bold text-lg'>
            Error loading properties
          </p>
          <div className='text-muted-foreground bg-muted/50 p-4 rounded-xl border border-border text-sm font-mono break-all'>
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className='text-primary hover:underline text-sm font-semibold'
          >
            Try refreshing the page
          </button>
        </div>
      </div>
    );
  }

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className='flex h-[calc(100vh-64px)] overflow-hidden bg-background'>
      {/* Column 1: Filters */}
      <FilterSidebar
        filters={filters}
        onFilterChange={(updates) =>
          setFilters((prev) => ({ ...prev, ...updates }))
        }
        onReset={handleResetFilters}
      />

      {/* Column 2: Results */}
      <PropertyResults
        properties={filteredAndSortedProperties}
        selectedId={selectedProperty?.id}
        onSelect={setSelectedProperty}
        sortBy={sortBy}
        onSortChange={setSortBy}
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
