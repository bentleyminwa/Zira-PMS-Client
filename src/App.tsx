import { TopNavbar } from '@/components/layout/TopNavbar';
import { AgentsPage } from '@/features/agents/components/AgentsPage';
import { PropertyListingsPage } from '@/features/properties/components/PropertyListingsPage';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
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
        <RedirectToSignIn redirectUrl='https://zira-homes-pm.vercel.app/sign-in' />
      </SignedOut>
    </>
  );
}

export default App;
