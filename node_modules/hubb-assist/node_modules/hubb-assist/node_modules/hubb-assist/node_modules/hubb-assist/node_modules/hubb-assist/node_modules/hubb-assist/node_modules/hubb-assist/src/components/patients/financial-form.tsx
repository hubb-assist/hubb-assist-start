import { FC, useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  LockClosedIcon,
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon,
  CalculatorIcon
} from '@heroicons/react/24/solid';

interface FinancialFormProps {
  patientId?: string;
  isNewPatient?: boolean;
}

// Interface para os dados financeiros
interface FinancialData {
  paymentMethod: string;
  paymentHistory: PaymentRecord[];
  totalPaid: number;
  pendingBalance: number;
  creditLimit: number;
  observations: string;
}

// Histórico de pagamentos
interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  value: number;
  method: string;
  status: 'paid' | 'pending' | 'overdue';
}

// Interface para dados de análise de crédito
interface CreditAnalysis {
  score: number;
  riskLevel: 'low' | 'moderate' | 'high';
  maxFinancingValue: number;
  suggestedDownPayment: number;
  suggestedInstallments: number;
  installmentValue: number;
  status: 'eligible' | 'eligible_with_restrictions' | 'ineligible';
  checkpoints: Checkpoint[];
}

// Interface para checkpoints financeiros
interface Checkpoint {
  id: string;
  description: string;
  completed: boolean;
  date?: string;
  icon: 'check' | 'clock' | 'cross' | 'lock';
}

// Função para carregar dados financeiros do localStorage (simulando API)
const loadFinancialData = (patientId: string): FinancialData => {
  try {
    const key = `patient_${patientId}_financial`;
    const storedData = localStorage.getItem(key);
    
    if (storedData) {
      return JSON.parse(storedData) as FinancialData;
    }
  } catch (error) {
    console.error('Erro ao carregar dados financeiros:', error);
  }
  
  // Se não encontrar dados, retorna os dados mockados
  return mockFinancialData;
};

// Função para carregar análise de crédito do localStorage (simulando API)
const loadCreditAnalysis = (patientId: string): CreditAnalysis => {
  try {
    const key = `patient_${patientId}_credit`;
    const storedData = localStorage.getItem(key);
    
    if (storedData) {
      return JSON.parse(storedData) as CreditAnalysis;
    }
  } catch (error) {
    console.error('Erro ao carregar análise de crédito:', error);
  }
  
  // Se não encontrar dados, retorna os dados mockados
  return mockCreditAnalysis;
};

// Dados mockados para o componente
const mockFinancialData: FinancialData = {
  paymentMethod: 'card',
  paymentHistory: [
    {
      id: 'pay1',
      date: '15/03/2025',
      description: 'Consulta inicial',
      value: 250,
      method: 'Cartão de Crédito',
      status: 'paid'
    },
    {
      id: 'pay2',
      date: '20/03/2025',
      description: 'Procedimento estético',
      value: 1500,
      method: 'Pix',
      status: 'paid'
    },
    {
      id: 'pay3',
      date: '10/04/2025',
      description: 'Parcela 1/6 - Tratamento',
      value: 408.33,
      method: 'Cartão de Crédito',
      status: 'pending'
    }
  ],
  totalPaid: 1750,
  pendingBalance: 2040,
  creditLimit: 3500,
  observations: 'Cliente prefere pagamento via Pix. Possui histórico de bons pagamentos em tratamento anterior.'
};

// Dados mockados para análise de crédito
const mockCreditAnalysis: CreditAnalysis = {
  score: 622,
  riskLevel: 'moderate',
  maxFinancingValue: 3500,
  suggestedDownPayment: 1050, // 30%
  suggestedInstallments: 6,
  installmentValue: 408.33,
  status: 'eligible_with_restrictions',
  checkpoints: [
    {
      id: 'cp1',
      description: 'Entrada paga',
      completed: true,
      date: '15/03/2025',
      icon: 'check'
    },
    {
      id: 'cp2',
      description: '1ª parcela programada para 10/04/2025',
      completed: false,
      date: '10/04/2025',
      icon: 'clock'
    },
    {
      id: 'cp3',
      description: 'Comprovação de renda pendente',
      completed: false,
      icon: 'cross'
    },
    {
      id: 'cp4',
      description: 'Clínica assumirá o risco se inadimplente',
      completed: true,
      icon: 'lock'
    }
  ]
};

const FinancialForm: FC<FinancialFormProps> = ({ patientId = 'default', isNewPatient = false }) => {
  const [financialData, setFinancialData] = useState<FinancialData>(mockFinancialData);
  const [creditAnalysis, setCreditAnalysis] = useState<CreditAnalysis>(mockCreditAnalysis);
  
  // Carregar dados baseados no ID do paciente
  useEffect(() => {
    if (!isNewPatient && patientId) {
      // Carregar dados financeiros do paciente
      const patientFinancialData = loadFinancialData(patientId);
      setFinancialData(patientFinancialData);
      
      // Carregar análise de crédito do paciente
      const patientCreditAnalysis = loadCreditAnalysis(patientId);
      setCreditAnalysis(patientCreditAnalysis);
    }
  }, [patientId, isNewPatient]);
  
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  // Função para renderizar o status da análise de crédito
  const renderCreditStatus = (status: string) => {
    switch (status) {
      case 'eligible':
        return <span className="text-green-600">Elegível ✅</span>;
      case 'eligible_with_restrictions':
        return <span className="text-yellow-600">Elegível com ressalvas ⚠️</span>;
      case 'ineligible':
        return <span className="text-red-600">Não elegível ❌</span>;
      default:
        return <span className="text-gray-600">Não avaliado</span>;
    }
  };
  
  // Função para renderizar o risco
  const renderRisk = (risk: string) => {
    switch (risk) {
      case 'low':
        return <span className="text-green-600">Baixo ✅</span>;
      case 'moderate':
        return <span className="text-yellow-600">Moderado ⚠️</span>;
      case 'high':
        return <span className="text-red-600">Alto ❌</span>;
      default:
        return <span className="text-gray-600">Não avaliado</span>;
    }
  };
  
  // Renderiza os ícones dos checkpoints
  const renderCheckpointIcon = (icon: string) => {
    switch (icon) {
      case 'check':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'clock':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cross':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'lock':
        return <LockClosedIcon className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-poppins font-semibold mb-4">Dados Financeiros</h3>
      
      <Tabs defaultValue="financial" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="financial">Dados Financeiros</TabsTrigger>
          <TabsTrigger value="credit">Análise de Crédito</TabsTrigger>
        </TabsList>
        
        {/* Aba: Dados Financeiros */}
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              {/* Forma de pagamento preferida */}
              <div className="mb-6">
                <Label htmlFor="payment-method" className="block mb-2">
                  Forma de pagamento preferida
                </Label>
                
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div 
                    className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-colors
                      ${financialData.paymentMethod === 'card' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'hover:bg-gray-50'}`}
                    onClick={() => setFinancialData({...financialData, paymentMethod: 'card'})}
                  >
                    <CreditCardIcon className="h-7 w-7 mb-1" />
                    <span className="text-sm font-medium">Cartão</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-colors
                      ${financialData.paymentMethod === 'bank-slip' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'hover:bg-gray-50'}`}
                    onClick={() => setFinancialData({...financialData, paymentMethod: 'bank-slip'})}
                  >
                    <BanknotesIcon className="h-7 w-7 mb-1" />
                    <span className="text-sm font-medium">Boleto</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-colors
                      ${financialData.paymentMethod === 'pix' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'hover:bg-gray-50'}`}
                    onClick={() => setFinancialData({...financialData, paymentMethod: 'pix'})}
                  >
                    <QrCodeIcon className="h-7 w-7 mb-1" />
                    <span className="text-sm font-medium">Pix</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-colors
                      ${financialData.paymentMethod === 'financing' 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'hover:bg-gray-50'}`}
                    onClick={() => setFinancialData({...financialData, paymentMethod: 'financing'})}
                  >
                    <CalculatorIcon className="h-7 w-7 mb-1" />
                    <span className="text-sm font-medium">Financiamento</span>
                  </div>
                </div>
              </div>
              
              {/* Histórico de pagamentos */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Histórico de pagamentos</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {financialData.paymentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{payment.date}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{payment.description}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{formatCurrency(payment.value)}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{payment.method}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">
                            {payment.status === 'paid' && <span className="text-green-600">Pago</span>}
                            {payment.status === 'pending' && <span className="text-yellow-600">Pendente</span>}
                            {payment.status === 'overdue' && <span className="text-red-600">Atrasado</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Resumo financeiro */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-green-50 rounded-md border border-green-100">
                  <h5 className="text-sm text-green-700 font-medium mb-1">Total já pago</h5>
                  <p className="text-xl font-semibold text-green-800">{formatCurrency(financialData.totalPaid)}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                  <h5 className="text-sm text-yellow-700 font-medium mb-1">Saldo pendente</h5>
                  <p className="text-xl font-semibold text-yellow-800">{formatCurrency(financialData.pendingBalance)}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                  <h5 className="text-sm text-blue-700 font-medium mb-1">Limite de crédito</h5>
                  <p className="text-xl font-semibold text-blue-800">{formatCurrency(financialData.creditLimit)}</p>
                </div>
              </div>
              
              {/* Observações financeiras */}
              <div>
                <Label htmlFor="financial-observations" className="block mb-2">
                  Observações financeiras
                </Label>
                <Textarea 
                  id="financial-observations" 
                  value={financialData.observations}
                  onChange={(e) => 
                    setFinancialData({...financialData, observations: e.target.value})
                  }
                  className="min-h-24"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Aba: Análise de Crédito */}
        <TabsContent value="credit" className="space-y-4">
          <Card>
            <CardContent className="p-4 pt-4">
              <h4 className="text-lg font-semibold mb-4">Dashboard de Crédito</h4>
              
              {/* Alerta de crédito */}
              {creditAnalysis.riskLevel !== 'low' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-5 flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Atenção: Risco Moderado Identificado</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Este paciente apresenta risco {creditAnalysis.riskLevel} de inadimplência. Verifique as recomendações abaixo.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Cards de indicadores de crédito */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Score (via API Serasa)</h5>
                  <p className="text-lg font-semibold">{creditAnalysis.score} <span className="text-gray-500 text-sm">(Razoável)</span></p>
                </div>
                
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Risco de Inadimplência</h5>
                  <p className="text-lg font-semibold">{renderRisk(creditAnalysis.riskLevel)}</p>
                </div>
                
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Valor máximo financiável</h5>
                  <p className="text-lg font-semibold">{formatCurrency(creditAnalysis.maxFinancingValue)}</p>
                </div>
                
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Entrada sugerida</h5>
                  <p className="text-lg font-semibold">30% ({formatCurrency(creditAnalysis.suggestedDownPayment)})</p>
                </div>
                
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Parcelamento sugerido</h5>
                  <p className="text-lg font-semibold">{creditAnalysis.suggestedInstallments}x de {formatCurrency(creditAnalysis.installmentValue)}</p>
                </div>
                
                <div className="p-4 bg-white rounded-md border shadow-sm">
                  <h5 className="text-sm text-gray-600 font-medium mb-1">Status da análise</h5>
                  <p className="text-lg font-semibold">{renderCreditStatus(creditAnalysis.status)}</p>
                </div>
              </div>
              
              {/* Checkpoints financeiros */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3">Checkpoints Financeiros</h4>
                <div className="space-y-3">
                  {creditAnalysis.checkpoints.map((checkpoint) => (
                    <div key={checkpoint.id} className="flex items-start gap-2">
                      {renderCheckpointIcon(checkpoint.icon)}
                      <span className="text-sm">
                        {checkpoint.description}
                        {checkpoint.date && <span className="text-gray-500 ml-1">({checkpoint.date})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Ações Inteligentes */}
              <div className="bg-primary/5 border border-primary/10 rounded-md p-4">
                <h4 className="text-md font-medium mb-2">Ações Inteligentes sugeridas pela IA</h4>
                <p className="text-sm">
                  "O paciente apresenta risco moderado de inadimplência. Sugerimos exigir uma entrada mínima de 30% e 
                  limitar o parcelamento em até 6x. A clínica pode usar garantia interna com limite de R$ 2.000,00."
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Gerar Contrato</Button>
                  <Button variant="outline" size="sm">Solicitar Documentação</Button>
                  <Button variant="outline" size="sm">Revisar Limites</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialForm; 