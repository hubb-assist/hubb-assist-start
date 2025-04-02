"use client"

import React, { useState } from 'react'
import { TrendingUp, ChevronDown } from "lucide-react"
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  ResponsiveContainer,
  Legend 
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dados mockados mais detalhados (diários) para demonstração
const generateDailyData = () => {
  const data = [];
  const startDate = new Date(2024, 3, 1); // 1 de Abril de 2024
  
  for (let i = 0; i < 90; i++) { // 3 meses (90 dias)
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Criar variação natural nos dados
    const baseMobile = 200 + Math.sin(i * 0.3) * 100;
    const baseDesktop = 300 + Math.sin(i * 0.2) * 150;
    
    // Adicionar variação aleatória
    const mobile = Math.max(50, Math.round(baseMobile + (Math.random() * 100 - 50)));
    const desktop = Math.max(100, Math.round(baseDesktop + (Math.random() * 150 - 75)));
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      formattedDate: `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`,
      mobile,
      desktop,
    });
  }
  
  return data;
};

const chartData = generateDailyData();

export function AreaChartGradient() {
  const [period, setPeriod] = useState("3");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Evolução do Atendimento - Interativo</CardTitle>
          <CardDescription>
            Análise de desempenho da clínica com crescimento de 18% nos atendimentos em comparação ao semestre anterior
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Selecionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Último mês</SelectItem>
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E72A4A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E72A4A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFADB9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFADB9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="formattedDate" 
                tickLine={false}
                axisLine={false}
                padding={{ left: 30, right: 30 }}
                tick={{ fontSize: 12 }}
                interval={10}
              />
              <YAxis 
                hide={true}
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                horizontal={true}
                vertical={false}
                stroke="#f5f5f5"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '10px'
                }}
                labelFormatter={(value) => {
                  return `${value}`;
                }}
                formatter={(value, name) => {
                  return [value, name === 'mobile' ? 'Mobile' : 'Desktop'];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="mobile" 
                stackId="1"
                stroke="#FFADB9" 
                fillOpacity={1}
                fill="url(#colorMobile)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="desktop" 
                stackId="1"
                stroke="#E72A4A" 
                fillOpacity={1}
                fill="url(#colorDesktop)" 
                strokeWidth={2}
              />
              <Legend 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  paddingTop: '10px',
                  paddingBottom: '5px'
                }}
                formatter={(value) => {
                  return value === 'mobile' ? 'Mobile' : 'Desktop';
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2 font-medium text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Crescimento de 18.2% no período</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Abril - Junho 2024
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 