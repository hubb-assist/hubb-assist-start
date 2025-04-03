import { FC, useState } from 'react';
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar-menu';

const patientMenuItems: SidebarMenuItem[] = [
  {
    id: 'personal',
    label: 'Dados Pessoais',
    icon: '👤'
  },
  {
    id: 'clinical',
    label: 'Dados Clínicos',
    icon: '🩺'
  },
  {
    id: 'anamnesis',
    label: 'Anamnese',
    icon: '📋'
  },
  {
    id: 'financial',
    label: 'Dados Financeiros',
    icon: '💰'
  },
  {
    id: 'images',
    label: 'Imagens e Docs',
    icon: '🖼️'
  }
];

interface PatientMenuProps {
  onModuleChange: (moduleId: string) => void;
  initialModule?: string;
}

export const PatientMenu: FC<PatientMenuProps> = ({ 
  onModuleChange,
  initialModule = 'personal'
}) => {
  const [activeModule, setActiveModule] = useState<string>(initialModule);
  
  const handleMenuItemClick = (item: SidebarMenuItem) => {
    setActiveModule(item.id);
    onModuleChange(item.id);
  };
  
  return (
    <SidebarMenu
      items={patientMenuItems}
      activeItem={activeModule}
      onItemClick={handleMenuItemClick}
    />
  );
}; 