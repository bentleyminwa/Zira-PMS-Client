import { TopNavbar } from '@/components/layout/TopNavbar';
import { AgentsPage } from '@/features/agents/components/AgentsPage';
import { PropertyListingsPage } from '@/features/properties/components/PropertyListingsPage';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <SignedIn>
        <div className='flex flex-col min-h-screen'>
          <TopNavbar />
          <main className='flex-1 flex flex-col'>
            <Routes>
              <Route path='/' element={<Navigate to='/buy' replace />} />
              <Route
                path='/buy'
                element={<PropertyListingsPage listingType='BUY' />}
              />
              <Route
                path='/rent'
                element={<PropertyListingsPage listingType='RENT' />}
              />
              <Route path='/agents' element={<AgentsPage />} />
              <Route path='*' element={<Navigate to='/buy' replace />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <div className='flex flex-col items-center justify-center min-h-screen space-y-4'>
          <h1 className='text-2xl font-bold'>Welcome to Zira Homes</h1>
          <p className='text-muted-foreground'>
            Please sign in to access your dashboard
          </p>
          <button
            onClick={() => {
              const ADMIN_URL =
                import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000';
              window.location.href = `${ADMIN_URL}/sign-in`;
            }}
            className='px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'
          >
            Sign In with Zira Account
          </button>
        </div>
      </SignedOut>
    </>
  );
}

export default App;
