import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to='/' className='flex items-center gap-2.5 group'>
      <div className='w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform'>
        <div className='w-4.5 h-4.5 bg-background rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500' />
      </div>
      <span className='font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70'>
        ZIRA<span className='text-primary'>.</span>
      </span>
    </Link>
  );
}
