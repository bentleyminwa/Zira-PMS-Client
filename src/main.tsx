import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import './index.css';
import { queryClient } from './lib/query-client';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={
        import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000'
      }
      signInUrl={`${
        import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000'
      }/sign-in`}
      signUpUrl={`${
        import.meta.env.VITE_ADMIN_URL || 'http://localhost:3000'
      }/sign-up`}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='zira-theme'>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  </React.StrictMode>
);
