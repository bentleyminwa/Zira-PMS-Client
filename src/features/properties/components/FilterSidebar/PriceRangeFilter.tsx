import { Slider } from '@/components/ui/slider';
import React from 'react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChange: (updates: { minPrice?: number; maxPrice?: number }) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const handleSliderChange = (value: number[]) => {
    onChange({ minPrice: value[0], maxPrice: value[1] });
  };

  return (
    <div className='space-y-4'>
      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
        Price range
      </label>
      <div className='space-y-2'>
        <div className='relative h-24 flex items-end px-2 gap-1'>
          {/* Mock chart bars */}
          {[30, 45, 35, 60, 40, 75, 50, 40, 55, 35, 45, 30, 50, 40].map(
            (h, i) => (
              <div
                key={i}
                className='flex-1 bg-primary/10 rounded-t-lg'
                style={{ height: `${h}%` }}
              />
            )
          )}

          <div className='absolute inset-x-0 bottom-0 py-2'>
            <Slider
              defaultValue={[0, 5000000]}
              value={[minPrice, maxPrice]}
              max={5000000}
              step={10000}
              onValueChange={handleSliderChange}
            />
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex-1 space-y-1'>
            <span className='text-[10px] text-muted-foreground uppercase'>
              Min
            </span>
            <div className='font-semibold px-3 py-1.5 bg-background border border-border rounded-lg text-sm'>
              $ {minPrice.toLocaleString()}
            </div>
          </div>
          <div className='text-muted-foreground'>—</div>
          <div className='flex-1 space-y-1'>
            <span className='text-[10px] text-muted-foreground uppercase'>
              Max
            </span>
            <div className='font-semibold px-3 py-1.5 bg-background border border-border rounded-lg text-sm'>
              $ {maxPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
