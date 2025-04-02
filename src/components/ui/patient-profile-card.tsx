import { FC } from 'react';
import { Card, CardContent, CardHeader } from './card';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Button } from './button';

export interface PatientProfileData {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  photo?: string;
  alerts?: string[];
  treatmentStatus?: string;
  nextAppointment?: string;
  contactPhone?: string;
  contactEmail?: string;
}

interface PatientProfileCardProps {
  patient: PatientProfileData;
  onCall?: () => void;
  onMessage?: () => void;
}

export const PatientProfileCard: FC<PatientProfileCardProps> = ({
  patient,
  onCall,
  onMessage,
}) => {
  return (
    <Card className="w-full bg-white mb-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patient.photo} alt={patient.name} />
            <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-poppins font-bold">{patient.name}</h2>
            <p className="text-gray-500 font-inter">
              {patient.age} anos • Nascimento: {patient.birthDate}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {onCall && (
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={onCall}
            >
              Ligar
            </Button>
          )}
          {onMessage && (
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={onMessage}
            >
              Mensagem
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 font-inter">
          <div>
            <p className="text-sm text-gray-500">Status de Tratamento</p>
            <p className="font-medium">{patient.treatmentStatus || "Não iniciado"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Próxima Consulta</p>
            <p className="font-medium">{patient.nextAppointment || "Não agendada"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contato Principal</p>
            <p className="font-medium">{patient.contactPhone || "Não informado"}</p>
          </div>
        </div>
        
        {patient.alerts && patient.alerts.length > 0 && (
          <div className="mt-4 bg-red-50 p-2 rounded-md border border-red-200">
            <p className="text-sm font-medium text-red-600">Alertas:</p>
            <ul className="list-disc pl-5 text-sm text-red-600">
              {patient.alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 