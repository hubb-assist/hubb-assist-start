import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ClipboardDocumentListIcon, BeakerIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';

const Costs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Custos</h1>
        <p className="text-gray-500 mt-2">
          Gerencie procedimentos, insumos e combos oferecidos pela clínica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Procedimentos */}
        <Card className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-medium">
              <ClipboardDocumentListIcon className="h-6 w-6 text-blue-500" />
              <span>📋 Procedimentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Veja e edite os procedimentos oferecidos na clínica.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/custos/procedimentos')}
              className="w-full"
              variant="outline"
            >
              Acessar
            </Button>
          </CardFooter>
        </Card>

        {/* Card de Insumos */}
        <Card className="overflow-hidden border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-medium">
              <BeakerIcon className="h-6 w-6 text-indigo-500" />
              <span>🧪 Insumos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Gerencie os insumos utilizados, como toxinas, ácidos e anestésicos.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/custos/insumos')}
              className="w-full"
              variant="outline"
            >
              Acessar
            </Button>
          </CardFooter>
        </Card>

        {/* Card de Combos (Desativado) */}
        <Card className="overflow-hidden border-l-4 border-l-gray-400 hover:shadow-lg transition-shadow opacity-75">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-medium">
              <CubeTransparentIcon className="h-6 w-6 text-gray-500" />
              <span>🎯 Combos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Crie pacotes promocionais com múltiplos procedimentos.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              disabled
              className="w-full"
              variant="outline"
            >
              Em breve
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Costs; 