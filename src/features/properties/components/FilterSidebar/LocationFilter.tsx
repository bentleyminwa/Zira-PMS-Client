import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import React from 'react';

export const LocationFilter: React.FC = () => {
  return (
    <div className='space-y-4'>
      <Label className='text-sm font-medium text-muted-foreground uppercase tracking-wider'>
        Location
      </Label>
      <div className='relative'>
        <Select defaultValue='California, USA'>
          <SelectTrigger className='w-full pl-10'>
            <MapPin className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
            <SelectValue placeholder='Select location' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='California, USA'>California, USA</SelectItem>
            <SelectItem value='New York, USA'>New York, USA</SelectItem>
            <SelectItem value='London, UK'>London, UK</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
