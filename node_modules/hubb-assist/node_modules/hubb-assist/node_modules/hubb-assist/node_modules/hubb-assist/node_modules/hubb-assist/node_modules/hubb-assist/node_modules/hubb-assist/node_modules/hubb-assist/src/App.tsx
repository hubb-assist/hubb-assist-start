import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import PatientRegistration from './pages/PatientRegistration';
import Costs from './pages/Costs';
import Procedures from './pages/Procedures';
import Supplies from './pages/Supplies';
import Hof from './pages/Hof';
import ImageSelection from './pages/ImageSelection';
import Planning from './pages/Planning';
import DashboardLayout from './layouts/DashboardLayout';
import './styles/globals.css';
import Home from './pages/Home';
import Agenda from './pages/Agenda';
import Patients from './pages/Patients';
import Hunter from './pages/Hunter';

const App: React.FC = () => {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/pacientes/:id" element={<PatientRegistration />} />
            <Route path="/pacientes/:id/editar" element={<PatientRegistration />} />
            <Route path="/pacientes/novo" element={<PatientRegistration />} />
            <Route path="/custos" element={<Costs />} />
            <Route path="/custos/procedimentos" element={<Procedures />} />
            <Route path="/custos/insumos" element={<Supplies />} />
            <Route path="/hof" element={<Hof />} />
            <Route path="/hof/selecionar-imagem/:patientId" element={<ImageSelection />} />
            <Route path="/hof/planejamento/:patientId/:imageId" element={<Planning />} />
            <Route path="/hunter" element={<Hunter />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </HeroUIProvider>
  );
};

export default App; 