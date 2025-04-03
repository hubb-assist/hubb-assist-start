# Fluxo de Trabalho Git - HUBB Assist

## 🌿 Estrutura de Branches

Para o desenvolvimento do HUBB Assist, adotamos a seguinte estrutura de branches:

### Branches Principais
- `main` - Branch principal, sempre estável
- `develop` - Branch de desenvolvimento integrado (opcional)

### Branches para Módulos Existentes
- `module/patients` - Para alterações no módulo de Pacientes
- `module/hof` - Para alterações no módulo HOF
- `module/hunter` - Para alterações no módulo HUNTER

### Branches para Novos Módulos
- `feature/module-anamnese` - Para o desenvolvimento do módulo de Anamnese
- `feature/module-financeiro` - Para o módulo Financeiro
- `feature/module-agenda` - Para o módulo de Agenda

### Branches para Outros Tipos de Alterações
- `feature/[nome]` - Para novas funcionalidades
- `bugfix/[nome]` - Para correções de bugs
- `hotfix/[nome]` - Para correções urgentes em produção

## 🚀 Fluxo de Trabalho Colaborativo

### Para Desenvolvedores Adicionais

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/hubb-assist/hubb-assist-start.git
   cd hubb-assist-start
   ```

2. **Criar uma branch nova**
   ```bash
   git checkout -b module/patients
   ```

3. **Fazer as alterações no código**

4. **Adicionar e commitar as alterações**
   ```bash
   git add .
   git commit -m "feat: adiciona funcionalidade X no cadastro de pacientes"
   ```

5. **Enviar a branch para o repositório remoto**
   ```bash
   git push origin module/patients
   ```

6. **Abrir um Pull Request no GitHub**
   - No GitHub, clicar em "Compare & pull request"
   - Preencher a descrição do PR com detalhes sobre as alterações
   - Solicitar revisão de outro desenvolvedor

### Para Integrar Código no Seu Ambiente

1. **Atualizar sua branch local**
   ```bash
   git pull origin main  # ou 'develop', dependendo da branch base
   ```

2. **Se a nova feature foi aprovada e integrada ao main**
   ```bash
   git checkout main
   git pull origin main
   ```

3. **Caso esteja em outra branch, fazer o merge**
   ```bash
   git checkout sua-branch
   git merge main
   ```

## 🧠 Boas Práticas

- ✔️ Crie uma branch para cada tarefa (feature, bug, hotfix, etc.)
- ✔️ Nunca trabalhe diretamente na branch `main`
- ✔️ Use pull requests com revisão de código
- ✔️ Padronize mensagens de commit (type: descrição, ex: `fix: corrige erro de CORS`)
- ✔️ Atualize sua branch com frequência para evitar conflitos
- ✔️ Use `.gitignore` bem definido para não subir arquivos sensíveis
- ✔️ Siga o processo especial para módulos protegidos conforme `docs/PROTECTED_MODULES.md`

## 📝 Status Atual do Projeto

As seguintes branches já foram criadas:
- `main` - Branch principal
- `feature/protecao-modulos` - Implementação da proteção de módulos
- `module/hof` - Para alterações no módulo HOF
- `module/hunter` - Para alterações no módulo HUNTER  
- `module/patients` - Para alterações no módulo de Pacientes
- `feature/module-anamnese` - Para o desenvolvimento do módulo de Anamnese
- `feature/module-financeiro` - Para o módulo Financeiro
- `feature/module-agenda` - Para o módulo de Agenda

### ✅ Configuração do Repositório Remoto

O repositório remoto já está configurado corretamente:
```bash
# O repositório remoto já está configurado
$ git remote -v
origin  https://github.com/hubb-assist/hubb-assist-start (fetch)
origin  https://github.com/hubb-assist/hubb-assist-start (push)
```

### Próximos Passos

1. Fazer o push das branches para o repositório remoto
   ```bash
   git push -u origin main
   git push -u origin feature/protecao-modulos
   git push -u origin module/hof
   git push -u origin module/hunter
   git push -u origin module/patients
   git push -u origin feature/module-anamnese
   git push -u origin feature/module-financeiro
   git push -u origin feature/module-agenda
   ```

2. Criar as branches para novos módulos conforme necessário 