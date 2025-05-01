import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputSection from '@/components/InputSection';
import ModelViewer from '@/components/ModelViewer';
import DownloadSection from '@/components/DownloadSection';
import { generateModel } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateModel = async (input: { type: "text" | "image"; data: string | File }) => {
    setIsGenerating(true);
    try {
      const response = await generateModel(input);
      
      if (response.status === 'success' && response.modelUrl) {
        setModelUrl(response.modelUrl);
        toast({
          title: "Model generated successfully!",
          description: "Your 3D model is now ready to view and download.",
        });
      } else {
        toast({
          title: "Generation failed",
          description: response.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating model:', error);
      toast({
        title: "Generation failed",
        description: "An unexpected error occurred while generating the model.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Transform <span className="gradient-text">2D</span> into <span className="gradient-text">3D</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            Generate 3D models from images or text descriptions using advanced AI technology.
            Perfect for prototyping, visualization, and 3D printing.
          </p>
        </div>
        
        <div className="flex flex-col items-center pb-12">
          <InputSection 
            onGenerate={handleGenerateModel} 
            isGenerating={isGenerating} 
          />
          
          <div className="w-full max-w-3xl mb-8">
            <ModelViewer 
              modelUrl={modelUrl} 
              isLoading={isGenerating} 
            />
          </div>
          
          <DownloadSection modelUrl={modelUrl} />
          <div className="w-full max-w-3xl mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border p-5 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
                    <path d="m8 16 4-4 4 4"></path>
                    <path d="M16 16v6"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Easy Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Simply upload an image or enter a text description to get started.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border p-5 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M21 7v6h-6"></path>
                    <path d="m21 13-3-3 3-3"></path>
                    <rect width="8" height="8" x="3" y="3" rx="2"></rect>
                    <rect width="8" height="8" x="3" y="13" rx="2"></rect>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI instantly transforms your input into a detailed 3D model.
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm border border-border p-5 rounded-lg">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-primary"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" x2="12" y1="15" y2="3"></line>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Ready to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Download your 3D model in OBJ or STL format for 3D printing or editing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
