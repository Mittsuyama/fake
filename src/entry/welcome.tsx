import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import '@/style/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  </StrictMode>,
);
