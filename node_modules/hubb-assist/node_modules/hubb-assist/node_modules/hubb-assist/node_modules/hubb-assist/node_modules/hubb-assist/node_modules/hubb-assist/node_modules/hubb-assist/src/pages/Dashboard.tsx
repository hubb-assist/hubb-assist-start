import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts';
import { AreaChartGradient } from '@/components/charts/AreaChartGradient';
import { MiniAreaChart } from '@/components/charts/MiniAreaChart';
import { TrendingUp } from 'lucide-react';

// Dados mockados para demonstração
const mockData = {
  consultasHoje: 12,
  pacientesNovos: 5,
  taxaOcupacao: 85,
  procedimentosMes: 156,
  
  // Dados para gráfico de procedimentos
  procedimentosData: [
    { name: 'Limpeza', value: 45 },
    { name: 'Restauração', value: 30 },
    { name: 'Canal', value: 15 },
    { name: 'Extração', value: 10 },
  ],
  
  // Dados para gráfico de agendamentos
  agendamentosData: [
    { name: 'Seg', agendados: 8, realizados: 7 },
    { name: 'Ter', agendados: 10, realizados: 9 },
    { name: 'Qua', agendados: 12, realizados: 11 },
    { name: 'Qui', agendados: 9, realizados: 8 },
    { name: 'Sex', agendados: 11, realizados: 10 },
  ],
};

// Dados para os mini-gráficos
const generateMiniChartData = (trend = "up") => {
  const data = [];
  const length = 20;
  
  for (let i = 0; i < length; i++) {
    let baseValue;
    if (trend === "up") {
      baseValue = 10 + (i * 40 / length);
    } else if (trend === "down") {
      baseValue = 50 - (i * 40 / length);
    } else {
      baseValue = 30;
    }
    
    // Adicionar alguma variação aleatória
    const value = Math.max(5, baseValue + (Math.random() * 10 - 5 + Math.sin(i * 0.7) * 5));
    data.push({ value });
  }
  
  return data;
};

const miniChartData = {
  consultasHoje: generateMiniChartData("up"),
  pacientesNovos: generateMiniChartData("up"),
  taxaOcupacao: generateMiniChartData("stable"),
  procedimentosMes: generateMiniChartData("up"),
};

const COLORS = ['#1B0B25', '#E72A4A', '#4C1D95', '#2563EB'];

/**
 * Página principal do dashboard com indicadores e gráficos
 */
const Dashboard: React.FC = () => {
  return (
    <>
      {/* Gráfico de Área Principal */}
      <div className="mb-6">
        <AreaChartGradient />
      </div>
      
      {/* Cards de Métricas com Mini-gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{mockData.consultasHoje}</div>
            <div className="h-10 mt-2 mb-2">
              <MiniAreaChart 
                data={miniChartData.consultasHoje} 
                color="#E72A4A"
              />
            </div>
            <Progress value={75} className="mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{mockData.pacientesNovos}</div>
            <div className="h-10 mt-2 mb-2">
              <MiniAreaChart 
                data={miniChartData.pacientesNovos} 
                color="#E72A4A"
              />
            </div>
            <Progress value={50} className="mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{mockData.taxaOcupacao}%</div>
            <div className="h-10 mt-2 mb-2">
              <MiniAreaChart 
                data={miniChartData.taxaOcupacao} 
                color="#E72A4A"
              />
            </div>
            <Progress value={85} className="mt-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Procedimentos no Mês</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{mockData.procedimentosMes}</div>
            <div className="h-10 mt-2 mb-2">
              <MiniAreaChart 
                data={miniChartData.procedimentosMes} 
                color="#E72A4A"
              />
            </div>
            <Progress value={65} className="mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos da Semana</CardTitle>
            <CardDescription>
              Comparativo entre consultas agendadas e realizadas nos últimos 5 dias úteis
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.agendamentosData}>
                <defs>
                  <linearGradient id="colorAgendados" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B0B25" stopOpacity={1} />
                    <stop offset="95%" stopColor="#1B0B25" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="colorRealizados" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E72A4A" stopOpacity={1} />
                    <stop offset="95%" stopColor="#E72A4A" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agendados" fill="url(#colorAgendados)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="realizados" fill="url(#colorRealizados)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Procedimentos */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Procedimentos</CardTitle>
            <CardDescription>
              Análise percentual dos tipos de procedimentos realizados no último mês
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {/* Gradientes para cada fatia do gráfico - usando linearGradient em vez de radial */}
                  <linearGradient id="pieGradient0" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2d1640" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1B0B25" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="pieGradient1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff3d5d" stopOpacity={1} />
                    <stop offset="100%" stopColor="#E72A4A" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="pieGradient2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6729c8" stopOpacity={1} />
                    <stop offset="100%" stopColor="#4C1D95" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="pieGradient3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4287f5" stopOpacity={1} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <Pie
                  data={mockData.procedimentosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  innerRadius={35}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={3}
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {mockData.procedimentosData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pieGradient${index})`}
                      stroke={COLORS[index % COLORS.length]} 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} procedimentos`, 'Quantidade']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard; 