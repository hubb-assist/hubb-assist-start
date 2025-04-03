import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { mockDashboardData } from '../../lib/hunter-data';

const HunterDashboard: React.FC = () => {
  const { 
    totalLeads, 
    leadsHoje, 
    taxaConversao, 
    leadsPorCanal, 
    leadsPorServico,
    custosPorCanal,
    conversaoPorProfissional
  } = mockDashboardData;

  // Calcular custo por lead por canal
  const cplPorCanal = custosPorCanal.map(item => ({
    ...item,
    cpl: item.leads > 0 ? (item.custo / item.leads).toFixed(2) : 0
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard de Performance</h2>
      </div>
      
      {/* Cards com números principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <p className="text-xs text-gray-500 mt-1">Acumulado no período</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Leads Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leadsHoje}</div>
            <p className="text-xs text-gray-500 mt-1">Últimas 24 horas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Taxa de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{taxaConversao}%</div>
            <p className="text-xs text-gray-500 mt-1">Lead para Paciente</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Receita Gerada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ 48.350</div>
            <p className="text-xs text-gray-500 mt-1">Mês atual</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos e tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads por canal */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Leads por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsPorCanal.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{item.canal}</span>
                    <span className="text-sm font-medium">{item.valor}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(item.valor / Math.max(...leadsPorCanal.map(i => i.valor))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Leads por serviço */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Leads por Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsPorServico.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{item.servico}</span>
                    <span className="text-sm font-medium">{item.valor}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-secondary h-2.5 rounded-full" 
                      style={{ width: `${(item.valor / Math.max(...leadsPorServico.map(i => i.valor))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Custo por Lead */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Custo por Lead (CPL)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leads</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPL</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cplPorCanal.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">{item.canal}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm">R$ {item.custo.toFixed(2)}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm">{item.leads}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">
                        R$ {item.cpl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Desempenho da Equipe */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Desempenho da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversões</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversaoPorProfissional.map((item, index) => (
                    <tr key={index}>
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium">{item.nome}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm">{item.conversoes}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.taxa > 25 ? 'bg-green-100 text-green-800' : 
                          item.taxa > 15 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.taxa}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Seção de insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Insights da IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
            <h4 className="font-medium text-blue-800 mb-2">Recomendações Baseadas em Dados</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <p className="text-sm text-blue-700">
                  <strong>Aumentar investimento em Instagram:</strong> Este canal tem o melhor CPL (R$ 29,07) e alta taxa de conversão.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <p className="text-sm text-blue-700">
                  <strong>Rever campanhas do Google Ads:</strong> CPL de R$ 65,63 está acima da média do mercado (R$ 45,00).
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <p className="text-sm text-blue-700">
                  <strong>Potencial não aproveitado:</strong> Harmonização tem alta taxa de interesse (32 leads), mas baixa conversão (14,7%).
                </p>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HunterDashboard; 