
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScreen = flowData.screens[currentScreenIndex];

  // Reset to first screen when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentScreenIndex(0);
      setIsPlaying(false);
      setIsTransitioning(false);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentScreenIndex < flowData.screens.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreenIndex(currentScreenIndex + 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentScreenIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreenIndex(currentScreenIndex - 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentScreen) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Flow Preview</DialogTitle>
            <DialogDescription>Preview your onboarding flow</DialogDescription>
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
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] md:h-[85vh] p-0 overflow-hidden">
        <DialogDescription className="sr-only">
          Interactive preview of your onboarding flow
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b bg-white/90 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            <DialogTitle className="text-base md:text-lg font-semibold">Flow Preview</DialogTitle>
            <Badge variant="secondary" className="text-xs md:text-sm">
              {currentScreenIndex + 1} of {flowData.screens.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePrevious}
              disabled={currentScreenIndex === 0 || isTransitioning}
              className="h-8 w-8 md:h-9 md:w-9"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handlePlayToggle}
              className="h-8 w-8 md:h-9 md:w-9"
            >
              {isPlaying ? <Pause className="w-3 h-3 md:w-4 md:h-4" /> : <Play className="w-3 h-3 md:w-4 md:h-4" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleNext}
              disabled={currentScreenIndex === flowData.screens.length - 1 || isTransitioning}
              className="h-8 w-8 md:h-9 md:w-9"
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 md:h-9 md:w-9">
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-100 to-blue-100 overflow-hidden">
          {/* Screen Preview */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <div 
              className={`
                relative transition-all duration-300 ease-out
                ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                ${currentScreen.properties.layout === 'fullscreen' 
                  ? 'w-full h-full max-w-none' 
                  : currentScreen.properties.size === 'large' 
                    ? 'w-full max-w-md md:max-w-lg lg:max-w-xl' 
                    : currentScreen.properties.size === 'small' 
                      ? 'w-full max-w-xs md:max-w-sm' 
                      : 'w-full max-w-sm md:max-w-md lg:max-w-lg'
                }
              `}
            >
              <Card 
                className="shadow-2xl overflow-hidden"
                style={{ 
                  backgroundColor: currentScreen.properties.style.backgroundColor,
                  borderRadius: `${currentScreen.properties.style.borderRadius}px`
                }}
              >
                <CardContent className="p-4 md:p-6 lg:p-8 text-center">
                  <h2 
                    className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4"
                    style={{ color: currentScreen.properties.style.textColor }}
                  >
                    {currentScreen.properties.title}
                  </h2>
                  
                  <p 
                    className="text-sm md:text-base lg:text-lg mb-6 md:mb-8 opacity-80 leading-relaxed"
                    style={{ color: currentScreen.properties.style.textColor }}
                  >
                    {currentScreen.properties.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                    <Button
                      className="px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg font-medium"
                      style={{ 
                        backgroundColor: currentScreen.properties.style.buttonColor,
                        color: 'white'
                      }}
                      onClick={handleNext}
                      disabled={isTransitioning}
                    >
                      {currentScreen.properties.buttonText}
                    </Button>
                    
                    {currentScreen.properties.secondaryButtonText && (
                      <Button 
                        variant="outline" 
                        className="px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg"
                        onClick={handleNext}
                        disabled={isTransitioning}
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
        <div className="p-3 md:p-4 bg-white/90 backdrop-blur-sm border-t shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
              <Badge variant="outline" className="capitalize text-xs">
                {currentScreen.type}
              </Badge>
              <Badge variant="outline" className="capitalize text-xs">
                {currentScreen.properties.layout}
              </Badge>
              <Badge variant="outline" className="capitalize text-xs hidden sm:inline-flex">
                {currentScreen.properties.style.animation}
              </Badge>
            </div>
            
            <div className="text-xs md:text-sm text-slate-600 truncate ml-2">
              ID: {currentScreen.id}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
