
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Type, Upload, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface InputSectionProps {
  onGenerate: (input: { type: "text" | "image", data: string | File }) => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [textPrompt, setTextPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image under 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  const clearImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl(null);
  };
  
  const handleGenerate = () => {
    if (activeTab === "text" && textPrompt.trim()) {
      onGenerate({ type: "text", data: textPrompt.trim() });
    } else if (activeTab === "image" && imageFile) {
      onGenerate({ type: "image", data: imageFile });
    } else {
      toast({
        title: "Input required",
        description: activeTab === "text" ? "Please enter a text prompt." : "Please upload an image.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="bg-card border border-border p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create a 3D Model</h2>
        
        <Tabs defaultValue="text" value={activeTab} onValueChange={(val) => setActiveTab(val as "text" | "image")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <Type size={16} /> Text Prompt
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <ImageIcon size={16} /> Image Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-0">
            <div className="space-y-4">
              <div>
                <Input
                  value={textPrompt}
                  onChange={(e) => setTextPrompt(e.target.value)}
                  placeholder="Describe what you want to create (e.g., 'a small toy car')"
                  className="focus:ring-primary"
                  disabled={isGenerating}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Be specific about shapes, details, and features for best results.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
            {previewUrl ? (
              <div className="relative border border-border rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-contain bg-black/20" 
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 rounded-full bg-background/80 hover:bg-background"
                  onClick={clearImage}
                  disabled={isGenerating}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <label className="cursor-pointer block w-full h-full">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or WebP (max. 5MB)
                    </p>
                  </div>
                  <Input 
                    type="file"
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="sr-only"
                    disabled={isGenerating}
                  />
                </label>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Button 
            onClick={handleGenerate}
            className="w-full bg-primary hover:bg-primary/90" 
            disabled={isGenerating || (activeTab === "text" && !textPrompt.trim()) || (activeTab === "image" && !imageFile)}
          >
            {isGenerating ? "Generating..." : "Generate 3D Model"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
