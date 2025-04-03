# 🎨 Guia de UX - HUBB Assist

## 🎯 Identidade Visual

### 🌈 Cores

#### Cores Principais
- **Cor Primária**: `#1B0B25` 
  - Uso: Backgrounds principais, elementos de destaque
- **Cor Secundária**: `#E72A4A`
  - Uso: Call-to-actions, elementos interativos

#### Paleta Complementar
- **Branco**: `#FFFFFF`
  - Uso: Texto em fundos escuros, áreas de conteúdo

### 🔤 Tipografia

#### Fontes
- **Principal**: Poppins
  - Uso: Títulos, botões, elementos de destaque
- **Secundária**: Inter
  - Uso: Textos corridos, parágrafos, conteúdo geral

```css
/* Exemplo de importação das fontes */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
```

### 🎯 Componentes

#### Botões
- **Background**: `#E72A4A`
- **Texto**: `#FFFFFF`
- **Estados**:
  - Hover: Escurecer 10%
  - Active: Escurecer 15%
  - Disabled: Opacidade 50%

### 🖼️ Logotipos

#### Versões
1. **Logo para fundos claros**
   - Arquivo: `logo_hubb_assist_escuro.png`
   - Localização: `/src/assets/images/logo_hubb_assist_escuro.png`

2. **Logo para fundos escuros**
   - Arquivo: `logo_hubb_assist.png`
   - Localização: `/src/assets/images/logo_hubb_assist.png`

3. **Favicon**
   - Arquivo: `logo_hubb_assist_favicon.png`
   - Localização: `/src/assets/images/logo_hubb_assist_favicon.png`
   - Uso: Ícone do navegador, deve manter proporção quadrada

### 📏 Espaçamento e Grid

#### Sistema de Espaçamento
- Base: 4px
- Escala:
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px
  - 2xl: 48px

### 🎨 Boas Práticas

1. **Consistência**
   - Manter padrão de cores em toda aplicação
   - Usar sistema de espaçamento definido
   - Seguir hierarquia tipográfica

2. **Acessibilidade**
   - Garantir contraste adequado
   - Incluir estados de hover/focus
   - Manter textos legíveis

3. **Responsividade**
   - Adaptar layouts para diferentes telas
   - Manter proporções de logos
   - Ajustar espaçamentos conforme viewport

### 🔄 Versionamento

Este guia deve ser atualizado conforme novas decisões de design são tomadas. Todas as alterações devem ser documentadas e versionadas. 