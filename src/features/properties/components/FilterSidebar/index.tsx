import React from 'react';
import { FilterActions } from './FilterActions';
import { LocationFilter } from './LocationFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';

import type { FilterState } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <aside className='w-80 border-r border-border bg-card p-5 space-y-6 shrink-0'>
      <div>
        <h2 className='text-lg font-black mb-3 tracking-tight uppercase'>
          Filters
        </h2>
        <div className='space-y-4'>
          <PropertyTypeFilter
            activeType={filters.type}
            onTypeChange={(type) => onFilterChange({ type })}
          />
        </div>
      </div>

      <LocationFilter
        value={filters.location}
        onChange={(location) => onFilterChange({ location })}
      />

      <PriceRangeFilter
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={(updates) => onFilterChange(updates)}
      />

      <FilterActions onReset={onReset} />
    </aside>
  );
};
