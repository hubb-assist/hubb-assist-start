import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Patient {
  id: string;
  name: string;
  photo?: string;
}

interface PatientImage {
  id: string;
  src: string;
  title: string;
  date: string;
  type: string;
}

const ImageSelection: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [images, setImages] = useState<PatientImage[]>([]);
  
  // Carregar paciente e suas imagens
  useEffect(() => {
    // Em um cenário real, carregaria do localStorage ou API
    const storedPatient = localStorage.getItem('hof.paciente');
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
    
    // Buscar imagens reais do localStorage (salvas pelo módulo de upload)
    const patientImagesKey = `patient_${patientId}_images`;
    const storedImages = localStorage.getItem(patientImagesKey);
    
    if (storedImages) {
      const imagesData = JSON.parse(storedImages);
      
      // Filtrar apenas as fotografias (não incluir radiografias, etc)
      const photos = imagesData.photos || [];
      
      // Converter para o formato esperado pela interface
      const patientPhotos: PatientImage[] = photos.map((photo: any) => ({
        id: photo.id,
        src: photo.src,
        title: photo.title,
        date: photo.date,
        type: photo.type
      }));
      
      if (patientPhotos.length > 0) {
        setImages(patientPhotos);
      } else {
        // Fallback para imagens mockadas se não houver fotos reais
        const mockImages: PatientImage[] = [
          {
            id: 'img-001',
            src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Frontal',
            title: 'Fotografia Frontal',
            date: '10/03/2025',
            type: 'frontal'
          },
          {
            id: 'img-002',
            src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Lateral+Direita',
            title: 'Perfil Direito',
            date: '10/03/2025',
            type: 'lateral'
          },
          {
            id: 'img-003',
            src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Lateral+Esquerda',
            title: 'Perfil Esquerdo',
            date: '10/03/2025',
            type: 'lateral'
          },
          {
            id: 'img-004',
            src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Foto+Diagonal',
            title: 'Foto Diagonal',
            date: '10/03/2025',
            type: 'diagonal'
          }
        ];
        setImages(mockImages);
      }
    } else {
      // Mockup de imagens - em um cenário real, seriam carregadas do banco de dados
      const mockImages: PatientImage[] = [
        {
          id: 'img-001',
          src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Frontal',
          title: 'Fotografia Frontal',
          date: '10/03/2025',
          type: 'frontal'
        },
        {
          id: 'img-002',
          src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Lateral+Direita',
          title: 'Perfil Direito',
          date: '10/03/2025',
          type: 'lateral'
        },
        {
          id: 'img-003',
          src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Lateral+Esquerda',
          title: 'Perfil Esquerdo',
          date: '10/03/2025',
          type: 'lateral'
        },
        {
          id: 'img-004',
          src: 'https://placehold.co/300x400/E72A4A/FFFFFF?text=Foto+Diagonal',
          title: 'Foto Diagonal',
          date: '10/03/2025',
          type: 'diagonal'
        }
      ];
      
      setImages(mockImages);
    }
  }, [patientId]);

  const handleSelectImage = (image: PatientImage) => {
    // Salvar a imagem selecionada no localStorage
    localStorage.setItem('hof.imagemSelecionada', JSON.stringify(image));
    // Redirecionar para a página de planejamento
    navigate(`/hof/planejamento/${patientId}/${image.id}`);
  };

  if (!patient) {
    return (
      <div className="text-center p-8">
        <p>Carregando informações do paciente...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/hof">
          <Button variant="outline" size="icon">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Selecionar Imagem</h1>
          <p className="text-gray-500 mt-1">
            Paciente: <strong>{patient.name}</strong> - Escolha uma fotografia para o planejamento
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fotografias Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleSelectImage(image)}
              >
                <div className="relative h-64">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-0 right-0 bg-secondary text-white px-2 py-1 text-xs rounded-bl-md">
                    {image.date}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{image.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{image.type}</span>
                    <Button variant="ghost" size="sm" className="text-secondary p-0 h-auto">
                      <span className="text-xs">Usar</span>
                      <ChevronRightIcon className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-blue-800 font-medium mb-2">Dicas para seleção de imagens</h3>
        <ul className="list-disc list-inside text-sm space-y-1 text-blue-700">
          <li>Escolha fotografias frontais para melhor análise facial</li>
          <li>Imagens bem iluminadas e sem sombras garantem melhor resultado</li>
          <li>Fotos recentes representam melhor o estado atual do paciente</li>
          <li>Expressão facial neutra é ideal para o planejamento</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageSelection; 