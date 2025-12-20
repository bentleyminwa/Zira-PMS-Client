import React from 'react';

export const PriceRangeFilter: React.FC = () => {
  return (
    <div className='space-y-4'>
      <label className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
        Price range
      </label>
      <div className='space-y-4'>
        <div className='h-20 bg-primary/5 rounded-xl border border-primary/10 relative overflow-hidden flex items-end px-4 gap-1'>
          {/* Mock chart bars */}
          {[40, 60, 45, 80, 55, 90, 70, 50, 65, 45].map((h, i) => (
            <div
              key={i}
              className='flex-1 bg-primary/20 rounded-t-sm'
              style={{ height: `${h}%` }}
            />
          ))}
          <div className='absolute inset-x-0 bottom-4 flex justify-between px-2 items-center'>
            <div className='w-4 h-4 rounded-full bg-background border-2 border-primary shadow-md' />
            <div className='flex-1 border-t-2 border-primary mx-1' />
            <div className='w-4 h-4 rounded-full bg-background border-2 border-primary shadow-md' />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex-1 space-y-1'>
            <span className='text-[10px] text-muted-foreground uppercase'>
              Min
            </span>
            <div className='font-semibold px-3 py-1.5 bg-background border border-border rounded-lg'>
              $ 150,000
            </div>
          </div>
          <div className='text-muted-foreground'>—</div>
          <div className='flex-1 space-y-1'>
            <span className='text-[10px] text-muted-foreground uppercase'>
              Max
            </span>
            <div className='font-semibold px-3 py-1.5 bg-background border border-border rounded-lg'>
              $ 350,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
