import { cn } from '@/lib/utils';
import { ShoppingBag, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Properties', href: '/properties', icon: ShoppingBag },
  { name: 'Agents', href: '/agents', icon: Users },
];

export default function DesktopNav() {
  const location = useLocation();

  return (
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
  );
}
