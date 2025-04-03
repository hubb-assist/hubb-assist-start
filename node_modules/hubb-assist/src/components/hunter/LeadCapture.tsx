import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockLeads } from '../../lib/hunter-data';

const LeadCapture: React.FC = () => {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    canal: '',
    servico: '',
    mensagem: '',
    allowWhatsApp: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, allowWhatsApp: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Em um cenário real, enviaria para uma API
    console.log('Novo lead:', formData);
    
    // Simulando criação de novo lead
    const newLead = {
      id: (mockLeads.length + 1).toString(),
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      canal: formData.canal,
      servico: formData.servico,
      dataCriacao: new Date().toISOString(),
      status: 'novo' as const,
      observacoes: formData.mensagem || 'Lead captado via formulário manual'
    };
    
    // Na implementação real, seria salvo via API
    alert(`Lead ${formData.nome} cadastrado com sucesso!`);
    
    // Limpar formulário
    setFormData({
      nome: '',
      telefone: '',
      email: '',
      canal: '',
      servico: '',
      mensagem: '',
      allowWhatsApp: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Captura de Leads</h2>
      </div>

      <Tabs defaultValue="manual" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Cadastro Manual</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Novo Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo*</Label>
                    <Input 
                      id="nome" 
                      name="nome" 
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Nome do lead" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone*</Label>
                    <Input 
                      id="telefone" 
                      name="telefone" 
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="canal">Canal de Origem*</Label>
                    <Select 
                      name="canal" 
                      value={formData.canal}
                      onValueChange={(value) => handleSelectChange('canal', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Indicação">Indicação</SelectItem>
                        <SelectItem value="Presencial">Presencial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="servico">Serviço de Interesse*</Label>
                    <Select 
                      name="servico" 
                      value={formData.servico}
                      onValueChange={(value) => handleSelectChange('servico', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Implantes">Implantes</SelectItem>
                        <SelectItem value="Harmonização Facial">Harmonização Facial</SelectItem>
                        <SelectItem value="Ortodontia">Ortodontia</SelectItem>
                        <SelectItem value="Clareamento">Clareamento</SelectItem>
                        <SelectItem value="Prótese">Prótese</SelectItem>
                        <SelectItem value="Lentes de Contato">Lentes de Contato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="mensagem">Observações</Label>
                    <Input 
                      id="mensagem" 
                      name="mensagem" 
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      placeholder="Informações adicionais sobre o lead" 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="allowWhatsApp" 
                      checked={formData.allowWhatsApp}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="allowWhatsApp">Autoriza contato via WhatsApp</Label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="mt-4">Cadastrar Lead</Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dicas para Captação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• Sempre confirme o canal de origem para análise de performance</p>
                <p>• Qualifique o lead perguntando sobre prazo e urgência do tratamento</p>
                <p>• Capture mais detalhes em "Observações" para personalizar o primeiro contato</p>
                <p>• Quando o lead for presencial, faça a captação imediatamente após o atendimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="qrcode" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gerador de QR Code para Captação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="qrServico">Serviço</Label>
                    <Select defaultValue="Harmonização Facial">
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
                    <Label htmlFor="qrCampanha">Campanha</Label>
                    <Select defaultValue="instagram-abril">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a campanha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram-abril">Instagram - Abril 2025</SelectItem>
                        <SelectItem value="google-abril">Google Ads - Abril 2025</SelectItem>
                        <SelectItem value="evento-saude">Evento Saúde Bucal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qrNomeFormulario">Nome do Formulário</Label>
                    <Input id="qrNomeFormulario" defaultValue="Harmonização Facial - Abril 2025" />
                  </div>
                  
                  <Button className="w-full">Gerar QR Code</Button>
                </div>
                
                <div className="flex flex-col items-center justify-center border rounded-md p-4">
                  <div className="bg-gray-200 p-12 rounded-md mb-4">
                    <div className="w-32 h-32 border-4 border-primary rounded-md flex items-center justify-center">
                      <p className="text-center text-xs text-gray-500">QR Code será<br />gerado aqui</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-sm font-semibold">Formulário: Harmonização Facial - Abril 2025</p>
                    <div className="flex space-x-2 justify-center">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button variant="outline" size="sm">Compartilhar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Formulários Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Implantes - Promoção Trimestral</p>
                    <p className="text-sm text-gray-500">22 capturas • Criado em 05/03/2025</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Ver QR</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Ortodontia - Evento Feira de Saúde</p>
                    <p className="text-sm text-gray-500">8 capturas • Criado em 15/03/2025</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Ver QR</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Avaliação Gratuita - Google Ads</p>
                    <p className="text-sm text-gray-500">31 capturas • Criado em 01/03/2025</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Ver QR</Button>
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadCapture; 