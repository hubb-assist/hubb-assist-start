import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Supply {
  id: string;
  nome: string;
  tipo: string;
  fabricante: string;
  custo_unitario: number;
  unidade: string;
}

const Supplies: React.FC = () => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  
  // Carregar insumos do localStorage na inicialização
  useEffect(() => {
    const storedSupplies = localStorage.getItem('insumos');
    if (storedSupplies) {
      setSupplies(JSON.parse(storedSupplies));
    } else {
      // Dados iniciais mockados
      const initialSupplies: Supply[] = [
        {
          id: "ins-001",
          nome: "Toxina Botulínica A",
          tipo: "Preenchimento",
          fabricante: "XYZ Pharma",
          custo_unitario: 350.00,
          unidade: "frasco"
        },
        {
          id: "ins-002",
          nome: "Ácido Hialurônico",
          tipo: "Preenchimento",
          fabricante: "DermaLab",
          custo_unitario: 280.00,
          unidade: "ml"
        },
        {
          id: "ins-003",
          nome: "Lidocaína",
          tipo: "Anestésico",
          fabricante: "BioSafe",
          custo_unitario: 15.00,
          unidade: "ampola"
        },
        {
          id: "ins-004",
          nome: "Caneta Injetora",
          tipo: "Equipamento",
          fabricante: "Dermatech",
          custo_unitario: 120.00,
          unidade: "unid"
        }
      ];
      
      setSupplies(initialSupplies);
      localStorage.setItem('insumos', JSON.stringify(initialSupplies));
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
            <h1 className="text-3xl font-bold text-gray-900">🧪 Insumos</h1>
            <p className="text-gray-500 mt-1">
              Gerencie os insumos utilizados nos procedimentos
            </p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          <span>Novo Insumo</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lista de Insumos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">Nome do insumo</th>
                  <th className="py-3 px-4 text-left">Tipo</th>
                  <th className="py-3 px-4 text-left">Custo unitário (R$)</th>
                  <th className="py-3 px-4 text-left">Unidade</th>
                  <th className="py-3 px-4 text-left">Fabricante</th>
                  <th className="py-3 px-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {supplies.map((supply) => (
                  <tr key={supply.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{supply.nome}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supply.tipo === 'Preenchimento' ? 'bg-purple-100 text-purple-800' : 
                        supply.tipo === 'Anestésico' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {supply.tipo}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      R$ {supply.custo_unitario.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4">{supply.unidade}</td>
                    <td className="py-3 px-4">{supply.fabricante}</td>
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

export default Supplies; 