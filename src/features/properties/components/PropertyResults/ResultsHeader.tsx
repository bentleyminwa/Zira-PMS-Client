import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

import type { SortOption } from '../PropertyListingsPage';

interface ResultsHeaderProps {
  count: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: 'newest', label: 'Newest items' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  count,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <h1 className='text-2xl font-bold'>
        Results{' '}
        <span className='text-muted-foreground font-normal text-lg'>
          ({count})
        </span>
      </h1>
      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>Sort by:</span>
        <Select
          value={sortBy}
          onValueChange={(val) => onSortChange(val as SortOption)}
        >
          <SelectTrigger className='w-auto border-none bg-transparent text-sm font-semibold focus:ring-0 h-auto p-0 gap-1'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
