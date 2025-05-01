import React, { useEffect, useRef } from 'react';
import { Package } from 'lucide-react';

interface ModelViewerProps {
  modelUrl: string | null;
  isLoading: boolean;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modelUrl && containerRef.current) {
      console.log("Loading 3D model from:", modelUrl);
    }
  }, [modelUrl]);

  if (isLoading) {
    return (
      <div className="scene-container flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center text-center p-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
            <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center animate-pulse">
              <Package className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-foreground/80">Generating 3D model...</p>
          <p className="mt-2 text-sm text-muted-foreground">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (!modelUrl) {
    return (
      <div className="scene-container grid-pattern flex items-center justify-center border border-border/50">
        <div className="flex flex-col items-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground/80">No model generated yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Upload an image or enter a text prompt to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scene-container border border-primary/50 grid-pattern" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-floating">
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-lg animate-pulse-slow"></div>
            <div className="absolute inset-2 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Package className="h-12 w-12 text-primary/70" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-medium">
        Model Generated
      </div>
    </div>
  );
};

export default ModelViewer;
