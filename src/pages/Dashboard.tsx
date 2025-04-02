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
import DashboardLayout from '../layouts/DashboardLayout';
import { AreaChartGradient } from '@/components/charts/AreaChartGradient';

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

const COLORS = ['#1B0B25', '#E72A4A', '#4C1D95', '#2563EB'];

/**
 * Página principal do dashboard com indicadores e gráficos
 */
const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.consultasHoje}</div>
            <Progress value={75} className="mt-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.pacientesNovos}</div>
            <Progress value={50} className="mt-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.taxaOcupacao}%</div>
            <Progress value={85} className="mt-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Procedimentos no Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.procedimentosMes}</div>
            <Progress value={65} className="mt-4" />
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
      
      {/* Gráfico de Área com Gradiente */}
      <div className="mb-6">
        <AreaChartGradient />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 