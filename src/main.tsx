import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import App from './App.tsx'
import { TransitionProvider } from './context/TransitionContext.tsx'
import TransitionOverlay from './components/transition/TransitionOverlay.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <App />
        <TransitionOverlay />
      </TransitionProvider>
    </BrowserRouter>
  </StrictMode>,
)
