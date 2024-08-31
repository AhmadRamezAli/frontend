import { useState } from 'react'
import reactLogo from './asimport{Login} from './Login.tsx';sets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { Dashboard } from './Dashboard.tsx'
import {MySideBar} from './MySideBar.tsx'
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {Home} from './Home.tsx';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
  //   <Router>
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/login" element={<Login handleToken={getToken} />} />
  //     <Route path="/dashboard" element={<Dashboard token={token} />} />
      
  //   </Routes>
  // </Router>
  )
}

export default App
