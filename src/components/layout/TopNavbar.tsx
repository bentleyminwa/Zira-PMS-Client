import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/clerk-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  Key,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  Users,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const TopNavbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Buy', href: '/buy', icon: ShoppingBag },
    { name: 'Rent', href: '/rent', icon: Key },
    { name: 'Agents', href: '/agents', icon: Users },
  ];

  return (
    <nav className='h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6'>
      <div className='flex items-center gap-12'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2.5 group'>
          <div className='w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform'>
            <div className='w-4.5 h-4.5 bg-background rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500' />
          </div>
          <span className='font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70'>
            ZIRA<span className='text-primary'>.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-1'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                <item.icon className='w-4 h-4' />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {/* Global Search */}
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

        {/* Theme Toggle */}
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='rounded-full hover:bg-accent/50 group'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-primary' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-primary' />
          <span className='sr-only'>Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-accent/50 relative group'
        >
          <Bell className='h-[1.2rem] w-[1.2rem] group-hover:text-primary transition-colors' />
          <span className='absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background animate-pulse' />
        </Button>

        <div className='h-8 w-[1px] bg-border mx-1' />

        {/* User Profile / Auth */}
        <div className='flex items-center gap-3 pl-2'>
          <div className='hidden flex-col items-end sm:flex'>
            <span className='text-xs font-bold leading-tight'>Guest User</span>
            <span className='text-[10px] text-muted-foreground'>
              Standard Plan
            </span>
          </div>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  'w-9 h-9 rounded-xl border-2 border-primary/20 hover:border-primary transition-colors',
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};
