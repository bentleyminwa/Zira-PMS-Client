import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Building2,
  Home as HomeIcon,
  MapPin,
  Palmtree,
} from 'lucide-react';
import React from 'react';

interface FilterSidebarProps {
  activeType: string;
  onTypeChange: (type: string) => void;
}

const propertyTypes = [
  { name: 'Apartment', icon: Building2 },
  { name: 'House', icon: HomeIcon },
  { name: 'Commercial', icon: Briefcase },
  { name: 'Villas', icon: Palmtree },
];

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
          <label className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Property type
          </label>
          <div className='grid grid-cols-2 gap-3'>
            {propertyTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => onTypeChange(type.name)}
                className={cn(
                  'flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 gap-1.5',
                  activeType === type.name
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border hover:border-accent hover:bg-accent/5'
                )}
              >
                <type.icon className='w-6 h-6' />
                <span className='text-xs font-semibold'>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

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

      <div className='flex flex-col gap-3 pt-4 border-t border-border'>
        <Button variant='outline' className='w-full h-11 rounded-xl'>
          Reset
        </Button>
        <Button className='w-full h-11 rounded-xl'>Apply</Button>
      </div>
    </aside>
  );
};
