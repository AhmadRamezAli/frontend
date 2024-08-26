import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Dashboard } from './Dashboard.tsx'
import {MySideBar} from './MySideBar.tsx'
import { TooltipProvider } from "@radix-ui/react-tooltip";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <TooltipProvider>
    <Dashboard></Dashboard>
    
    </TooltipProvider>
  </StrictMode>,
)
