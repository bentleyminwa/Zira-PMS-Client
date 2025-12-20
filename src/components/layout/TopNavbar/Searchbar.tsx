import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Searchbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className='flex items-center mr-2'>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className='relative overflow-hidden'
          >
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search properties, agents...'
              className='w-full h-9 bg-accent/50 border border-border/50 rounded-lg px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50'
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className='rounded-full hover:bg-accent/50 group ml-1'
      >
        {isSearchOpen ? (
          <X className='h-[1.2rem] w-[1.2rem] text-muted-foreground group-hover:text-primary transition-colors' />
        ) : (
          <Search className='h-[1.2rem] w-[1.2rem] text-muted-foreground group-hover:text-primary transition-colors' />
        )}
      </Button>
    </div>
  );
}
