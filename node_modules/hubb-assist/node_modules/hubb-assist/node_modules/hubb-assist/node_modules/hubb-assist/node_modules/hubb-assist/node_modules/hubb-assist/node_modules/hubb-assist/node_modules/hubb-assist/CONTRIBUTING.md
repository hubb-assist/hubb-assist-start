# Guia de Contribuição - HUBB Assist

## 📌 Regras Fundamentais de Desenvolvimento

### Segurança
- ⚠️ Arquivos protegidos não devem ser modificados diretamente
- 🔒 Credenciais e chaves de API devem ser mantidas em variáveis de ambiente
- 🚫 Nenhuma dependência deve ser instalada sem aprovação prévia

### Módulos Protegidos
- 🛡️ **NOVO**: Verifique a lista de [Módulos Protegidos](./docs/PROTECTED_MODULES.md) antes de iniciar modificações
- 🔄 Alterações em módulos protegidos requerem aprovação específica e revisão detalhada
- 📦 Crie backups antes de alterar qualquer módulo protegido
- 🔍 Use as ferramentas de verificação disponíveis em `src/lib/module-protection.ts`

### Controle de Versão
- 📝 Use commits semânticos e descritivos
- 🌿 Nomeie branches seguindo o padrão: `modulo/tarefa`
- 🔄 Mantenha seu branch atualizado com o main
- ✅ Faça rebase antes de submeter Pull Requests

### Qualidade de Código
- 📚 Todos os endpoints devem estar documentados no Swagger
- ✨ Mantenha o código limpo e bem comentado
- 🧪 Implemente testes para novas funcionalidades
- 🔍 Faça revisão de código antes de submeter

## 🚀 Workflow de Desenvolvimento

1. **Planejamento**
   - Entenda completamente a tarefa
   - Discuta abordagens com a equipe
   - Defina critérios de aceitação

2. **Desenvolvimento**
   - Crie um branch específico
   - Siga os padrões de código
   - Implemente testes
   - Documente alterações

3. **Revisão**
   - Faça self-review do código
   - Solicite code review
   - Aplique feedback recebido

4. **Deploy**
   - Teste em ambiente de desenvolvimento
   - Valide funcionalidades
   - Atualize documentação

## 🔧 Padrões Técnicos

### Frontend
- Componentes devem ser reutilizáveis
- Use TypeScript strict mode
- Siga o design system estabelecido
- Implemente validações robustas

### Backend
- Siga os princípios REST
- Documente todos os endpoints
- Implemente validações adequadas
- Use tipos estritos do SQLModel

## 📋 Checklist de Pull Request

- [ ] Código segue os padrões estabelecidos
- [ ] Testes foram implementados/atualizados
- [ ] Documentação foi atualizada
- [ ] Funcionalidade foi testada localmente
- [ ] Não há conflitos com o main
- [ ] **NOVO**: Se afeta módulos protegidos, foi seguido o protocolo especial

## 🐛 Reportando Bugs

- Descreva o comportamento esperado
- Descreva o comportamento atual
- Forneça passos para reprodução
- Inclua logs/screenshots relevantes

## 💡 Sugerindo Melhorias

- Descreva o problema/necessidade
- Explique sua solução proposta
- Discuta alternativas consideradas
- Forneça exemplos de uso

## 🛡️ Processo para Modificação de Módulos Protegidos

Ao modificar módulos protegidos, siga estes passos adicionais:

1. Verifique a documentação em `docs/PROTECTED_MODULES.md`
2. Crie um branch específico para a alteração
3. Faça um backup do código original
4. Documente detalhadamente suas alterações
5. Implemente testes específicos para as funcionalidades alteradas
6. Solicite revisão de pelo menos dois desenvolvedores
7. Inclua na descrição do PR o motivo da alteração em módulo protegido

Este guia será atualizado conforme necessário para manter as melhores práticas de desenvolvimento. 