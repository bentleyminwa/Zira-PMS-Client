import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export default function Notifications() {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='rounded-full hover:bg-accent/50 relative group'
    >
      <Bell className='h-[1.2rem] w-[1.2rem] group-hover:text-primary transition-colors' />
      <span className='absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background animate-pulse' />
    </Button>
  );
}
