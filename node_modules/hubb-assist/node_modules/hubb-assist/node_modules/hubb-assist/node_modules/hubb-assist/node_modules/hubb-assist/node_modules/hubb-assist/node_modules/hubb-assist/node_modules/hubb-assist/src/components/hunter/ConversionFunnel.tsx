import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { mockLeads, leadStatusOptions, respostasIA } from '../../lib/hunter-data';

type Lead = typeof mockLeads[0];

const ConversionFunnel: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Columns based on lead status
  const statusColumns = ['novo', 'contatado', 'agendado', 'convertido', 'perdido'];

  useEffect(() => {
    if (filterStatus) {
      setFilteredLeads(leads.filter(lead => lead.status === filterStatus));
    } else {
      setFilteredLeads(leads);
    }
  }, [leads, filterStatus]);

  // Agrupar leads por status
  const groupedLeads = statusColumns.reduce((acc, status) => {
    acc[status] = filteredLeads.filter(lead => lead.status === status);
    return acc;
  }, {} as Record<string, Lead[]>);

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    const statusOption = leadStatusOptions.find(option => option.id === status);
    return statusOption ? statusOption.color : '';
  };

  // Função para obter o label do status
  const getStatusLabel = (status: string) => {
    const statusOption = leadStatusOptions.find(option => option.id === status);
    return statusOption ? statusOption.label : status;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Funil de Conversão</h2>
        <div className="space-x-2">
          <Button 
            variant={showAIAssistant ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            Assistente IA
          </Button>
          <Select 
            value={filterStatus || ''} 
            onValueChange={(value) => setFilterStatus(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              {statusColumns.map(status => (
                <SelectItem key={status} value={status}>
                  {getStatusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showAIAssistant && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 text-lg">Assistente de Conversão IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b border-blue-200 pb-4">
                <h4 className="font-medium text-blue-800 mb-2">Análise de Funil</h4>
                <p className="text-sm text-blue-700">
                  Você tem <strong>{groupedLeads.novo.length}</strong> novos leads, <strong>{groupedLeads.contatado.length}</strong> contatados e <strong>{groupedLeads.agendado.length}</strong> agendados. 
                  Sua taxa de conversão atual é de <strong>{Math.round((groupedLeads.convertido.length / leads.length) * 100)}%</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="kanban">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kanban">
          <div className="grid grid-cols-5 gap-4">
            {statusColumns.map(status => (
              <div key={status} className="space-y-4">
                <div className={`p-2 rounded-t-md ${getStatusColor(status)}`}>
                  <h3 className="text-center font-medium">{getStatusLabel(status)}</h3>
                </div>
                
                <div className="space-y-2">
                  {groupedLeads[status]?.map(lead => (
                    <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="font-medium">{lead.nome}</div>
                        <div className="text-xs text-gray-500 mt-1">{lead.servico}</div>
                        <div className="text-xs text-gray-500">Canal: {lead.canal}</div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {groupedLeads[status]?.length === 0 && (
                    <div className="p-4 border border-dashed rounded-md flex items-center justify-center">
                      <span className="text-sm text-gray-400">Nenhum lead</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="lista">
          <Card>
            <CardContent className="p-4">
              <p>Lista de leads simplificada</p>
              <ul className="mt-2">
                {filteredLeads.map(lead => (
                  <li key={lead.id} className="mb-2">
                    {lead.nome} - {lead.servico} - {getStatusLabel(lead.status)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversionFunnel; 