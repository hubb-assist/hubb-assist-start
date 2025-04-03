import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { UserIcon, PhotoIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Patient {
  id: string;
  name: string;
  photo?: string;
  birthDate: string;
  contactPhone: string;
}

const Hof: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Carregar pacientes do localStorage ou API
  useEffect(() => {
    // Buscar da API ou localStorage - mockado por enquanto
    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Maria Silva',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        birthDate: '1985-06-12',
        contactPhone: '(11) 98765-4321'
      },
      {
        id: '2',
        name: 'João Oliveira',
        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        birthDate: '1978-03-25',
        contactPhone: '(11) 91234-5678'
      },
      {
        id: '3',
        name: 'Ana Souza',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        birthDate: '1990-11-08',
        contactPhone: '(11) 97654-3210'
      },
      {
        id: '4',
        name: 'Carlos Ferreira',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        birthDate: '1965-09-18',
        contactPhone: '(11) 98901-2345'
      }
    ];
    
    setPatients(mockPatients);
  }, []);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    // Salvar no localStorage para persistência entre páginas
    localStorage.setItem('hof.paciente', JSON.stringify(patient));
    // Em um cenário real, redirecionaria para a página de seleção de imagem
    window.location.href = `/hof/selecionar-imagem/${patient.id}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">HUBB HOF</h1>
        <p className="text-gray-500 mt-2">
          Planejamento de Harmonização Orofacial com Inteligência Artificial
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-secondary" />
            <span>Selecione um Paciente para Iniciar</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {patients.map((patient) => (
              <Card 
                key={patient.id} 
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectPatient(patient)}
              >
                <div className="p-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    {patient.photo ? (
                      <AvatarImage src={patient.photo} alt={patient.name} />
                    ) : (
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.contactPhone}</p>
                  </div>
                </div>
                <div className="bg-secondary/10 p-2 flex justify-end">
                  <Button size="sm" variant="ghost" className="text-xs">
                    <span>Selecionar</span>
                    <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhotoIcon className="h-5 w-5 text-blue-600" />
              <span>Modo Manual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Selecione áreas do rosto, procedimentos e insumos manualmente, com cálculo automático de valores.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 mb-4">
              <li>Seleção precisa de áreas para tratamento</li>
              <li>Controle total sobre procedimentos e insumos</li>
              <li>Cálculos automáticos de custos e tempo</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4c0 1.608-.832 3.01-2.088 3.832.735.761 1.096 1.82 1.096 3.168h-6.016c0-1.347.361-2.406 1.096-3.168C8.832 9.011 8 7.608 8 6a4 4 0 0 1 4-4z" />
                <path d="M6 13.868c-3.721.474-6 1.975-6 3.132 0 1.657 4.03 3 9 3s9-1.343 9-3c0-1.157-2.279-2.658-6-3.132" />
              </svg>
              <span>Modo com IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Análise automática com IA que detecta pontos anatômicos e sugere procedimentos baseados em simetria.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 mb-4">
              <li>Detecção automática de pontos anatômicos</li>
              <li>Análise baseada em proporção áurea</li>
              <li>Sugestões inteligentes de procedimentos</li>
              <li>Simulação visual de resultados</li>
            </ul>
            <div className="mt-2 text-xs text-purple-700 bg-purple-50 p-2 rounded">
              <strong>Recomendado:</strong> Para melhor precisão, utilize fotografias frontais padronizadas.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hof; 