import { FC, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface AnamnesisFormProps {
  patientId?: string;
  isNewPatient?: boolean;
}

const AnamnesisForm: FC<AnamnesisFormProps> = ({ patientId, isNewPatient = false }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  
  // Estado para as condições críticas que serão sinalizadas
  const [criticalConditions, setCriticalConditions] = useState<{
    heartCondition: boolean;
    highBloodPressure: boolean;
    diabetes: boolean;
    allergies: boolean;
    pregnant: boolean;
    anticoagulants: boolean;
  }>({
    heartCondition: false,
    highBloodPressure: false,
    diabetes: false,
    allergies: false,
    pregnant: false,
    anticoagulants: false,
  });

  const handleCriticalConditionChange = (condition: keyof typeof criticalConditions) => {
    setCriticalConditions(prev => {
      const newState = { ...prev, [condition]: !prev[condition] };
      // Se alguma condição crítica for marcada, mostrar alerta
      const hasCritical = Object.values(newState).some(value => value);
      setShowAlert(hasCritical);
      return newState;
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-poppins font-semibold mb-4">Anamnese</h3>
      
      {showAlert && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 flex items-start">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Atenção: Condições críticas identificadas</h4>
            <p className="text-sm text-red-700 mt-1">
              Este paciente apresenta condições de saúde que requerem atenção especial durante o tratamento.
            </p>
          </div>
        </div>
      )}

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="general">Saúde Geral</TabsTrigger>
          <TabsTrigger value="family">Histórico Familiar</TabsTrigger>
          <TabsTrigger value="habits">Hábitos</TabsTrigger>
          <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
        </TabsList>
        
        {/* Questionário de Saúde Geral */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <h4 className="font-medium text-lg mb-4">Condições Médicas</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="heartCondition" 
                    checked={criticalConditions.heartCondition}
                    onCheckedChange={() => handleCriticalConditionChange('heartCondition')}
                  />
                  <Label 
                    htmlFor="heartCondition" 
                    className={criticalConditions.heartCondition ? 'text-red-600 font-medium' : ''}
                  >
                    Doenças cardíacas
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="highBloodPressure" 
                    checked={criticalConditions.highBloodPressure}
                    onCheckedChange={() => handleCriticalConditionChange('highBloodPressure')}
                  />
                  <Label 
                    htmlFor="highBloodPressure"
                    className={criticalConditions.highBloodPressure ? 'text-red-600 font-medium' : ''}
                  >
                    Hipertensão arterial
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="diabetes" 
                    checked={criticalConditions.diabetes}
                    onCheckedChange={() => handleCriticalConditionChange('diabetes')}
                  />
                  <Label 
                    htmlFor="diabetes"
                    className={criticalConditions.diabetes ? 'text-red-600 font-medium' : ''}
                  >
                    Diabetes
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rheumatic-fever" 
                  />
                  <Label htmlFor="rheumatic-fever">Febre reumática</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hepatitis" 
                  />
                  <Label htmlFor="hepatitis">Hepatite</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kidney-problems"  
                  />
                  <Label htmlFor="kidney-problems">Problemas renais</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="thyroid" 
                  />
                  <Label htmlFor="thyroid">Problemas na tireoide</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="breathing" 
                  />
                  <Label htmlFor="breathing">Problemas respiratórios</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="allergies" 
                    checked={criticalConditions.allergies}
                    onCheckedChange={() => handleCriticalConditionChange('allergies')}
                  />
                  <Label 
                    htmlFor="allergies"
                    className={criticalConditions.allergies ? 'text-red-600 font-medium' : ''}
                  >
                    Alergias
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="pregnant" 
                    checked={criticalConditions.pregnant}
                    onCheckedChange={() => handleCriticalConditionChange('pregnant')}
                  />
                  <Label 
                    htmlFor="pregnant"
                    className={criticalConditions.pregnant ? 'text-red-600 font-medium' : ''}
                  >
                    Gravidez
                  </Label>
                </div>
              </div>

              <h4 className="font-medium text-lg mt-6 mb-4">Uso de Medicamentos</h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="anticoagulants" 
                    checked={criticalConditions.anticoagulants}
                    onCheckedChange={() => handleCriticalConditionChange('anticoagulants')}
                  />
                  <Label 
                    htmlFor="anticoagulants"
                    className={criticalConditions.anticoagulants ? 'text-red-600 font-medium' : ''}
                  >
                    Anticoagulantes
                  </Label>
                </div>
                
                <div>
                  <Label htmlFor="current-medications" className="block mb-2">
                    Liste todos os medicamentos em uso:
                  </Label>
                  <Textarea 
                    id="current-medications" 
                    placeholder="Ex: Losartana 50mg (1x ao dia), Metformina 850mg (2x ao dia), etc."
                    className="min-h-24"
                  />
                </div>
              </div>

              <h4 className="font-medium text-lg mt-6 mb-4">Detalhes sobre Alergias</h4>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="allergies-details" className="block mb-2">
                    Descreva detalhadamente as alergias (medicamentos, materiais, alimentos):
                  </Label>
                  <Textarea 
                    id="allergies-details" 
                    placeholder="Ex: Alergia à penicilina (urticária), látex (inchaço), amendoim (anafilaxia), etc."
                    className="min-h-24"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Histórico Familiar */}
        <TabsContent value="family" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <h4 className="font-medium text-lg mb-4">Doenças Hereditárias ou Familiares</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="family-diabetes" />
                  <Label htmlFor="family-diabetes">Diabetes</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="family-heart" />
                  <Label htmlFor="family-heart">Problemas cardíacos</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="family-hypertension" />
                  <Label htmlFor="family-hypertension">Hipertensão</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="family-cancer" />
                  <Label htmlFor="family-cancer">Câncer</Label>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="family-details" className="block mb-2">
                  Detalhes sobre doenças familiares relevantes:
                </Label>
                <Textarea 
                  id="family-details" 
                  placeholder="Descreva detalhes sobre as doenças presentes na família, como grau de parentesco e manifestações"
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Hábitos */}
        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <h4 className="font-medium text-lg mb-4">Hábitos Relevantes</h4>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="smoking-habit" className="font-medium block">Tabagismo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="smoking-no" />
                      <Label htmlFor="smoking-no">Não</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="smoking-past" />
                      <Label htmlFor="smoking-past">Ex-fumante</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="smoking-yes" />
                      <Label htmlFor="smoking-yes">Sim</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <Input placeholder="Quantidade por dia" className="max-w-48" />
                    <Input placeholder="Há quanto tempo" className="max-w-48" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="alcohol-habit" className="font-medium block">Consumo de Álcool</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alcohol-no" />
                      <Label htmlFor="alcohol-no">Não</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alcohol-occasional" />
                      <Label htmlFor="alcohol-occasional">Ocasional</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alcohol-frequent" />
                      <Label htmlFor="alcohol-frequent">Frequente</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <Input placeholder="Frequência" className="max-w-48" />
                    <Input placeholder="Tipo de bebida" className="max-w-48" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="other-habits" className="font-medium block">Outros Hábitos Relevantes</Label>
                  <Textarea 
                    id="other-habits" 
                    placeholder="Descreva outros hábitos relevantes como: uso de drogas recreativas, hábitos alimentares específicos, bruxismo, roer unhas, etc."
                    className="min-h-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Informações Adicionais */}
        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="previous-treatments" className="block font-medium mb-2">
                    Tratamentos odontológicos anteriores
                  </Label>
                  <Textarea 
                    id="previous-treatments" 
                    placeholder="Descreva os tratamentos dentários realizados anteriormente"
                    className="min-h-20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="patient-concerns" className="block font-medium mb-2">
                    Queixas principais do paciente
                  </Label>
                  <Textarea 
                    id="patient-concerns" 
                    placeholder="Liste as queixas e preocupações principais relatadas pelo paciente"
                    className="min-h-20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="observations" className="block font-medium mb-2">
                    Observações adicionais
                  </Label>
                  <Textarea 
                    id="observations" 
                    placeholder="Outras informações relevantes para o tratamento do paciente"
                    className="min-h-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6 space-x-3">
        <Button variant="outline">Cancelar</Button>
        <Button 
          variant="default"
          className="bg-secondary hover:bg-secondary/90"
        >
          Salvar Anamnese
        </Button>
      </div>
    </div>
  );
};

export default AnamnesisForm; 