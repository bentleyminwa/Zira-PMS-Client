import { motion } from 'framer-motion';
import React from 'react';
import type { Property } from '../../types';
import { PropertyCard } from './PropertyCard';
import { ResultsHeader } from './ResultsHeader';

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
      <ResultsHeader count={properties.length} />

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
    </div>
  );
};
