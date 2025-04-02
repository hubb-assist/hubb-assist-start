import { FC, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import {
  ClockIcon,
  ArrowsRightLeftIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

interface PatientImagesGalleryProps {
  patientId?: string;
  isNewPatient?: boolean;
}

// Dados fictícios para as imagens
const mockImages = {
  photos: [
    { 
      id: 'photo1', 
      src: 'https://placehold.co/300x200/E72A4A/FFFFFF?text=Foto+Frontal', 
      type: 'extraoral', 
      date: '10/03/2025', 
      title: 'Foto Frontal',
      description: 'Sorriso frontal - avaliação inicial'
    },
    { 
      id: 'photo2', 
      src: 'https://placehold.co/300x200/E72A4A/FFFFFF?text=Foto+Lateral', 
      type: 'extraoral', 
      date: '10/03/2025', 
      title: 'Foto Lateral',
      description: 'Perfil lateral - avaliação inicial'
    },
    { 
      id: 'photo3', 
      src: 'https://placehold.co/300x200/E72A4A/FFFFFF?text=Intraoral+Superior', 
      type: 'intraoral', 
      date: '10/03/2025', 
      title: 'Arcada Superior',
      description: 'Visão oclusal superior'
    },
    { 
      id: 'photo4', 
      src: 'https://placehold.co/300x200/E72A4A/FFFFFF?text=Intraoral+Inferior', 
      type: 'intraoral', 
      date: '10/03/2025', 
      title: 'Arcada Inferior',
      description: 'Visão oclusal inferior'
    }
  ],
  radiographs: [
    { 
      id: 'radio1', 
      src: 'https://placehold.co/400x250/1B0B25/FFFFFF?text=Panorâmica', 
      type: 'panoramic', 
      date: '12/03/2025', 
      title: 'Radiografia Panorâmica',
      description: 'Avaliação completa pré-tratamento'
    },
    { 
      id: 'radio2', 
      src: 'https://placehold.co/200x300/1B0B25/FFFFFF?text=Periapical+11', 
      type: 'periapical', 
      date: '12/03/2025', 
      title: 'Periapical - Dente 11',
      description: 'Avaliação de tratamento endodôntico'
    },
    { 
      id: 'radio3', 
      src: 'https://placehold.co/200x300/1B0B25/FFFFFF?text=Periapical+21', 
      type: 'periapical', 
      date: '12/03/2025', 
      title: 'Periapical - Dente 21',
      description: 'Avaliação de tratamento endodôntico'
    }
  ],
  scans: [
    { 
      id: 'scan1', 
      src: 'https://placehold.co/400x300/1B0B25/FFFFFF?text=Escaneamento+Completo', 
      type: 'full', 
      date: '15/03/2025', 
      title: 'Escaneamento Completo',
      description: 'Modelo digital completo para planejamento'
    },
    { 
      id: 'scan2', 
      src: 'https://placehold.co/400x300/1B0B25/FFFFFF?text=Escaneamento+Superior', 
      type: 'upper', 
      date: '15/03/2025', 
      title: 'Arcada Superior',
      description: 'Modelo digital para confecção de guias'
    }
  ],
  models: [
    { 
      id: 'model1', 
      src: 'https://placehold.co/400x300/1B0B25/FFFFFF?text=Modelo+3D+Completo', 
      type: '3dmodel', 
      date: '18/03/2025', 
      title: 'Modelo 3D Completo',
      description: 'Visualização tridimensional das arcadas'
    }
  ],
  timeline: [
    {
      id: 'timeline1',
      date: '10/03/2025',
      title: 'Início do Tratamento',
      imageBefore: 'https://placehold.co/250x200/E72A4A/FFFFFF?text=Antes',
      imageAfter: null,
      description: 'Registro inicial do paciente'
    },
    {
      id: 'timeline2',
      date: '15/04/2025',
      title: '1 Mês de Tratamento',
      imageBefore: 'https://placehold.co/250x200/E72A4A/FFFFFF?text=Antes',
      imageAfter: 'https://placehold.co/250x200/1B0B25/FFFFFF?text=1+Mês',
      description: 'Progresso após 1 mês de tratamento'
    },
    {
      id: 'timeline3',
      date: '10/05/2025',
      title: '2 Meses de Tratamento',
      imageBefore: 'https://placehold.co/250x200/E72A4A/FFFFFF?text=Antes',
      imageAfter: 'https://placehold.co/250x200/1B0B25/FFFFFF?text=2+Meses',
      description: 'Progresso após 2 meses de tratamento'
    }
  ],
  documents: [
    {
      id: 'doc1',
      title: 'Termo de Consentimento',
      type: 'consent',
      date: '10/03/2025',
      fileUrl: '#',
      fileType: 'PDF'
    },
    {
      id: 'doc2',
      title: 'Prescrição Antibiótico',
      type: 'prescription',
      date: '15/03/2025',
      fileUrl: '#',
      fileType: 'PDF'
    },
    {
      id: 'doc3',
      title: 'Atestado Médico',
      type: 'certificate',
      date: '15/03/2025',
      fileUrl: '#',
      fileType: 'PDF'
    }
  ]
};

// Componente para mostrar uma imagem com informações
const ImageCard: FC<{
  src: string;
  title: string;
  date: string;
  description: string;
}> = ({ src, title, date, description }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <img src={src} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-secondary text-white px-2 py-1 text-xs">
          {date}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <div className="flex justify-end mt-2 gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowDownTrayIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar comparativo antes/depois
const BeforeAfterCompare: FC<{
  title: string;
  date: string;
  description: string;
  before: string;
  after: string | null;
}> = ({ title, date, description, before, after }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
      <div className="p-3 border-b">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">{title}</h4>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{date}</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/2 p-2">
          <p className="text-xs font-semibold mb-1 text-center">Antes</p>
          <img src={before} alt="Antes" className="w-full h-40 object-cover rounded" />
        </div>
        {after ? (
          <div className="sm:w-1/2 p-2">
            <p className="text-xs font-semibold mb-1 text-center">Depois</p>
            <img src={after} alt="Depois" className="w-full h-40 object-cover rounded" />
          </div>
        ) : (
          <div className="sm:w-1/2 p-2 flex items-center justify-center bg-gray-50">
            <p className="text-sm text-gray-500">Tratamento em andamento</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para mostrar documentos
const DocumentItem: FC<{
  title: string;
  type: string;
  date: string;
  fileType: string;
}> = ({ title, type, date, fileType }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
      <div className="flex items-center">
        <div className="bg-gray-100 p-2 rounded">
          <span className="text-xs font-semibold">{fileType}</span>
        </div>
        <div className="ml-3">
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-gray-600">{date}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">Visualizar</Button>
        <Button variant="ghost" size="sm">
          <ArrowDownTrayIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const PatientImagesGallery: FC<PatientImagesGalleryProps> = ({ patientId, isNewPatient = false }) => {
  const [timelineIndex, setTimelineIndex] = useState(0);

  if (isNewPatient) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">
          Não há imagens disponíveis para um novo paciente.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Salve o cadastro básico para adicionar imagens e documentos.
        </p>
      </div>
    );
  }

  // Navegação da timeline
  const nextTimelineItem = () => {
    if (timelineIndex < mockImages.timeline.length - 1) {
      setTimelineIndex(timelineIndex + 1);
    }
  };

  const prevTimelineItem = () => {
    if (timelineIndex > 0) {
      setTimelineIndex(timelineIndex - 1);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-poppins font-semibold mb-4">Imagens e Documentos</h3>
      
      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="photos">Fotografias</TabsTrigger>
          <TabsTrigger value="radiographs">Radiografias</TabsTrigger>
          <TabsTrigger value="scans">Escaneamentos</TabsTrigger>
          <TabsTrigger value="models">Modelos 3D</TabsTrigger>
          <TabsTrigger value="timeline">Evolução</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        
        {/* Fotografias */}
        <TabsContent value="photos">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Fotografias Clínicas</h4>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Adicionar Fotos</span>
              </Button>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-3">Extraorais</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mockImages.photos
                  .filter(img => img.type === 'extraoral')
                  .map(img => (
                    <ImageCard 
                      key={img.id}
                      src={img.src}
                      title={img.title}
                      date={img.date}
                      description={img.description}
                    />
                  ))
                }
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3">Intraorais</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {mockImages.photos
                  .filter(img => img.type === 'intraoral')
                  .map(img => (
                    <ImageCard 
                      key={img.id}
                      src={img.src}
                      title={img.title}
                      date={img.date}
                      description={img.description}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Radiografias */}
        <TabsContent value="radiographs">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Radiografias</h4>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Adicionar Radiografia</span>
              </Button>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-3">Panorâmicas</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockImages.radiographs
                  .filter(img => img.type === 'panoramic')
                  .map(img => (
                    <ImageCard 
                      key={img.id}
                      src={img.src}
                      title={img.title}
                      date={img.date}
                      description={img.description}
                    />
                  ))
                }
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-medium mb-3">Periapicais</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockImages.radiographs
                  .filter(img => img.type === 'periapical')
                  .map(img => (
                    <ImageCard 
                      key={img.id}
                      src={img.src}
                      title={img.title}
                      date={img.date}
                      description={img.description}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Escaneamentos */}
        <TabsContent value="scans">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Escaneamentos Intraorais</h4>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Adicionar Escaneamento</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockImages.scans.map(img => (
                <ImageCard 
                  key={img.id}
                  src={img.src}
                  title={img.title}
                  date={img.date}
                  description={img.description}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Modelos 3D */}
        <TabsContent value="models">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Modelos Digitais 3D</h4>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Adicionar Modelo</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockImages.models.map(img => (
                <ImageCard 
                  key={img.id}
                  src={img.src}
                  title={img.title}
                  date={img.date}
                  description={img.description}
                />
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 text-center mt-4">
              <p className="text-sm text-gray-600">Visualizador 3D interativo disponível apenas na versão desktop do software</p>
              <Button variant="secondary" size="sm" className="mt-2">Abrir no Visualizador 3D</Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Timeline de Evolução */}
        <TabsContent value="timeline">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Timeline de Evolução</h4>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={prevTimelineItem}
                  disabled={timelineIndex === 0}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {timelineIndex + 1} / {mockImages.timeline.length}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={nextTimelineItem}
                  disabled={timelineIndex === mockImages.timeline.length - 1}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              {mockImages.timeline[timelineIndex] && (
                <BeforeAfterCompare
                  title={mockImages.timeline[timelineIndex].title}
                  date={mockImages.timeline[timelineIndex].date}
                  description={mockImages.timeline[timelineIndex].description}
                  before={mockImages.timeline[timelineIndex].imageBefore}
                  after={mockImages.timeline[timelineIndex].imageAfter}
                />
              )}
            </div>
            
            <div className="relative pt-8">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200"></div>
              <div className="flex justify-between">
                {mockImages.timeline.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`relative flex flex-col items-center cursor-pointer`}
                    onClick={() => setTimelineIndex(index)}
                  >
                    <div 
                      className={`w-3 h-3 rounded-full ${index <= timelineIndex ? 'bg-secondary' : 'bg-gray-300'} 
                                  -mt-1.5 z-10`}
                    ></div>
                    <div className={`text-xs mt-1 ${index === timelineIndex ? 'text-secondary font-medium' : 'text-gray-500'}`}>
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="flex items-center gap-1">
                <ArrowsRightLeftIcon className="h-4 w-4" />
                <span>Comparar Períodos</span>
              </Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Documentos */}
        <TabsContent value="documents">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-lg">Documentos Digitalizados</h4>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Adicionar Documento</span>
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockImages.documents.map(doc => (
                    <DocumentItem
                      key={doc.id}
                      title={doc.title}
                      type={doc.type}
                      date={doc.date}
                      fileType={doc.fileType}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start mt-4">
              <ClockIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Documentos com validade próxima ao vencimento</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Prescrição de antibiótico vence em 5 dias. Considere renovar se o tratamento ainda estiver em andamento.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientImagesGallery; 