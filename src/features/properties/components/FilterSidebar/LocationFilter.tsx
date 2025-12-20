import { MapPin } from 'lucide-react';
import React from 'react';

export const LocationFilter: React.FC = () => {
  return (
    <div className='space-y-4'>
      <label className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
        Location
      </label>
      <div className='relative'>
        <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
        <select className='w-full pl-10 pr-4 py-2 bg-muted border-none rounded-lg text-sm focus:ring-2 focus:ring-primary appearance-none outline-none'>
          <option>California, USA</option>
          <option>New York, USA</option>
          <option>London, UK</option>
        </select>
      </div>
    </div>
  );
};
