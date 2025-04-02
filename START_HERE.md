# 🚀 Guia de Início - HUBB Assist

## 📋 Contexto do Projeto

Este é um sistema de gestão odontológica completo, com foco em:
- Integração de IA
- Produtividade da equipe clínica
- Digitalização do workflow

## 🎯 Estratégia Atual
- Desenvolvimento Frontend First
- Dados mockados em localStorage
- Foco em demonstração para stakeholders

## 📚 Arquivos Importantes

Para iniciar qualquer sessão, siga estes passos:

1. **Leia os arquivos de documentação nesta ordem**:
   ```bash
   # Execute estes comandos no início de cada sessão
   cat README.md        # Visão geral do projeto
   cat DEV_NOTES.md     # Histórico técnico e decisões
   cat UX_GUIDE.md      # Guia de design e UI
   cat CONTRIBUTING.md  # Regras de desenvolvimento
   ```

2. **Verifique os assets**:
   ```bash
   ls -l src/assets/images/  # Logos e imagens do projeto
   ```

## 🎨 Identidade Visual

- **Cor Primária**: `#1B0B25`
- **Cor Secundária**: `#E72A4A`
- **Fontes**: 
  - Principal: Poppins
  - Textos: Inter

## 🔧 Stack Tecnológica

### Frontend (Em desenvolvimento)
- TypeScript
- React 18+
- Vite
- shadcn/ui
- Tailwind CSS
- Context API

### Backend (Futuro)
- Python 3.11+
- FastAPI
- PostgreSQL/SQLite
- SQLModel

## 📌 Estado Atual do Projeto

1. ✅ Documentação base criada
2. ✅ Guia de UX estabelecido
3. ✅ Assets básicos importados
4. 🔄 Próximo passo: Configuração do ambiente frontend

## ⚠️ Lembretes Importantes

1. **Portas do Desenvolvimento**:
   - Frontend: 3000 (fixa)
   - Evitar múltiplas instâncias do Vite

2. **Commits**:
   - Usar commits semânticos
   - Manter documentação atualizada

3. **Branches**:
   - Trabalhar em branches por feature
   - Manter main sempre estável

## 🔄 Comandos Úteis

```bash
# Verificar processos nas portas de desenvolvimento
netstat -ano | findstr ":3000 :5173"

# Limpar cache se necessário
npm cache clean --force

# Verificar status do git
git status
```

## 📅 Próximos Passos

1. Configurar ambiente frontend com Vite
2. Implementar sistema de mock data
3. Desenvolver componentes base
4. Criar primeiras telas

---

*Este documento deve ser consultado no início de cada nova sessão de desenvolvimento para manter o contexto do projeto.* 