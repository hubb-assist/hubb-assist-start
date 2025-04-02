import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import Dashboard from './pages/Dashboard';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <Dashboard />
    </HeroUIProvider>
  );
};

export default App; 