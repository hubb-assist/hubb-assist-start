import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PatientMenu } from '../components/patients/patient-menu';
import { PatientProfileCard, PatientProfileData } from '../components/ui/patient-profile-card';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { mockPatients, mockClinicalData, ClinicalData } from '../lib/mock-data';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AnamnesisForm from '../components/patients/anamnesis-form';
import PatientImagesGallery from '../components/patients/patient-images-gallery';
import FinancialForm from '../components/patients/financial-form';

const PatientRegistration: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<string>('personal');
  const [patient, setPatient] = useState<PatientProfileData | undefined>(undefined);
  const isNewPatient = id === 'novo';

  // Carrega os dados do paciente com base no ID
  useEffect(() => {
    if (isNewPatient) {
      // Criar um paciente vazio para o formulário de novo paciente
      setPatient({
        id: 'novo',
        name: '',
        birthDate: '',
        age: 0,
        photo: undefined,
        alerts: [],
        treatmentStatus: 'Não iniciado',
        contactPhone: '',
        contactEmail: ''
      });
      return;
    }

    // Se houver ID, busca o paciente
    if (id) {
      const foundPatient = mockPatients.find(p => p.id === id);
      
      if (foundPatient) {
        setPatient(foundPatient);
      } else {
        // Se não encontrar o paciente, redireciona para a lista
        navigate('/pacientes');
      }
    }
  }, [id, navigate, isNewPatient]);

  const handleModuleChange = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  const handleCall = () => {
    if (patient && patient.contactPhone) {
      alert(`Ligando para ${patient.contactPhone}`);
    }
  };

  const handleMessage = () => {
    if (patient && patient.contactPhone) {
      alert(`Enviando mensagem para ${patient.contactPhone}`);
    }
  };

  // Função para renderizar o conteúdo baseado no módulo ativo
  const renderModuleContent = () => {
    if (!patient) return <div className="p-4 text-center">Carregando...</div>;

    const clinicalData: ClinicalData | undefined = !isNewPatient ? mockClinicalData[patient.id] : undefined;

    switch (activeModule) {
      case 'personal':
        return (
          <div className="p-4">
            <h3 className="text-xl font-poppins font-semibold mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nome Completo</p>
                <p className="font-medium">{patient.name || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Nascimento</p>
                <p className="font-medium">{patient.birthDate || 'Não informada'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CPF</p>
                <p className="font-medium">{isNewPatient ? 'Não informado' : '123.456.789-00'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">RG</p>
                <p className="font-medium">{isNewPatient ? 'Não informado' : '12.345.678-9'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado Civil</p>
                <p className="font-medium">{isNewPatient ? 'Não informado' : 'Casado(a)'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profissão</p>
                <p className="font-medium">{isNewPatient ? 'Não informada' : 'Engenheira'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Endereço</p>
                <p className="font-medium">
                  {isNewPatient ? 'Não informado' : 'Rua das Flores, 123 - Jardim Primavera - São Paulo/SP'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patient.contactEmail || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefone</p>
                <p className="font-medium">{patient.contactPhone || 'Não informado'}</p>
              </div>
            </div>
          </div>
        );
      case 'clinical':
        return (
          <div className="p-4">
            <h3 className="text-xl font-poppins font-semibold mb-4">Dados Clínicos</h3>
            {clinicalData ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Condições de Saúde</p>
                  {clinicalData.conditionsList.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {clinicalData.conditionsList.map((condition: string, index: number) => (
                        <li key={index}>{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic">Nenhuma condição registrada</p>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Alergias</p>
                  {clinicalData.allergiesList.length > 0 ? (
                    <ul className="list-disc pl-5 text-red-600">
                      {clinicalData.allergiesList.map((allergy: string, index: number) => (
                        <li key={index}>{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic">Nenhuma alergia registrada</p>
                  )}
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Medicamentos em Uso</p>
                  {clinicalData.medicationsList.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {clinicalData.medicationsList.map((medication: string, index: number) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm italic">Nenhum medicamento registrado</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Histórico Odontológico</p>
                  <p className="mt-1">{clinicalData.dentalHistory}</p>
                </div>
              </>
            ) : (
              <div className="text-center p-4">
                <p>Nenhum dado clínico disponível para este paciente.</p>
                {isNewPatient && (
                  <p className="mt-2 text-sm text-gray-500">
                    Salve o cadastro básico para adicionar informações clínicas.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      
      case 'anamnesis':
        return <AnamnesisForm patientId={patient.id} isNewPatient={isNewPatient} />;
        
      case 'financial':
        return <FinancialForm patientId={patient.id} isNewPatient={isNewPatient} />;
        
      case 'images':
        return <PatientImagesGallery patientId={patient.id} isNewPatient={isNewPatient} />;
        
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-gray-500">Este módulo está em desenvolvimento</p>
            <p className="text-sm text-gray-400 mt-2">Selecione "Dados Pessoais" ou "Dados Clínicos" para visualizar informações</p>
          </div>
        );
    }
  };

  if (!patient) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => navigate('/pacientes')}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Voltar para lista
        </Button>
        
        <h1 className="text-2xl font-poppins font-bold">
          {isNewPatient ? 'Novo Paciente' : `Paciente: ${patient.name}`}
        </h1>
      </div>
      
      {!isNewPatient && (
        <PatientProfileCard 
          patient={patient}
          onCall={handleCall}
          onMessage={handleMessage}
        />
      )}
      
      <div className="flex gap-4 mt-4">
        <PatientMenu onModuleChange={handleModuleChange} initialModule="personal" />
        
        <Card className="flex-1">
          <CardContent className="p-0">
            {renderModuleContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration; 