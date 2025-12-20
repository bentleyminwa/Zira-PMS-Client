import React from 'react';
import DesktopNav from './DesktopNav';
import Logo from './Logo';
import Notifications from './Notifications';
import Searchbar from './Searchbar';
import ThemeToggle from './Theme-toggle';
import UserProfile from './UserProfile';

export const TopNavbar: React.FC = () => {
  return (
    <nav className='h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6'>
      <div className='flex items-center gap-12'>
        <Logo />
        <DesktopNav />
      </div>

      <div className='flex items-center gap-3'>
        <Searchbar />
        <ThemeToggle />
        <Notifications />

        <div className='h-8 w-px bg-border mx-1' />

        <UserProfile />
      </div>
    </nav>
  );
};
