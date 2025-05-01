import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DownloadSectionProps {
  modelUrl: string | null;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ modelUrl }) => {
  if (!modelUrl) return null;
  
  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="bg-card border border-border p-6 rounded-lg shadow-lg">
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <FileDown className="h-5 w-5 text-primary" />
          Download Options
        </h3>
        
        <Tabs defaultValue="obj" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="obj">OBJ Format</TabsTrigger>
            <TabsTrigger value="stl">STL Format</TabsTrigger>
          </TabsList>
          
          <TabsContent value="obj" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              OBJ format is widely compatible with 3D software for further editing and texturing.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download OBJ Model
            </Button>
          </TabsContent>
          
          <TabsContent value="stl" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              STL format is ideal for 3D printing and manufacturing applications.
            </p>
            <Button className="w-full flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download STL Model
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DownloadSection;
