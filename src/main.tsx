import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ import BrowserRouter
import App from './App.tsx';
import IndexProvider from './providers/Index.tsx';
import "./assets/styles/main.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap everything in BrowserRouter */}
      <IndexProvider>
        <App />
      </IndexProvider>
    </BrowserRouter>
  </StrictMode>,
);
