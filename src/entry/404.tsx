import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '@/pages/NotFound';
import '@/style/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  </StrictMode>,
);
