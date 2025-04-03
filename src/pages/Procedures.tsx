import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Procedure {
  id: string;
  nome: string;
  valor_base: number;
  tempo_estimado: number;
  insumos: string[];
}

const Procedures: React.FC = () => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  
  // Carregar procedimentos do localStorage na inicialização
  useEffect(() => {
    const storedProcedures = localStorage.getItem('procedimentos');
    if (storedProcedures) {
      setProcedures(JSON.parse(storedProcedures));
    } else {
      // Dados iniciais mockados
      const initialProcedures: Procedure[] = [
        {
          id: 'proc-001',
          nome: 'Aplicação de Toxina Botulínica',
          valor_base: 800.00,
          tempo_estimado: 45,
          insumos: ['Toxina Botulínica A', 'Lidocaína']
        },
        {
          id: 'proc-002',
          nome: 'Preenchimento Labial',
          valor_base: 950.00,
          tempo_estimado: 60,
          insumos: ['Ácido Hialurônico', 'Lidocaína']
        }
      ];
      
      setProcedures(initialProcedures);
      localStorage.setItem('procedimentos', JSON.stringify(initialProcedures));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/custos">
            <Button variant="outline" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📋 Procedimentos</h1>
            <p className="text-gray-500 mt-1">
              Gerencie procedimentos oferecidos pela clínica
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          <span>Novo Procedimento</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lista de Procedimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Nome do procedimento</th>
                  <th className="py-3 px-4 text-left">Valor base (R$)</th>
                  <th className="py-3 px-4 text-left">Tempo (min)</th>
                  <th className="py-3 px-4 text-left">Insumos utilizados</th>
                  <th className="py-3 px-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {procedures.map((procedure) => (
                  <tr key={procedure.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{procedure.nome}</td>
                    <td className="py-3 px-4">
                      R$ {procedure.valor_base.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4">{procedure.tempo_estimado}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {procedure.insumos.map((insumo, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs"
                          >
                            {insumo}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Remover</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Procedures; 