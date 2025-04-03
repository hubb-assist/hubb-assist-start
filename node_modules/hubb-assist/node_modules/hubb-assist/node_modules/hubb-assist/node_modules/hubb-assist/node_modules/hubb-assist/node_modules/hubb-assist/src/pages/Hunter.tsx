import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import HunterDashboard from '../components/hunter/HunterDashboard';
import LeadCapture from '../components/hunter/LeadCapture';
import LandingPages from '../components/hunter/LandingPages';
import ConversionFunnel from '../components/hunter/ConversionFunnel';

const Hunter: React.FC = () => {
  return (
    <div className="p-6 max-w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">HUBB HUNTER</h1>
        <p className="text-gray-500">Marketing e captação de leads com inteligência artificial</p>
      </header>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[400px]">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="pages">Landing Pages</TabsTrigger>
          <TabsTrigger value="funnel">Funil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <HunterDashboard />
        </TabsContent>
        
        <TabsContent value="leads">
          <LeadCapture />
        </TabsContent>
        
        <TabsContent value="pages">
          <LandingPages />
        </TabsContent>
        
        <TabsContent value="funnel">
          <ConversionFunnel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Hunter; 