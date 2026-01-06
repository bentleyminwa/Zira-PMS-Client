import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='ghost' size='icon' className='rounded-full opacity-0'>
        <div className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    );
  }

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='rounded-full hover:bg-accent/50 group relative overflow-hidden h-9 w-9'
    >
      <AnimatePresence mode='wait' initial={false}>
        {isDark ? (
          <motion.div
            key='moon'
            initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='flex items-center justify-center'
          >
            <Moon className='h-[1.2rem] w-[1.2rem] text-primary transition-colors' />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='flex items-center justify-center'
          >
            <Sun className='h-[1.2rem] w-[1.2rem] text-primary transition-colors' />
          </motion.div>
        )}
      </AnimatePresence>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
