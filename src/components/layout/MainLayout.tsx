import { cn } from '@/lib/utils';
import {
  Calendar,
  CreditCard,
  Home,
  LayoutDashboard,
  User,
  Wrench,
} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Maintenance', href: '/dashboard/maintenance', icon: Wrench },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className='flex h-[calc(100vh-64px)] bg-background'>
      {/* Sidebar */}
      <aside className='w-64 border-r border-border bg-card flex flex-col shrink-0'>
        <div className='p-6 border-b border-border flex items-center gap-2.5 font-black text-lg tracking-tight'>
          <div className='w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center'>
            <div className='w-4 h-4 bg-primary rounded-sm rotate-45' />
          </div>
          <span>DASHBOARD</span>
        </div>

        <nav className='flex-1 p-4 space-y-1.5'>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <item.icon className='w-4 h-4' />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className='p-4 border-t border-border bg-accent/5'>
          <div className='p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-3'>
            <p className='text-[10px] font-black uppercase tracking-widest text-primary'>
              Storage Space
            </p>
            <div className='h-1.5 w-full bg-primary/10 rounded-full overflow-hidden'>
              <div className='h-full w-2/3 bg-primary rounded-full' />
            </div>
            <p className='text-[10px] text-muted-foreground font-bold'>
              8.4 GB of 15 GB Used
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 overflow-auto flex flex-col'>{children}</main>
    </div>
  );
};
