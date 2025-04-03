import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon,
  ArrowDownTrayIcon, 
  DocumentDuplicateIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// Define interfaces
interface Patient {
  id: string;
  name: string;
  photo?: string;
}

interface PatientImage {
  id: string;
  src: string;
  title: string;
  type: string;
}

interface Procedure {
  id: string;
  nome: string;
  valor_base: number;
  tempo_estimado: number;
  insumos: string[];
}

interface Supply {
  id: string;
  nome: string;
  tipo: string;
  custo_unitario: number;
  unidade: string;
}

interface FacialRegion {
  id: string;
  name: string;
  procedures: string[];
}

interface SelectedProcedure {
  id: string;
  nome: string;
  area: string;
  insumo: string;
  quantidade: number;
  valor: number;
  tempo: number;
}

// Lista de regiões faciais disponíveis
const facialRegions: FacialRegion[] = [
  { 
    id: 'glabela', 
    name: 'Glabela', 
    procedures: ['toxina']
  },
  { 
    id: 'zigomatico', 
    name: 'Zigomático', 
    procedures: ['preenchimento']
  },
  { 
    id: 'labios', 
    name: 'Lábios', 
    procedures: ['preenchimento']
  },
  { 
    id: 'mandibula', 
    name: 'Mandíbula', 
    procedures: ['preenchimento', 'toxina']
  },
  { 
    id: 'mento', 
    name: 'Mento (Queixo)', 
    procedures: ['preenchimento']
  },
  { 
    id: 'nasogeniano', 
    name: 'Sulco Nasogeniano', 
    procedures: ['preenchimento']
  },
  { 
    id: 'papada', 
    name: 'Papada', 
    procedures: ['toxina']
  }
];

const Planning: React.FC = () => {
  const { patientId, imageId } = useParams<{ patientId: string; imageId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedImage, setSelectedImage] = useState<PatientImage | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [selectedProcedures, setSelectedProcedures] = useState<SelectedProcedure[]>([]);
  
  // Estado para o modal de seleção de região
  const [selectedRegion, setSelectedRegion] = useState<FacialRegion | null>(null);
  const [showRegionModal, setShowRegionModal] = useState(false);
  
  // Estado para a visualização do paciente
  const [showPatientView, setShowPatientView] = useState(false);
  
  // Carregar dados necessários
  useEffect(() => {
    // Carregar paciente
    const storedPatient = localStorage.getItem('hof.paciente');
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
    
    // Carregar imagem selecionada
    const storedImage = localStorage.getItem('hof.imagemSelecionada');
    if (storedImage) {
      setSelectedImage(JSON.parse(storedImage));
    } else {
      // Se não houver imagem salva, use uma imagem padrão
      setSelectedImage({
        id: 'default',
        src: 'https://placehold.co/600x800/E72A4A/FFFFFF?text=Foto+Paciente',
        title: 'Imagem Padrão',
        type: 'frontal'
      });
    }
    
    // Carregar procedimentos do localStorage ou usar dados mockados
    const storedProcedures = localStorage.getItem('procedimentos');
    if (storedProcedures) {
      setProcedures(JSON.parse(storedProcedures));
    } else {
      // Dados mockados de procedimentos
      const mockProcedures: Procedure[] = [
        {
          id: 'proc-001',
          nome: 'Toxina Botulínica',
          valor_base: 900.00,
          tempo_estimado: 30,
          insumos: ['toxina-a', 'toxina-b']
        },
        {
          id: 'proc-002',
          nome: 'Preenchimento com Ácido Hialurônico',
          valor_base: 1200.00,
          tempo_estimado: 45,
          insumos: ['ah-1ml', 'ah-2ml']
        }
      ];
      setProcedures(mockProcedures);
    }
    
    // Carregar insumos do localStorage ou usar dados mockados
    const storedSupplies = localStorage.getItem('insumos');
    if (storedSupplies) {
      setSupplies(JSON.parse(storedSupplies));
    } else {
      // Dados mockados de insumos
      const mockSupplies: Supply[] = [
        {
          id: 'toxina-a',
          nome: 'Toxina Botulínica Tipo A',
          tipo: 'toxina',
          custo_unitario: 400.00,
          unidade: 'Frasco'
        },
        {
          id: 'ah-1ml',
          nome: 'Ácido Hialurônico 1ml',
          tipo: 'preenchimento',
          custo_unitario: 600.00,
          unidade: 'Seringa 1ml'
        },
        {
          id: 'ah-2ml',
          nome: 'Ácido Hialurônico 2ml',
          tipo: 'preenchimento',
          custo_unitario: 900.00,
          unidade: 'Seringa 2ml'
        }
      ];
      setSupplies(mockSupplies);
    }
  }, [patientId, imageId]);

  // Manipular clique na região facial
  const handleRegionClick = (region: FacialRegion) => {
    setSelectedRegion(region);
    setShowRegionModal(true);
  };

  // Adicionar procedimento ao planejamento
  const handleAddProcedure = (
    procedureName: string, 
    region: string, 
    supplyName: string, 
    quantity: number = 1,
    value: number = 1200,
    timeEstimate: number = 45
  ) => {
    const newProcedure: SelectedProcedure = {
      id: `proc-${Date.now()}`,
      nome: procedureName,
      area: region,
      insumo: supplyName,
      quantidade: quantity,
      valor: value,
      tempo: timeEstimate
    };
    
    setSelectedProcedures([...selectedProcedures, newProcedure]);
    setShowRegionModal(false);
  };

  // Remover procedimento do planejamento
  const handleRemoveProcedure = (procedureId: string) => {
    setSelectedProcedures(selectedProcedures.filter(proc => proc.id !== procedureId));
  };

  // Calcular valor total do planejamento
  const calculateTotalValue = () => {
    return selectedProcedures.reduce((total, proc) => total + proc.valor, 0);
  };

  // Calcular tempo total estimado
  const calculateTotalTime = () => {
    return selectedProcedures.reduce((total, proc) => total + proc.tempo, 0);
  };

  // Gerar guia orçamentária
  const handleGenerateQuote = () => {
    alert('Guia orçamentária gerada com sucesso!');
    // Em um cenário real, isso salvaria os dados e geraria um PDF
  };

  // Componente para mostrar a região facial selecionada e procedimentos disponíveis
  const RegionSelectionModal = () => {
    if (!selectedRegion) return null;
    
    const [selectedProcedure, setSelectedProcedure] = useState('');
    const [selectedSupply, setSelectedSupply] = useState('');
    const [quantity, setQuantity] = useState(1);
    
    const filteredProcedures = procedures.filter(proc => 
      selectedRegion.procedures.includes(proc.id) || 
      selectedRegion.procedures.includes(proc.nome.toLowerCase())
    );
    
    const filteredSupplies = supplies.filter(supply => 
      selectedProcedure && supply.tipo.toLowerCase() === selectedProcedure.toLowerCase()
    );
    
    // Valores estimados (em um cenário real, seriam calculados com base nos dados selecionados)
    const estimatedTime = 45;
    const estimatedCost = 1200;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Região: {selectedRegion.name}</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowRegionModal(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Procedimento</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedProcedure}
                onChange={(e) => setSelectedProcedure(e.target.value)}
              >
                <option value="">Selecione um procedimento</option>
                <option value="preenchimento">Preenchimento</option>
                <option value="toxina">Toxina Botulínica</option>
              </select>
            </div>
            
            {selectedProcedure && (
              <div>
                <label className="block text-sm font-medium mb-1">Insumo</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={selectedSupply}
                  onChange={(e) => setSelectedSupply(e.target.value)}
                >
                  <option value="">Selecione um insumo</option>
                  {selectedProcedure === 'preenchimento' ? (
                    <>
                      <option value="Ácido Hialurônico (1ml)">Ácido Hialurônico (1ml)</option>
                      <option value="Ácido Hialurônico (2ml)">Ácido Hialurônico (2ml)</option>
                    </>
                  ) : (
                    <option value="Toxina Botulínica Tipo A">Toxina Botulínica Tipo A</option>
                  )}
                </select>
              </div>
            )}
            
            {selectedSupply && (
              <div>
                <label className="block text-sm font-medium mb-1">Quantidade</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={quantity.toString()}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            )}
            
            {selectedProcedure && selectedSupply && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tempo estimado:</span>
                  <span className="font-medium">{estimatedTime} min</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-600">Custo estimado:</span>
                  <span className="font-medium">R$ {estimatedCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowRegionModal(false)}
            >
              Cancelar
            </Button>
            <Button 
              disabled={!selectedProcedure || !selectedSupply}
              onClick={() => handleAddProcedure(
                selectedProcedure, 
                selectedRegion.name, 
                selectedSupply, 
                quantity,
                estimatedCost,
                estimatedTime
              )}
            >
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Componente para visualização do paciente (antes/depois)
  const PatientView = () => {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Visualização do paciente – resultados simulados para fins ilustrativos</h2>
            <Button 
              variant="outline" 
              onClick={() => setShowPatientView(false)}
            >
              Voltar para edição
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ANTES</h3>
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={selectedImage?.src || ''} 
                  alt="Antes"
                  className="w-full h-auto" 
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">DEPOIS</h3>
              <div className="border rounded-lg overflow-hidden relative">
                <img 
                  src={selectedImage?.src || ''} 
                  alt="Depois"
                  className="w-full h-auto filter brightness-110 contrast-105 saturate-105" 
                />
                
                {/* Tooltips para as áreas tratadas */}
                {selectedProcedures.map((proc, index) => {
                  // Posicionamentos simplificados - em um cenário real seriam baseados em coordenadas específicas
                  const positions = [
                    { top: '30%', left: '60%' },
                    { top: '45%', left: '20%' },
                    { top: '60%', left: '70%' }
                  ];
                  const pos = positions[index % positions.length];
                  
                  return (
                    <div 
                      key={proc.id}
                      className="absolute bg-white border border-gray-200 rounded-md shadow-md p-3 z-10"
                      style={{ 
                        top: pos.top, 
                        left: pos.left,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <h4 className="font-semibold">{proc.area}</h4>
                      <p className="text-sm">{proc.insumo}</p>
                      <p className="text-xs text-gray-500">{proc.quantidade} ml</p>
                      <div className="absolute h-px w-10 bg-gray-400" style={{ 
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(45deg)'
                      }}></div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4">
                <p className="text-lg">Você poderá realizar melhorias nas regiões destacadas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!patient) {
    return (
      <div className="text-center p-8">
        <p>Carregando informações do paciente...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/hof/selecionar-imagem/${patientId}`}>
            <Button variant="outline" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Planejamento HOF</h1>
            <p className="text-gray-500 mt-1">
              Paciente: <strong>{patient.name}</strong>
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowPatientView(true)}
            className="flex items-center gap-1"
          >
            <UserIcon className="h-4 w-4" />
            <span>Visualização do Paciente</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna da imagem com pontos faciais (Etapa 1) */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Seleção de Áreas Anatômicas</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
              {/* Imagem do paciente */}
              <div className="relative">
                <img 
                  src={selectedImage?.src || ''} 
                  alt={selectedImage?.title || ''}
                  className="w-full h-auto" 
                />
                
                {/* Sobreposição do FaceMesh (adaptável com base no tipo de imagem) */}
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {/* Pontos faciais adaptados ao tipo de imagem */}
                  {selectedImage?.type === 'frontal' && (
                    <>
                      {/* Pontos para imagem frontal */}
                      <circle cx="50" cy="27" r="0.7" fill="#3b82f6" />
                      <circle cx="42" cy="34" r="0.7" fill="#3b82f6" />
                      <circle cx="58" cy="34" r="0.7" fill="#3b82f6" />
                      <circle cx="38" cy="34" r="0.7" fill="#3b82f6" />
                      <circle cx="62" cy="34" r="0.7" fill="#3b82f6" />
                      <circle cx="46" cy="39" r="0.7" fill="#3b82f6" />
                      <circle cx="54" cy="39" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="42" r="0.7" fill="#3b82f6" />
                      <circle cx="46" cy="46" r="0.7" fill="#3b82f6" />
                      <circle cx="54" cy="46" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="48" r="0.7" fill="#3b82f6" />
                      <circle cx="46" cy="52" r="0.7" fill="#3b82f6" />
                      <circle cx="54" cy="52" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="55" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="61" r="0.7" fill="#3b82f6" />
                      <circle cx="42" cy="61" r="0.7" fill="#3b82f6" />
                      <circle cx="58" cy="61" r="0.7" fill="#3b82f6" />
                      <circle cx="35" cy="45" r="0.7" fill="#3b82f6" />
                      <circle cx="65" cy="45" r="0.7" fill="#3b82f6" />
                      
                      {/* Linhas conectando pontos faciais para imagem frontal */}
                      <line x1="50" y1="27" x2="42" y2="34" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="27" x2="58" y2="34" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="34" x2="38" y2="34" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="58" y1="34" x2="62" y2="34" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="34" x2="46" y2="39" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="58" y1="34" x2="54" y2="39" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="39" x2="50" y2="42" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="39" x2="50" y2="42" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="42" x2="50" y2="48" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="46" x2="50" y2="48" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="46" x2="50" y2="48" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="48" x2="50" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="52" x2="50" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="52" x2="50" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="55" x2="50" y2="61" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="38" y1="34" x2="35" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="62" y1="34" x2="65" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="61" x2="50" y2="61" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="61" x2="58" y2="61" stroke="#3b82f6" strokeWidth="0.3" />
                      
                      {/* Áreas clicáveis para seleção de regiões em imagem frontal */}
                      <circle 
                        cx="50" cy="32" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'glabela')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="35" cy="45" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="65" cy="45" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="50" cy="55" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'labios')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="50" cy="64" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'mento')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="44" cy="52" r="4" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'nasogeniano')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="56" cy="52" r="4" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'nasogeniano')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="50" cy="70" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'papada')!)}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}
                  
                  {selectedImage?.type === 'lateral' && (
                    <>
                      {/* Pontos e regiões para imagem lateral */}
                      <circle cx="40" cy="30" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="35" r="0.7" fill="#3b82f6" />
                      <circle cx="42" cy="40" r="0.7" fill="#3b82f6" />
                      <circle cx="52" cy="42" r="0.7" fill="#3b82f6" />
                      <circle cx="48" cy="45" r="0.7" fill="#3b82f6" />
                      <circle cx="40" cy="50" r="0.7" fill="#3b82f6" />
                      <circle cx="50" cy="50" r="0.7" fill="#3b82f6" />
                      <circle cx="45" cy="55" r="0.7" fill="#3b82f6" />
                      <circle cx="42" cy="60" r="0.7" fill="#3b82f6" />
                      <circle cx="48" cy="65" r="0.7" fill="#3b82f6" />
                      
                      {/* Linhas para imagem lateral */}
                      <line x1="40" y1="30" x2="50" y2="35" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="35" x2="42" y2="40" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="40" x2="52" y2="42" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="52" y1="42" x2="48" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="48" y1="45" x2="40" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="40" y1="50" x2="50" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="50" x2="45" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="45" y1="55" x2="42" y2="60" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="60" x2="48" y2="65" stroke="#3b82f6" strokeWidth="0.3" />
                      
                      {/* Áreas clicáveis para imagem lateral */}
                      <circle 
                        cx="45" cy="32" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'glabela')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="48" cy="45" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="45" cy="55" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'labios')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="45" cy="65" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'mento')!)}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}
                  
                  {selectedImage?.type === 'diagonal' && (
                    <>
                      {/* Pontos e regiões para imagem diagonal */}
                      <circle cx="45" cy="30" r="0.7" fill="#3b82f6" />
                      <circle cx="52" cy="32" r="0.7" fill="#3b82f6" />
                      <circle cx="40" cy="38" r="0.7" fill="#3b82f6" />
                      <circle cx="55" cy="40" r="0.7" fill="#3b82f6" />
                      <circle cx="46" cy="45" r="0.7" fill="#3b82f6" />
                      <circle cx="38" cy="48" r="0.7" fill="#3b82f6" />
                      <circle cx="52" cy="50" r="0.7" fill="#3b82f6" />
                      <circle cx="44" cy="55" r="0.7" fill="#3b82f6" />
                      <circle cx="48" cy="62" r="0.7" fill="#3b82f6" />
                      
                      {/* Linhas para imagem diagonal */}
                      <line x1="45" y1="30" x2="52" y2="32" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="45" y1="30" x2="40" y2="38" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="52" y1="32" x2="55" y2="40" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="40" y1="38" x2="46" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="55" y1="40" x2="52" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="45" x2="38" y2="48" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="45" x2="52" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="38" y1="48" x2="44" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="52" y1="50" x2="44" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="44" y1="55" x2="48" y2="62" stroke="#3b82f6" strokeWidth="0.3" />
                      
                      {/* Áreas clicáveis para imagem diagonal */}
                      <circle 
                        cx="48" cy="32" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'glabela')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="42" cy="45" r="6" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="44" cy="55" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'labios')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="48" cy="62" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'mento')!)}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}
                  
                  {/* Fallback para outros tipos de imagem */}
                  {!['frontal', 'lateral', 'diagonal'].includes(selectedImage?.type || '') && (
                    <>
                      {/* Pontos faciais padrão para qualquer outro tipo de imagem */}
                      <circle cx="50" cy="30" r="0.8" fill="#3b82f6" />
                      <circle cx="46" cy="38" r="0.8" fill="#3b82f6" />
                      <circle cx="54" cy="38" r="0.8" fill="#3b82f6" />
                      <circle cx="42" cy="38" r="0.8" fill="#3b82f6" />
                      <circle cx="58" cy="38" r="0.8" fill="#3b82f6" />
                      <circle cx="50" cy="45" r="0.8" fill="#3b82f6" />
                      <circle cx="46" cy="45" r="0.8" fill="#3b82f6" />
                      <circle cx="54" cy="45" r="0.8" fill="#3b82f6" />
                      <circle cx="50" cy="50" r="0.8" fill="#3b82f6" />
                      <circle cx="46" cy="50" r="0.8" fill="#3b82f6" />
                      <circle cx="54" cy="50" r="0.8" fill="#3b82f6" />
                      <circle cx="42" cy="50" r="0.8" fill="#3b82f6" />
                      <circle cx="58" cy="50" r="0.8" fill="#3b82f6" />
                      <circle cx="50" cy="55" r="0.8" fill="#3b82f6" />
                      <circle cx="46" cy="55" r="0.8" fill="#3b82f6" />
                      <circle cx="54" cy="55" r="0.8" fill="#3b82f6" />
                      <circle cx="50" cy="60" r="0.8" fill="#3b82f6" />
                      
                      {/* Linhas conectando pontos faciais */}
                      <line x1="50" y1="30" x2="46" y2="38" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="30" x2="54" y2="38" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="38" x2="42" y2="38" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="38" x2="58" y2="38" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="38" x2="46" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="38" x2="54" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="45" x2="50" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="45" x2="54" y2="45" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="45" x2="50" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="45" x2="46" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="45" x2="54" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="50" x2="50" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="50" x2="54" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="42" y1="50" x2="46" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="50" x2="58" y2="50" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="50" x2="46" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="50" x2="50" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="54" y1="50" x2="54" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="46" y1="55" x2="50" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="55" x2="54" y2="55" stroke="#3b82f6" strokeWidth="0.3" />
                      <line x1="50" y1="55" x2="50" y2="60" stroke="#3b82f6" strokeWidth="0.3" />
                      
                      {/* Áreas clicáveis para seleção de regiões */}
                      <circle 
                        cx="50" cy="37" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'glabela')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="38" cy="50" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="62" cy="50" r="5" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'zigomatico')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="50" cy="58" r="4" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'labios')!)}
                        style={{ cursor: 'pointer' }}
                      />
                      <circle 
                        cx="50" cy="65" r="4" 
                        fill="rgba(231, 42, 74, 0.4)" 
                        stroke="#E72A4A" 
                        strokeWidth="0.5"
                        onClick={() => handleRegionClick(facialRegions.find(r => r.id === 'mento')!)}
                        style={{ cursor: 'pointer' }}
                      />
                    </>
                  )}
                </svg>
                
                {/* Região selecionada (exemplo) */}
                {selectedRegion && (
                  <div 
                    className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md"
                  >
                    <p className="font-medium">Região: {selectedRegion.name}</p>
                    <p className="text-sm text-gray-600">Clique para adicionar procedimento</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna de procedimentos selecionados (Etapa 3) */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Card>
            <CardHeader>
              <CardTitle>Procedimentos Selecionados</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProcedures.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-gray-200 rounded-md">
                  <p className="text-gray-500">
                    Nenhum procedimento selecionado. Clique em uma região facial para adicionar.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedProcedures.map(proc => (
                    <div key={proc.id} className="border rounded-md p-3 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{proc.area}</h3>
                          <p className="text-sm">{proc.nome}</p>
                          <p className="text-xs text-gray-500">{proc.insumo} ({proc.quantidade})</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">R$ {proc.valor.toFixed(2)}</span>
                          <span className="text-xs text-gray-500">{proc.tempo} min</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-1 h-6 text-red-500 p-0"
                            onClick={() => handleRemoveProcedure(proc.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div>
                <h3 className="font-semibold">Painel de Planejamento</h3>
                <div className="flex justify-between gap-8 mt-2">
                  <div>
                    <p className="text-sm text-gray-600">Valor total:</p>
                    <p className="font-medium">R$ {calculateTotalValue().toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tempo total:</p>
                    <p className="font-medium">{calculateTotalTime()} min</p>
                  </div>
                </div>
              </div>
              <Button 
                disabled={selectedProcedures.length === 0}
                className="ml-auto mt-4"
                onClick={handleGenerateQuote}
              >
                <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
                <span>Gerar guia orçamentária</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Modal de seleção de região (Etapa 2) */}
      {showRegionModal && <RegionSelectionModal />}
      
      {/* Visualização do paciente (Etapa 4 e 5) */}
      {showPatientView && <PatientView />}
    </div>
  );
};

export default Planning; 