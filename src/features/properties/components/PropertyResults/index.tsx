import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import React from 'react';
import type { Property } from '../../types';
import { PropertyCard } from './PropertyCard';
import { ResultsHeader } from './ResultsHeader';

import type { SortOption } from '../../types';

interface PropertyResultsProps {
  properties: Property[];
  selectedId?: string;
  onSelect: (property: Property) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const PropertyResults: React.FC<PropertyResultsProps> = ({
  properties,
  selectedId,
  onSelect,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className='flex-1 min-w-[500px] p-8 overflow-y-auto space-y-6'>
      <ResultsHeader
        count={properties.length}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center justify-center py-24 text-center'
        >
          <div className='bg-muted/50 p-6 rounded-2xl mb-6'>
            <SearchX className='w-12 h-12 text-muted-foreground' />
          </div>
          <div className='max-w-[320px] space-y-2'>
            <h3 className='text-xl font-bold text-foreground'>
              No properties found
            </h3>
            <p className='text-muted-foreground'>
              We couldn't find any properties matching your search criteria. Try
              adjusting your filters or search area.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className='flex flex-col gap-6'>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                isSelected={selectedId === property.id}
                onSelect={() => onSelect(property)}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
