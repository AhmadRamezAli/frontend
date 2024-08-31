import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip'; // Import TooltipProvider
import App from './App.tsx';
import './index.css';
import { Dashboard } from './Dashboard.tsx';
import { Home } from './Home.tsx';
import { Login } from './Login.tsx';
import { Signup } from './Signup.tsx';

const Root = () => {
  const [token, setToken] = useState('');

  const getToken = (tok: string) => {
    setToken(tok);
  };

  return (
    <StrictMode>
      <TooltipProvider> {/* Wrap with TooltipProvider */}
        <Router>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login  />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
