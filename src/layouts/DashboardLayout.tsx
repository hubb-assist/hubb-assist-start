import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
  BellIcon,
  ClockIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal do dashboard que inclui o menu lateral e estrutura base
 * @param {React.ReactNode} children - Conteúdo a ser renderizado na área principal
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
  // Atualiza a data e hora a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Formata a data no padrão brasileiro
  const formattedDate = currentDateTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  
  // Formata a hora
  const formattedTime = currentDateTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const menuItems = [
    { icon: ChartBarIcon, label: 'Dashboard', href: '/dashboard' },
    { icon: UserGroupIcon, label: 'Pacientes', href: '/pacientes' },
    { icon: CalendarIcon, label: 'Agenda', href: '/agenda' },
    { icon: DocumentTextIcon, label: 'Prontuários', href: '/prontuarios' },
    { icon: CogIcon, label: 'Configurações', href: '/configuracoes' }
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' && currentPath === '/') return true;
    return currentPath.startsWith(href);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-primary-foreground z-10">
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
                className={`w-full justify-start gap-3 hover:bg-secondary hover:text-white transition-colors ${
                  isActive(item.href) ? 'bg-secondary/90 text-white' : ''
                }`}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full pl-64">
        {/* Header */}
        <header className="h-16 bg-secondary text-white border-b w-full">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              <span className="font-medium capitalize">{formattedDate}</span>
              <span className="mx-2">|</span>
              <ClockIcon className="h-5 w-5" />
              <span className="font-medium">{formattedTime}</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-secondary-700"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-white" />
              </Button>
              
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
                  <p className="text-xs text-white/70">Dentista</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 