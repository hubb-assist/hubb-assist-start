# Módulos Protegidos - HUBB Assist

## 🛡️ Visão Geral

Este documento descreve os módulos do sistema HUBB Assist que são considerados estáveis e em produção. Estes módulos **não devem ser modificados** sem aprovação específica e revisão detalhada.

## 📋 Lista de Módulos Protegidos

### 1. Módulo de Pacientes
- **Status**: Estável
- **Última Atualização**: 02/04/2024
- **Responsável**: Equipe HUBB Assist
- **Arquivos Protegidos**:
  - `src/pages/PatientList.tsx`
  - `src/pages/PatientRegistration.tsx`
  - `src/components/patients/patient-menu.tsx`
  - `src/components/patients/patient-profile.tsx`
  - `src/components/patients/patient-images-gallery.tsx`
  - `src/components/ui/patient-profile-card.tsx`

### 2. Módulo HUBB HOF (Harmonização Orofacial)
- **Status**: Estável
- **Última Atualização**: 02/04/2024
- **Responsável**: Equipe HUBB Assist
- **Arquivos Protegidos**:
  - `src/pages/Hof.tsx`
  - `src/pages/Planning.tsx`
  - `src/pages/ImageSelection.tsx`
  - `src/pages/Procedures.tsx`
  - `src/pages/Supplies.tsx`
  - `src/pages/Costs.tsx`

### 3. Módulo HUBB HUNTER (Marketing e Captação)
- **Status**: Estável
- **Última Atualização**: 02/04/2024
- **Responsável**: Equipe HUBB Assist
- **Arquivos Protegidos**:
  - `src/pages/Hunter.tsx`
  - `src/components/hunter/HunterDashboard.tsx`
  - `src/components/hunter/LeadCapture.tsx`
  - `src/components/hunter/LandingPages.tsx`
  - `src/components/hunter/ConversionFunnel.tsx`

## 🔒 Regras para Modificação

Para modificar qualquer arquivo de um módulo protegido, é necessário seguir este protocolo:

1. **Criar um Branch Específico**: Nomear seguindo o padrão `modulo/feature-especifica`
2. **Documentar as Mudanças**: Explicar claramente as razões e impactos das alterações
3. **Testes Abrangentes**: Garantir que todas as funcionalidades existentes continuem funcionando
4. **Revisão de Código**: Obter aprovação de pelo menos dois desenvolvedores do time
5. **Backup**: Garantir que existe um backup do código original

## ⚠️ Processo de Backup

Antes de iniciar modificações em módulos protegidos, considere criar um backup:

1. Use a função `backupProtectedModules()` do utilitário de proteção
2. Ou faça um backup manual dos arquivos relevantes
3. Ou garanta que o branch atual está sincronizado com o repositório remoto

## 🔍 Verificação

A função `checkProtectedModules()` está disponível para verificar se há alterações em arquivos protegidos antes de um commit. Esta verificação pode ser integrada ao fluxo de CI/CD para notificações automáticas.

## 📝 Solicitação de Alterações

Para propor alterações em módulos protegidos:

1. Abra uma issue detalhando as alterações necessárias
2. Aguarde a aprovação da equipe responsável
3. Após aprovação, siga o processo de modificação descrito acima

---

**Importante**: Este sistema de proteção existe para garantir a estabilidade da aplicação e não para limitar inovações. Se você acredita que uma alteração é necessária, por favor, siga o processo adequado para que possamos avaliar com cuidado. 