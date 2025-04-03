# HUBB Assist - Sistema de Gestão Odontológica

## 📊 Sobre o Projeto

HUBB Assist é um sistema de gestão odontológica completo, moderno e modular, com foco em integração de IA, produtividade da equipe clínica e digitalização do workflow.

## 🌐 Principais Funcionalidades

- Dashboard com KPIs clínicos, produtivos e financeiros
- Gestão completa de cadastros (pacientes, funcionários, equipamentos)
- Sistema financeiro integrado
- Agenda e operações clínicas
- Gestão de atendimento e fichas digitais
- Workflow digital para casos e laboratório
- Módulos de IA para análise e planejamento
- Sistema completo de configurações e permissões
- Anamnese detalhada com questionário de saúde, histórico familiar e sinalizações para condições críticas
- Galeria multimídia com fotografias, radiografias, escaneamentos, modelos 3D e timeline de evolução do tratamento
- Módulo HUBB HOF com planejamento interativo de harmonização orofacial, seleção anatômica de procedimentos e estimativa automática de custos e materiais
- Módulo HUBB HUNTER para marketing e captação de leads, com dashboard analítico, gestão de funil de conversão e ferramentas de automação assistidas por IA

## 🔧 Tecnologias Utilizadas

### Frontend
- TypeScript
- React 18+
- Vite
- shadcn/ui
- Tailwind CSS
- Context API
- React Router DOM
- Axios

### Backend
- Python 3.11+
- FastAPI
- Uvicorn
- PostgreSQL (prod)
- SQLite (dev)
- SQLModel
- JWT Authentication

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+ instalado
- Gerenciador de pacotes NPM 9+ ou Yarn

### Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/hubb-assist.git
cd hubb-assist
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação em:
```
http://localhost:5173
```

### Estrutura do Projeto
```
hubb-assist/
├── src/                    # Código fonte
│   ├── assets/             # Recursos estáticos (imagens, fontes)
│   │   ├── charts/         # Componentes de gráficos e visualizações
│   │   ├── hunter/         # Componentes do módulo HUBB HUNTER
│   │   ├── patients/       # Componentes relacionados a pacientes
│   │   └── ui/             # Componentes de UI genéricos
│   ├── layouts/            # Layouts de página (Dashboard, Auth)
│   ├── lib/                # Bibliotecas e utilitários
│   ├── pages/              # Páginas principais da aplicação
│   └── styles/             # Estilos globais e variáveis
├── public/                 # Arquivos públicos acessíveis diretamente
└── package.json            # Dependências e scripts
```

## 📚 Documentação

- [Guia de Contribuição](./CONTRIBUTING.md)
- [Notas de Desenvolvimento](./DEV_NOTES.md)

## 🔐 Segurança

Este projeto segue rigorosas práticas de segurança e desenvolvimento. Para mais informações, consulte o guia de contribuição.

## 📝 Licença

[A ser definida]