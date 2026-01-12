import { FilterSidebar } from '@/features/properties/components/FilterSidebar';
import { PropertyDetails } from '@/features/properties/components/PropertyDetails';
import { PropertyResults } from '@/features/properties/components/PropertyResults';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { usePropertyFiltering } from '../hooks/usePropertyFiltering';

interface PropertyListingsPageProps {}

export const PropertyListingsPage: React.FC<PropertyListingsPageProps> = () => {
  const { properties, loading, error } = useProperties();
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredAndSortedProperties,
    handleResetFilters,
  } = usePropertyFiltering(properties);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProperty = React.useMemo(() => {
    if (filteredAndSortedProperties.length === 0) return null;
    const found = filteredAndSortedProperties.find((p) => p.id === selectedId);
    return found || filteredAndSortedProperties[0];
  }, [filteredAndSortedProperties, selectedId]);

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

  return (
    <div className='flex h-[calc(100vh-64px)] overflow-hidden bg-background'>
      <FilterSidebar
        filters={filters}
        onFilterChange={(updates) =>
          setFilters((prev) => ({ ...prev, ...updates }))
        }
        onReset={handleResetFilters}
      />

      <PropertyResults
        properties={filteredAndSortedProperties}
        selectedId={selectedProperty?.id}
        onSelect={(p) => setSelectedId(p.id)}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

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
