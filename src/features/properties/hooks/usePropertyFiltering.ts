import { useMemo, useState } from 'react';
import { MOCK_PROPERTIES } from '../config/mockData';
import type { FilterState, Property, SortOption } from '../types';

const DEFAULT_FILTERS: FilterState = {
  type: 'Apartment',
  location: 'California, USA',
  minPrice: 0,
  maxPrice: 3000000,
};

export function usePropertyFiltering(
  properties: Property[],
  listingType: 'BUY' | 'RENT'
) {
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

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredAndSortedProperties,
    handleResetFilters,
  };
}
