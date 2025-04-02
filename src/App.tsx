import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientRegistration from './pages/PatientRegistration';
import DashboardLayout from './layouts/DashboardLayout';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pacientes" element={<PatientList />} />
            <Route path="/pacientes/:id" element={<PatientRegistration />} />
            <Route path="/pacientes/:id/editar" element={<PatientRegistration />} />
            <Route path="/pacientes/novo" element={<PatientRegistration />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </HeroUIProvider>
  );
};

export default App; 