import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientList from './PatientList';

const Patients: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <PatientList />
    </div>
  );
};

export default Patients; 