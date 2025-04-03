import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/lib/mock-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline';

const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(mockPatients);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };

  const handleView = (id: string) => {
    navigate(`/pacientes/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/pacientes/${id}/editar`);
  };

  const handleCreate = () => {
    navigate('/pacientes/novo');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <Button 
          onClick={handleCreate}
          className="bg-secondary hover:bg-secondary/90"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Novo Paciente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.photo} alt={patient.name} />
                    <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">
                      {patient.age} anos • Próxima consulta: {patient.nextAppointment || 'Não agendada'}
                    </p>
                    {patient.alerts && patient.alerts.length > 0 && (
                      <p className="text-xs text-red-500 mt-1">
                        Alertas: {patient.alerts.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleView(patient.id)}
                    title="Ver detalhes"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEdit(patient.id)}
                    title="Editar"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList; 