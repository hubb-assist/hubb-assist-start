/**
 * Script para verificar se há alterações em módulos protegidos
 * 
 * Uso: node scripts/check-protected.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cores para output no console
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Carregar a lista de módulos protegidos
const getProtectedModules = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../docs/PROTECTED_MODULES.md'), 'utf8');
    
    // Expressão regular para extrair arquivos listados no formato `src/path/file.tsx`
    const regex = /`(src\/.*?\.[jt]sx?)`/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(data)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  } catch (err) {
    console.error(`${colors.red}Erro ao carregar arquivos protegidos:${colors.reset}`, err.message);
    return [];
  }
};

// Obter arquivos modificados com git
const getModifiedFiles = () => {
  try {
    const output = execSync('git status --porcelain').toString();
    return output
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        // Remove o status (2 caracteres) e espaço inicial
        const file = line.substring(3);
        return file;
      });
  } catch (err) {
    console.error(`${colors.red}Erro ao verificar arquivos modificados:${colors.reset}`, err.message);
    return [];
  }
};

// Verificar interseção entre arquivos protegidos e modificados
const checkProtectedChanges = () => {
  const protectedFiles = getProtectedModules();
  const modifiedFiles = getModifiedFiles();
  
  console.log(`${colors.blue}=== Verificação de Módulos Protegidos ===${colors.reset}`);
  console.log(`${colors.cyan}Arquivos protegidos detectados:${colors.reset} ${protectedFiles.length}`);
  console.log(`${colors.cyan}Arquivos modificados detectados:${colors.reset} ${modifiedFiles.length}`);
  
  const changedProtectedFiles = modifiedFiles.filter(file => 
    protectedFiles.some(protectedFile => file.includes(protectedFile))
  );
  
  if (changedProtectedFiles.length > 0) {
    console.log(`\n${colors.yellow}⚠️  AVISO: Alterações em arquivos protegidos detectadas!${colors.reset}\n`);
    console.log(`${colors.yellow}Arquivos protegidos modificados:${colors.reset}`);
    changedProtectedFiles.forEach(file => {
      console.log(`- ${file}`);
    });
    console.log(`\n${colors.yellow}Por favor, siga o protocolo para modificação de módulos protegidos:${colors.reset}`);
    console.log(`1. Verifique a documentação em docs/PROTECTED_MODULES.md`);
    console.log(`2. Documente as razões para estas alterações`);
    console.log(`3. Crie um branch específico para estas alterações`);
    console.log(`4. Solicite revisão detalhada antes de mesclar\n`);
    return true;
  } else {
    console.log(`\n${colors.green}✅ Nenhuma alteração em módulos protegidos detectada.${colors.reset}\n`);
    return false;
  }
};

// Executar verificação
const hasProtectedChanges = checkProtectedChanges();

// Em um ambiente de CI/CD, poderia retornar um código de erro
if (hasProtectedChanges && process.env.CI) {
  process.exit(1);
} 