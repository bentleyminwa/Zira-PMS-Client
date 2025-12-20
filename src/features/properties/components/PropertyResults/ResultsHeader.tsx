import React from 'react';

interface ResultsHeaderProps {
  count: number;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({ count }) => {
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
        <select className='bg-transparent text-sm font-semibold border-none focus:ring-0 cursor-pointer outline-none'>
          <option>Newest items</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
