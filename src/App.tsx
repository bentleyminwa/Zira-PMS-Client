import { TopNavbar } from '@/components/layout/TopNavbar';
import { AgentsPage } from '@/features/agents/components/AgentsPage';
import { PropertyListingsPage } from '@/features/properties/components/PropertyListingsPage';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useEffect } from 'react';
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
        <RedirectToAdminApp />
      </SignedOut>
    </>
  );
}

function RedirectToAdminApp() {
  useEffect(() => {
    window.location.href = 'https://zira-homes-pm.vercel.app/';
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <p>Redirecting to sign in...</p>
    </div>
  );
}

export default App;
