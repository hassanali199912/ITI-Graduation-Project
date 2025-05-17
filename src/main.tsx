import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import IndexProvider from './providers/Index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IndexProvider>
      <App />
    </IndexProvider>
  </StrictMode>,
)
