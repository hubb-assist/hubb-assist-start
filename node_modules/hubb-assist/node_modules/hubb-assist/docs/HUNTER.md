# Documentação do Módulo HUBB HUNTER

## 📊 Visão Geral

O módulo HUBB HUNTER é um sistema completo de marketing e captação de leads desenvolvido para integrar-se à plataforma HUBB Assist. Ele oferece funcionalidades para monitoramento, gestão e otimização do processo de captação de novos pacientes, com recursos de análise e automação assistidos por inteligência artificial.

## 🔍 Funcionalidades Principais

### 1. Dashboard Analítico
- Visualização consolidada de métricas de captação
- KPIs de desempenho por canal (Instagram, Facebook, Google, Site)
- Análise de ROI e custo por lead
- Gráficos de tendência e comparativos
- Taxa de conversão por especialidade e profissional

### 2. Gestão de Leads
- Cadastro e importação de leads de múltiplas fontes
- Segmentação por interesse, fonte e potencial
- Sistema de notas e acompanhamento
- Ferramentas de comunicação integradas (e-mail, WhatsApp)
- Histórico de interações e timeline de atividades

### 3. Landing Pages
- Templates otimizados para diferentes objetivos
- Personalização sem necessidade de código
- Análise de performance e taxa de conversão
- A/B testing simplificado
- Integração com formulários de captação

### 4. Funil de Conversão
- Interface kanban para visualização do status dos leads
- Automação de movimentação entre etapas
- Alertas para leads estagnados
- Sistema de priorização inteligente
- Múltiplas visualizações (kanban, lista, calendário)

### 5. Assistente IA
- Recomendações personalizadas para aumento de conversão
- Análise preditiva de potencial de fechamento
- Sugestões de segmentação e abordagem
- Identificação de gargalos no funil
- Otimização contínua baseada em resultados

## 📱 Interface e Navegação

O módulo é estruturado em um sistema de abas que permite navegação rápida entre as diferentes funcionalidades:

1. **Dashboard**: Visão geral de métricas e KPIs
2. **Leads**: Gerenciamento de leads e formulários de captação
3. **Landing Pages**: Criação e análise de páginas de conversão 
4. **Funil**: Gestão visual do processo de conversão com interface kanban

## 🧩 Componentes Principais

### Hunter.tsx
Componente principal que implementa o sistema de abas e coordena a navegação entre as diferentes funcionalidades do módulo.

```tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import HunterDashboard from '../components/hunter/HunterDashboard';
import LeadCapture from '../components/hunter/LeadCapture';
import LandingPages from '../components/hunter/LandingPages';
import ConversionFunnel from '../components/hunter/ConversionFunnel';

const Hunter: React.FC = () => {
  return (
    <div className="p-6 max-w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">HUBB HUNTER</h1>
        <p className="text-gray-500">Marketing e captação de leads com inteligência artificial</p>
      </header>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="pages">Landing Pages</TabsTrigger>
          <TabsTrigger value="funnel">Funil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <HunterDashboard />
        </TabsContent>
        
        <TabsContent value="leads">
          <LeadCapture />
        </TabsContent>
        
        <TabsContent value="pages">
          <LandingPages />
        </TabsContent>
        
        <TabsContent value="funnel">
          <ConversionFunnel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Hunter;
```

### ConversionFunnel.tsx
Interface kanban para visualização e gestão do funil de conversão, permitindo acompanhar leads em diferentes estágios do processo.

### HunterDashboard.tsx
Dashboard analítico com gráficos e métricas para monitoramento de desempenho de captação e conversão.

### LeadCapture.tsx
Sistema de gestão de leads com formulários, listagem e ferramentas de comunicação.

### LandingPages.tsx
Interface para criação, edição e análise de landing pages a partir de templates pré-definidos.

## 📋 Estrutura de Dados

O módulo utiliza estruturas de dados consistentes para representar leads, campanhas e métricas:

### Lead
```typescript
interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  canal: string;
  servico: string;
  dataCriacao: string;
  status: LeadStatus;
  observacoes?: string;
  proxContato?: string;
  valorProposta?: number;
}

type LeadStatus = 'novo' | 'contatado' | 'agendado' | 'convertido' | 'perdido';
```

### LandingPage
```typescript
interface LandingPage {
  id: string;
  titulo: string;
  url: string;
  servico: string;
  status: 'ativa' | 'inativa';
  createdAt: string;
  visitasTotal: number;
  conversoes: number;
  taxaConversao: number;
}
```

## 💻 Implementação Técnica

- **Gestão de Estado**: Utiliza React Hooks (useState, useEffect) para gerenciamento local de estado
- **Persistência Temporária**: Armazenamento no localStorage para simulação de backend durante fase inicial
- **Componentes UI**: Utiliza componentes shadcn/ui para interface consistente com o restante da aplicação
- **Visualizações**: Implementa diferentes visualizações (kanban, lista) para melhor experiência do usuário
- **Responsividade**: Interface totalmente responsiva adaptada para diferentes dispositivos

## 🔄 Fluxo de Trabalho Recomendado

1. **Análise**: Iniciar pelo dashboard para visão geral de desempenho
2. **Priorização**: Revisar o funil para identificar leads prioritários
3. **Ação**: Atuar nos leads com maior potencial de conversão
4. **Otimização**: Analisar landing pages de baixa conversão para melhorias
5. **Automação**: Configurar regras de automação para movimentação de leads no funil

## 📚 Documentação Relacionada

- [Notas de Desenvolvimento](../DEV_NOTES.md)
- [README Principal](../README.md)

## 🚧 Próximas Melhorias

- Integração com APIs de serviços externos (Google Analytics, Facebook Ads)
- Sistema avançado de automação com gatilhos personalizáveis
- Implementação de chatbot para qualificação inicial de leads
- Recursos de IA avançados para previsão de conversão
- Ferramentas de geração de conteúdo para landing pages 