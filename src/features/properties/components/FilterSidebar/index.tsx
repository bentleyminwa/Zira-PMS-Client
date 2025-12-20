import React from 'react';
import { FilterActions } from './FilterActions';
import { LocationFilter } from './LocationFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';

interface FilterSidebarProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  activeType,
  onTypeChange,
}) => {
  return (
    <aside className='w-80 border-r border-border bg-card p-5 space-y-6 shrink-0'>
      <div>
        <h2 className='text-lg font-black mb-3 tracking-tight uppercase'>
          Filters
        </h2>
        <div className='space-y-4'>
          <PropertyTypeFilter
            activeType={activeType}
            onTypeChange={onTypeChange}
          />
        </div>
      </div>

      <LocationFilter />

      <PriceRangeFilter />

      <FilterActions />
    </aside>
  );
};
