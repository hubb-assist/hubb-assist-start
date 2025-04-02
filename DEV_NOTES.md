# Notas de Desenvolvimento - HUBB Assist

## 🎯 Estratégia de Desenvolvimento - IMPORTANTE!

### Fase 1 - Frontend First com Mock Data
- O desenvolvimento inicial será focado APENAS no frontend
- Todos os dados serão armazenados no localStorage
- Objetivo: demonstração rápida para stakeholders
- Benefícios:
  - Validação rápida da interface e UX
  - Feedback antecipado dos stakeholders
  - Desenvolvimento ágil sem dependências de backend
  - Facilita mudanças baseadas em feedback

### Estrutura dos Mocks
- Dados serão estruturados seguindo o formato final da API
- Implementação de serviços com interface similar à futura API
- Uso de TypeScript para garantir tipagem correta
- Fácil substituição futura por chamadas reais à API

### Plano de Transição para Backend
- Manter interfaces de serviços consistentes
- Implementar interceptors para chamadas HTTP
- Migração gradual de localStorage para API real
- Manter compatibilidade com dados existentes

## 📋 Histórico de Decisões Técnicas

### Stack Tecnológica

#### Frontend
- **React 18+ com TypeScript**: Escolhido pela maturidade, tipagem forte e recursos modernos
- **Vite**: Builder rápido e eficiente para desenvolvimento moderno
- **shadcn/ui**: Componentes reutilizáveis e customizáveis com Tailwind
- **Context API**: Gerenciamento de estado nativo do React, adequado para a escala do projeto
- **Tailwind CSS**: Utility-first CSS para desenvolvimento ágil e consistente

#### Hero UI - Biblioteca de Componentes
- **Versão**: @heroui/react (última versão estável)
- **Pré-requisitos**:
  - Vite 2+
  - React 18+
  - Tailwind CSS 3.4
  - Framer Motion 11.9+

##### Instalação e Configuração
1. **Instalação dos pacotes**:
```bash
# Pacotes principais
npm install @heroui/react framer-motion

# Dependências do Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configuração do Tailwind** (tailwind.config.js):
```javascript
import { heroui } from '@heroui/theme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B0B25",
        secondary: "#E72A4A"
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
```

3. **Provider na raiz** (main.tsx):
```tsx
import {HeroUIProvider} from '@heroui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>,
)
```

##### Uso de Componentes
- Importação individual: `import { Button } from "@heroui/react"`
- CLI para adicionar componentes: `npx hero-ui@latest add button card input`
- Personalização usando as cores do HUBB Assist
- Documentação completa disponível em heroui.dev

#### Backend
- **FastAPI**: Framework Python moderno, alta performance e documentação automática
- **SQLModel**: ORM moderno com suporte total a tipagem
- **PostgreSQL/SQLite**: Robustez em produção, simplicidade em desenvolvimento

### 🏗️ Decisões Arquiteturais

#### Estrutura de Módulos
- Sistema modular para facilitar manutenção e escalabilidade
- Separação clara entre frontend e backend
- APIs bem definidas para cada módulo

#### Segurança
- Autenticação JWT com refresh tokens
- Middleware CORS configurado adequadamente
- Validação em ambas as camadas (frontend e backend)

#### Performance
- Lazy loading de componentes
- Otimização de queries do banco de dados
- Caching estratégico

### 🆕 Módulo de Anamnese

#### Implementação
- **Data:** 02/04/2025
- **Descrição:** Implementação do formulário de anamnese completo para cadastro de pacientes
- **Componentes:** 
  - `AnamnesisForm.tsx`: Formulário principal com múltiplas abas
  - Integração com componentes UI: Tabs, Checkbox, Label, Textarea, Input
  
#### Recursos
- **Questionário de Saúde Geral:** Condições médicas, uso de medicamentos, alergias
- **Histórico Familiar:** Doenças hereditárias e familiares
- **Hábitos Relevantes:** Tabagismo, consumo de álcool, outros hábitos
- **Informações Adicionais:** Tratamentos anteriores, queixas e observações

#### Sistema de Sinalizações
- Implementado sistema visual para condições críticas que requerem atenção
- Condições sinalizadas: doenças cardíacas, hipertensão, diabetes, alergias, gravidez, anticoagulantes
- Código de cores (vermelho) para destacar condições críticas na interface

#### Performance e UX
- Interface com abas para facilitar navegação entre diferentes seções
- Componentes reutilizáveis seguindo o design system HUBB Assist
- Validação de dados críticos com feedback visual imediato

### 🆕 Módulo de Imagens

#### Implementação
- **Data:** 02/04/2025
- **Descrição:** Implementação da galeria de imagens e documentos para pacientes
- **Componentes:** 
  - `PatientImagesGallery.tsx`: Interface principal com múltiplas abas para diferentes tipos de mídia
  - Componentes auxiliares: ImageCard, BeforeAfterCompare, DocumentItem
  
#### Recursos
- **Galeria de Fotografias:** Separadas entre extraorais e intraorais
- **Radiografias:** Organização entre panorâmicas e periapicais
- **Escaneamentos Intraorais:** Visualização de escaneamentos digitais
- **Modelos 3D:** Interface para modelos digitais com link para visualizador 3D
- **Timeline de Evolução:** Comparativos antes/depois e navegação cronológica
- **Documentos:** Gestão de documentos digitalizados, prescrições e atestados

#### UX/UI
- Organização em abas para fácil navegação entre diferentes tipos de mídia
- Preview de imagens com informações contextuais (data, descrição)
- Recursos de ampliação e download
- Alertas para documentos com prazos próximos do vencimento
- Interface responsiva adaptada para diferentes tamanhos de tela

## 📅 Roadmap Técnico

### Fase 1 - Fundação
- [x] Definição da arquitetura
- [ ] Setup inicial do projeto
- [ ] Configuração de ambiente de desenvolvimento
- [ ] Implementação de autenticação base

### Fase 2 - Módulos Core
- [ ] Dashboard
- [ ] Cadastros básicos
- [ ] Agenda
- [ ] Ficha do paciente

### Fase 3 - Módulos Avançados
- [ ] Integrações com IA
- [ ] Workflow digital
- [ ] Relatórios avançados

## 🔄 Ciclo de Desenvolvimento

1. **Planejamento**
   - Definição de requisitos
   - Design de arquitetura
   - Prototipação

2. **Implementação**
   - Desenvolvimento modular
   - Testes unitários
   - Documentação

3. **Revisão**
   - Code review
   - Testes de integração
   - Validação de requisitos

4. **Deploy**
   - Ambiente de staging
   - Testes de produção
   - Monitoramento

## 📊 Métricas de Qualidade

- Cobertura de testes
- Performance da aplicação
- Tempo de resposta da API
- Qualidade do código

## 🔍 Pontos de Atenção

### Desafios Técnicos
- Integração com sistemas de IA
- Escalabilidade do banco de dados
- Performance com grandes volumes de dados
- Segurança de dados sensíveis

### Soluções Planejadas
- Arquitetura modular
- Cache estratégico
- Otimização de queries
- Monitoramento contínuo

## 🔧 Correções de Configuração (02/04/2024)

### Problemas Resolvidos
1. Erro de resolução de imports com o alias `@/`
2. Erro na classe `font-inter` do Tailwind
3. Configuração incompleta do TypeScript para Node.js

### Detalhes das Alterações

#### 1. Configuração do Vite
Ajustado o arquivo `vite.config.ts` para configurar corretamente o alias `@/`:
```typescript
// Configuração de alias adicionada
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

#### 2. Configuração do TypeScript
Criado arquivo `tsconfig.node.json` para suporte adequado ao Node.js.

#### 3. Dependências Adicionadas
```bash
npm install -D @types/node
npm install -D tailwindcss-animate
```

#### 4. Configuração do Tailwind
Adicionadas classes personalizadas de fontes no `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Poppins', 'Inter', 'sans-serif'],
  poppins: ['Poppins', 'sans-serif'],
  inter: ['Inter', 'sans-serif'],
}
```

Servidor rodando com sucesso em http://localhost:5173/

## 📊 Implementação de Gráficos Avançados (03/04/2024)

### Recursos Adicionados
1. Componente de Area Chart com gradiente para visualização de dados
2. Componentes base para criação de gráficos customizados
3. Integração com biblioteca Recharts

### Detalhes da Implementação

#### 1. Componentes UI para Gráficos
Adicionado componente `chart.tsx` com ferramentas para criação de gráficos:
- `ChartContainer` - Container para gráficos com suporte a variáveis CSS
- `ChartTooltipContent` - Tooltip customizado para exibição de dados
- `ChartTooltip` - Wrapper do componente Tooltip do Recharts

#### 2. Gráfico de Área com Gradiente
Implementado componente `AreaChartGradient.tsx` com:
- Gradientes lineares para preenchimento de áreas
- Estilos consistentes com a identidade visual do HUBB Assist
- Dados mockados para demonstração de consultas e procedimentos

#### 3. Dependências Adicionadas
```bash
npm install recharts lucide-react
```

Este gráfico oferece uma visualização mais atrativa da evolução semestral de consultas e procedimentos, alinhado com a estratégia de Frontend First para demonstração para stakeholders.

## 🎨 Melhorias Visuais nos Gráficos (04/04/2024)

### Aprimoramentos Realizados
1. Implementação de degradês mais pronunciados para melhor estética visual
2. Conversão do gráfico de pizza para estilo donut com efeitos visuais aprimorados
3. Adição de descrições mais ricas para cada visualização de dados
4. Refinamento das bordas e contornos dos gráficos de barras

### Detalhes das Alterações

#### 1. Degradês Aprimorados
- Aumentada a opacidade dos gradientes para `0.9` para maior contraste
- Alterada a curva dos gráficos de `natural` para `monotone` para suavização visual
- Ajustados os offsets dos gradientes para início em `0%` e término em `100%`

#### 2. Gráfico de Barras
- Adicionados cantos arredondados com `radius={[4, 4, 0, 0]}`
- Implementado degradê vertical nas barras para efeito 3D sutil
- Adicionado grid horizontal tracejado para facilitar leitura de valores

#### 3. Gráfico de Pizza (Donut)
- Convertido para estilo donut com `innerRadius={30}`
- Aumentado o diâmetro externo para `90px`
- Adicionado espaçamento entre segmentos com `paddingAngle={2}`
- Aplicadas bordas nos segmentos para melhor delimitação visual

Estas melhorias visuais aumentam significativamente o impacto das apresentações para stakeholders, além de facilitar a interpretação dos dados através de elementos visuais mais claros e atrativos.

## 🌈 Aprimoramento do Gráfico de Pizza (04/04/2024)

### Melhorias Implementadas
1. Adicionados gradientes radiais para cada segmento do gráfico de pizza
2. Refinado o estilo visual do tooltip com bordas suaves e sombras
3. Melhorada a animação do gráfico com duração de 1000ms

### Detalhes Técnicos

#### 1. Gradientes Radiais no Gráfico de Pizza
```jsx
<radialGradient id="pieGradient0" cx="50%" cy="50%" r="100%" fx="50%" fy="50%">
  <stop offset="0%" stopColor={`${COLORS[0]}FF`} stopOpacity={1} />
  <stop offset="70%" stopColor={COLORS[0]} stopOpacity={0.9} />
  <stop offset="100%" stopColor={COLORS[0]} stopOpacity={0.8} />
</radialGradient>
```

#### 2. Tooltip Personalizado
```jsx
<Tooltip 
  formatter={(value) => [`${value} procedimentos`, 'Quantidade']}
  contentStyle={{ 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}
/>
```

#### 3. Parâmetros Visuais Refinidos
- Aumentado o espaçamento entre segmentos para `paddingAngle={3}`
- Ampliado o raio interno para `innerRadius={35}`
- Melhorada a espessura da borda para `strokeWidth={2}`

Esta atualização aprimora significativamente o impacto visual do gráfico de pizza, com efeitos de profundidade e brilho que destacam cada segmento de forma mais atrativa para apresentações aos stakeholders.

## 🔄 Atualização de Gradientes no Gráfico de Pizza (04/04/2024)

### Alterações Realizadas
1. Substituído o uso de `radialGradient` por `linearGradient` para melhor compatibilidade
2. Aplicadas cores mais brilhantes no início do gradiente para aumentar contraste
3. Definidos gradientes diagonais (x1="0" y1="0" x2="1" y2="1")

### Detalhes Técnicos

#### Novo Gradiente Linear
```jsx
<linearGradient id="pieGradient0" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0%" stopColor="#2d1640" stopOpacity={1} />
  <stop offset="100%" stopColor="#1B0B25" stopOpacity={0.8} />
</linearGradient>
```

Esta mudança foi necessária para garantir que o efeito de degradê seja corretamente renderizado pelo Recharts em diferentes navegadores, oferecendo uma experiência visual mais consistente e impactante.

## 📈 Implementação de Gráfico Interativo com Dados Detalhados (04/04/2024)

### Melhorias Implementadas
1. Criado gráfico de área interativo com dados diários mais detalhados
2. Adicionado seletor de período (1 mês, 3 meses, 6 meses, 1 ano)
3. Implementado degradê suave nas áreas do gráfico
4. Tooltip personalizado com formatação e estilos aprimorados

### Componentes Criados
1. `src/components/ui/select.tsx`: Componente de seleção com suporte a:
   - Seleção dropdown
   - Estilo consistente com o design system
   - Navegação por teclado
   - Animações de abertura/fechamento

2. Atualização de `AreaChartGradient.tsx`:
   - Função para gerar dados diários com variações naturais
   - Layout responsivo com ResponsiveContainer
   - Gradientes lineares para desktop e mobile
   - Configuração avançada do eixo X para datas

### Detalhes Técnicos

#### 1. Gradientes Aprimorados para o Gráfico de Área
```jsx
<linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#E72A4A" stopOpacity={0.8} />
  <stop offset="95%" stopColor="#E72A4A" stopOpacity={0} />
</linearGradient>
```

#### 2. Geração de Dados Realistas
```jsx
const generateDailyData = () => {
  // Criar variação natural nos dados usando funções trigonométricas
  const baseMobile = 200 + Math.sin(i * 0.3) * 100;
  // Adicionar variação aleatória para tornar os dados mais realistas
  const mobile = Math.max(50, Math.round(baseMobile + (Math.random() * 100 - 50)));
};
```

Esta implementação oferece uma visualização muito mais detalhada e interativa da evolução dos atendimentos ao longo do tempo, similar a dashboards analíticos profissionais, proporcionando uma experiência ainda mais impactante para apresentações aos stakeholders.

## 📋 Documentação de Componentes

### Interface Modular de Cadastro de Pacientes

**Data de implementação:** Atual
**Desenvolvido por:** Equipe HUBB Assist
**Última atualização:** Integração com o layout existente

#### Arquitetura

A interface de cadastro de pacientes foi implementada seguindo um design modular, integrado à estrutura existente do sistema com o menu lateral.

##### Fluxo de Navegação:

1. Menu lateral (Pacientes) → Lista de pacientes (CRUD)
2. Ao selecionar um paciente → Visualização detalhada com menu modular

##### Componentes Criados:

1. **`PatientList.tsx`** - Lista de pacientes com opções CRUD
   - Localização: `src/pages/PatientList.tsx`
   - Funcionalidades: Listar, criar, editar, excluir e visualizar detalhes

2. **`sidebar-menu.tsx`** - Menu lateral genérico reutilizável
   - Localização: `src/components/ui/sidebar-menu.tsx`
   - Props: `items`, `activeItem`, `onItemClick`

3. **`patient-profile-card.tsx`** - Card com informações do perfil do paciente
   - Localização: `src/components/ui/patient-profile-card.tsx`
   - Props: `patient`, `onCall`, `onMessage`

4. **`patient-menu.tsx`** - Menu específico para o cadastro de pacientes
   - Localização: `src/components/patients/patient-menu.tsx`
   - Props: `onModuleChange`, `initialModule`

5. **`PatientRegistration.tsx`** - Página de detalhes do paciente
   - Localização: `src/pages/PatientRegistration.tsx`
   - Rotas: `/pacientes/:id`, `/pacientes/:id/editar`, `/pacientes/novo`

##### Dados Mockados:

- **`mock-data.ts`** - Dados para demonstração
  - Localização: `src/lib/mock-data.ts`
  - Conteúdo: 5 pacientes com informações pessoais e clínicas

#### Módulos Implementados

1. **Dados Pessoais** - Completo
2. **Dados Clínicos** - Completo
3. **Anamnese** - Estrutura preparada
4. **Dados Financeiros** - Estrutura preparada
5. **Imagens** - Estrutura preparada
6. **Documentos** - Estrutura preparada

#### Design

Seguindo as diretrizes visuais da marca:
- Cor Primária: `#1B0B25` (backgrounds, elementos principais)
- Cor Secundária: `#E72A4A` (botões, destaques)
- Tipografia: Poppins (títulos) e Inter (textos)

#### Acesso

- URL base: http://localhost:5174/pacientes
- Detalhes de paciente: http://localhost:5174/pacientes/[id]
- Novo paciente: http://localhost:5174/pacientes/novo
- Edição: http://localhost:5174/pacientes/[id]/editar

#### Próximos Passos

1. Implementar os módulos pendentes
2. Adicionar formulários de edição para os dados
3. Desenvolver sincronização com backend quando disponível
4. Adicionar upload de imagens e documentos

Este documento será atualizado conforme o desenvolvimento do projeto avança e novas decisões técnicas são tomadas. 