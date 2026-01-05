import { Button } from '@/components/ui/button';
import React from 'react';

interface FilterActionsProps {
  onReset: () => void;
}

export const FilterActions: React.FC<FilterActionsProps> = ({ onReset }) => {
  return (
    <div className='flex flex-col gap-3 pt-4 border-t border-border'>
      <Button
        variant='outline'
        className='w-full h-11 rounded-xl'
        onClick={onReset}
      >
        Reset
      </Button>
      <Button className='w-full h-11 rounded-xl'>Apply</Button>
    </div>
  );
};
