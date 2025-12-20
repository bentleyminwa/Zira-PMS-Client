import { Button } from '@/components/ui/button';
import React from 'react';

export const FilterActions: React.FC = () => {
  return (
    <div className='flex flex-col gap-3 pt-4 border-t border-border'>
      <Button variant='outline' className='w-full h-11 rounded-xl'>
        Reset
      </Button>
      <Button className='w-full h-11 rounded-xl'>Apply</Button>
    </div>
  );
};
