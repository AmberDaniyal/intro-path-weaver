
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFlow } from '@/contexts/FlowContext';
import { Screen } from '@/types/flow';
import { X, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose }) => {
  const { flowData } = useFlow();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentScreen = flowData.screens[currentScreenIndex];

  const handleNext = () => {
    if (currentScreenIndex < flowData.screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    // Add auto-advance logic here if needed
  };

  if (!currentScreen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Flow Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-500 mb-4">No screens to preview</p>
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <DialogTitle className="text-lg font-semibold">Flow Preview</DialogTitle>
            <Badge variant="secondary">
              {currentScreenIndex + 1} of {flowData.screens.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrevious}
              disabled={currentScreenIndex === 0}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePlayToggle}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNext}
              disabled={currentScreenIndex === flowData.screens.length - 1}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-100 to-blue-100 overflow-hidden">
          {/* Screen Preview */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div 
              className={`
                relative transition-all duration-300 
                ${currentScreen.properties.layout === 'fullscreen' 
                  ? 'w-full h-full' 
                  : currentScreen.properties.size === 'large' 
                    ? 'w-96 h-auto' 
                    : currentScreen.properties.size === 'small' 
                      ? 'w-80 h-auto' 
                      : 'w-96 h-auto'
                }
              `}
              style={{
                animation: `${currentScreen.properties.style.animation} 0.3s ease-out`
              }}
            >
              <Card 
                className="shadow-2xl"
                style={{ 
                  backgroundColor: currentScreen.properties.style.backgroundColor,
                  borderRadius: `${currentScreen.properties.style.borderRadius}px`
                }}
              >
                <CardContent className="p-8 text-center">
                  <h2 
                    className="text-2xl font-bold mb-4"
                    style={{ color: currentScreen.properties.style.textColor }}
                  >
                    {currentScreen.properties.title}
                  </h2>
                  
                  <p 
                    className="text-lg mb-8 opacity-80"
                    style={{ color: currentScreen.properties.style.textColor }}
                  >
                    {currentScreen.properties.description}
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <Button
                      className="px-8 py-3 text-lg"
                      style={{ 
                        backgroundColor: currentScreen.properties.style.buttonColor,
                        color: 'white'
                      }}
                      onClick={handleNext}
                    >
                      {currentScreen.properties.buttonText}
                    </Button>
                    
                    {currentScreen.properties.secondaryButtonText && (
                      <Button 
                        variant="outline" 
                        className="px-8 py-3 text-lg"
                        onClick={handleNext}
                      >
                        {currentScreen.properties.secondaryButtonText}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/90 backdrop-blur-sm border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {currentScreen.type}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {currentScreen.properties.layout}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {currentScreen.properties.style.animation}
              </Badge>
            </div>
            
            <div className="text-sm text-slate-600">
              Screen ID: {currentScreen.id}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
