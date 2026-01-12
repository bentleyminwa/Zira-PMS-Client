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
              <Route path='/' element={<Navigate to='/long-term' replace />} />
              <Route
                path='/long-term'
                element={<PropertyListingsPage bookingType='LONG_TERM' />}
              />
              <Route
                path='/short-term'
                element={<PropertyListingsPage bookingType='SHORT_TERM' />}
              />
              <Route path='/agents' element={<AgentsPage />} />
              <Route path='*' element={<Navigate to='/long-term' replace />} />
            </Routes>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
