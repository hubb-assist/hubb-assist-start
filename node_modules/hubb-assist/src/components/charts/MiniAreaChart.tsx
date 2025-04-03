import React from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface MiniAreaChartProps {
  data: Array<{ value: number }>;
  color: string;
  height?: number;
}

export const MiniAreaChart: React.FC<MiniAreaChartProps> = ({ 
  data, 
  color,
  height = 40
}) => {
  // Gerar dados de exemplo se não forem fornecidos
  const chartData = data.length > 0 ? data : generateMockData();
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={chartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={`url(#gradient-${color})`}
          strokeWidth={1.5}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Função para gerar dados fictícios para o mini-gráfico
function generateMockData() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    const value = Math.max(5, Math.floor(Math.random() * 50) + 10 + Math.sin(i * 0.5) * 15);
    data.push({ value });
  }
  return data;
} 