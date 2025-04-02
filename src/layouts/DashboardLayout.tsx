import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal do dashboard que inclui o menu lateral e estrutura base
 * @param {React.ReactNode} children - Conteúdo a ser renderizado na área principal
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const menuItems = [
    { icon: ChartBarIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: UserGroupIcon, label: 'Pacientes', href: '/pacientes' },
    { icon: CalendarIcon, label: 'Agenda', href: '/agenda' },
    { icon: DocumentTextIcon, label: 'Prontuários', href: '/prontuarios' },
    { icon: CogIcon, label: 'Configurações', href: '/configuracoes' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-primary-foreground">
        {/* Logo */}
        <div className="p-4">
          <img 
            src="/src/assets/images/logo_hubb_assist.png"
            alt="HUBB Assist"
            className="h-12 w-auto"
          />
        </div>

        {/* Menu */}
        <div className="flex-1">
          <nav className="space-y-1 px-2 py-4">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-secondary/10"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-primary-foreground/10">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="User"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Dr. João Silva</p>
              <p className="text-xs text-primary-foreground/70">Dentista</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="h-16 bg-background border-b">
          <div className="flex items-center justify-end h-full px-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-secondary" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 