import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { mockLandingPages, landingPageTemplates } from '../../lib/hunter-data';

const LandingPages: React.FC = () => {
  const [activeTab, setActiveTab] = useState('gerenciador');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Estado para o formulário de criação
  const [formData, setFormData] = useState({
    titulo: '',
    servico: '',
    descricao: '',
    template: '',
    incluirPrecos: true,
    incluirDepoimentos: true,
    incluirFormulario: true,
    corPrimaria: '#E72A4A',
    corSecundaria: '#14b8a6'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'template') {
      setSelectedTemplate(value);
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleColorChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getTemplate = () => {
    return landingPageTemplates.find(t => t.id === selectedTemplate);
  };

  const getTemplateClassName = (templateId: string) => {
    return selectedTemplate === templateId 
      ? 'border-2 border-primary' 
      : 'border border-gray-200 hover:border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Landing Pages</h2>
      </div>

      <Tabs defaultValue="gerenciador" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gerenciador">Gerenciador</TabsTrigger>
          <TabsTrigger value="novo">Criar Landing Page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gerenciador" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Landing Pages Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitas</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversão</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockLandingPages.map((page) => (
                      <tr key={page.id}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-gray-900">{page.titulo}</span>
                        </td>
                        <td className="px-4 py-3">
                          <a href={`https://${page.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {page.url}
                          </a>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm">{page.servico}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm">{page.visitasTotal}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            page.taxaConversao > 10 ? 'bg-green-100 text-green-800' : 
                            page.taxaConversao > 5 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {page.taxaConversao}%
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            page.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {page.status === 'ativa' ? 'Ativa' : 'Inativa'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm">Visualizar</Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={page.status === 'ativa' ? 'text-red-600' : 'text-green-600'}
                            >
                              {page.status === 'ativa' ? 'Desativar' : 'Ativar'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Métricas de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-gray-500 mb-1">Total de Visitas</div>
                  <div className="text-2xl font-bold">1.367</div>
                  <div className="text-xs text-green-600 mt-1">▲ 18% em relação ao mês anterior</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-gray-500 mb-1">Conversões</div>
                  <div className="text-2xl font-bold">121</div>
                  <div className="text-xs text-green-600 mt-1">▲ 12.5% em relação ao mês anterior</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-gray-500 mb-1">Taxa de Conversão Média</div>
                  <div className="text-2xl font-bold">8.9%</div>
                  <div className="text-xs text-red-600 mt-1">▼ 0.4% em relação ao mês anterior</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="novo" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Nova Landing Page</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="titulo">Título da Landing Page*</Label>
                      <Input 
                        id="titulo" 
                        name="titulo" 
                        value={formData.titulo}
                        onChange={handleInputChange}
                        placeholder="Ex: Implantes Dentários com 20% OFF" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="servico">Serviço*</Label>
                      <Select 
                        name="servico" 
                        value={formData.servico}
                        onValueChange={(value) => handleSelectChange('servico', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Implantes">Implantes</SelectItem>
                          <SelectItem value="Harmonização Facial">Harmonização Facial</SelectItem>
                          <SelectItem value="Ortodontia">Ortodontia</SelectItem>
                          <SelectItem value="Clareamento">Clareamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea 
                        id="descricao" 
                        name="descricao" 
                        value={formData.descricao}
                        onChange={handleInputChange}
                        placeholder="Breve descrição da oferta" 
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Selecione o Template*</Label>
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        {landingPageTemplates.map(template => (
                          <div 
                            key={template.id}
                            className={`rounded-md p-3 cursor-pointer ${getTemplateClassName(template.id)}`}
                            onClick={() => handleSelectChange('template', template.id)}
                          >
                            <h4 className="font-medium">{template.nome}</h4>
                            <p className="text-xs text-gray-500 mt-1">{template.descricao}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <h4 className="font-medium">Personalização</h4>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="incluirPrecos" className="cursor-pointer">Incluir preços e valores</Label>
                        <Switch 
                          id="incluirPrecos" 
                          checked={formData.incluirPrecos}
                          onCheckedChange={(checked) => handleSwitchChange('incluirPrecos', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="incluirDepoimentos" className="cursor-pointer">Incluir depoimentos</Label>
                        <Switch 
                          id="incluirDepoimentos" 
                          checked={formData.incluirDepoimentos}
                          onCheckedChange={(checked) => handleSwitchChange('incluirDepoimentos', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="incluirFormulario" className="cursor-pointer">Incluir formulário de captura</Label>
                        <Switch 
                          id="incluirFormulario" 
                          checked={formData.incluirFormulario}
                          onCheckedChange={(checked) => handleSwitchChange('incluirFormulario', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <h4 className="font-medium">Cores</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="corPrimaria">Cor Primária</Label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: formData.corPrimaria }}
                            ></div>
                            <Input 
                              id="corPrimaria" 
                              name="corPrimaria" 
                              type="text"
                              value={formData.corPrimaria}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="corSecundaria">Cor Secundária</Label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: formData.corSecundaria }}
                            ></div>
                            <Input 
                              id="corSecundaria" 
                              name="corSecundaria" 
                              type="text"
                              value={formData.corSecundaria}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full">Criar Landing Page</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Pré-visualização</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      variant={previewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      Desktop
                    </Button>
                    <Button 
                      variant={previewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      Mobile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedTemplate ? (
                    <div className={`border rounded-md overflow-hidden ${previewMode === 'mobile' ? 'max-w-[320px] mx-auto' : 'w-full'}`}>
                      <div className="bg-gray-100 h-[500px] flex flex-col">
                        {/* Simulação de uma landing page */}
                        <div className="bg-primary/90 text-white p-4 text-center">
                          <div className="font-bold text-lg">{formData.titulo || 'Título da Landing Page'}</div>
                          <div className="text-sm mt-1">{formData.descricao || 'Subtítulo com a descrição da oferta ou serviço'}</div>
                        </div>
                        
                        <div className="flex-1 bg-white p-4 flex flex-col items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="text-sm font-medium">Template: {getTemplate()?.nome}</div>
                            <div className="bg-gray-200 w-full h-40 rounded-md mt-2 flex items-center justify-center">
                              <span className="text-xs text-gray-400">Imagem ilustrativa</span>
                            </div>
                            <div className="mt-4 text-xs">
                              A pré-visualização completa estará disponível após a criação da landing page
                            </div>
                          </div>
                        </div>
                        
                        {formData.incluirFormulario && (
                          <div className="bg-gray-50 p-4">
                            <div className="text-center text-sm font-medium mb-2">Formulário de Captura</div>
                            <div className="flex flex-col space-y-2">
                              <Input disabled placeholder="Nome" className="bg-white" />
                              <Input disabled placeholder="WhatsApp" className="bg-white" />
                              <Button disabled className="w-full" style={{ backgroundColor: formData.corPrimaria }}>
                                Quero Saber Mais
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      Selecione um template para visualizar a pré-visualização
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LandingPages; 