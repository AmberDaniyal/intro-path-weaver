
import { useState, useCallback, useRef } from 'react';
import { FlowCanvas } from '@/components/FlowCanvas';
import { Sidebar } from '@/components/Sidebar';
import { PropertiesPanel } from '@/components/PropertiesPanel';
import { Toolbar } from '@/components/Toolbar';
import { PreviewModal } from '@/components/PreviewModal';
import { FlowProvider, useFlow } from '@/contexts/FlowContext';
import { Screen } from '@/types/flow';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menu, X, Play } from 'lucide-react';

const IndexContent = () => {
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProperties, setShowProperties] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { flowData } = useFlow();

  const handleDemoClick = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden flex flex-col">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-6 py-2 text-center text-xs md:text-sm shrink-0">
        🚀 <strong>Live Demo</strong> - Explore all features of the Onboarding Flow Builder
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleDemoClick}
          className="ml-3 bg-white/20 text-white border-white/30 text-xs hover:bg-white/30 h-6 px-2"
        >
          <Play className="w-3 h-3 mr-1" />
          Interactive Demo
        </Button>
      </div>

      {/* Header */}
      <div className="h-14 md:h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-3 md:px-6 relative z-50 shrink-0">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs md:text-sm">OF</span>
            </div>
            <h1 className="text-sm md:text-xl font-bold text-slate-800 truncate">
              <span className="hidden sm:inline">Onboarding Flow Builder</span>
              <span className="sm:hidden">Flow Builder</span>
            </h1>
          </div>
          <div className="text-xs md:text-sm text-slate-500 truncate hidden sm:block">{flowData.name}</div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Properties Panel Button (Mobile) */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsPropertiesOpen(true)}
          >
            Properties
          </Button>
          
          <Toolbar onPreview={() => setIsPreviewOpen(true)} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full min-h-0">
        {/* Left Sidebar - Desktop */}
        <Sidebar 
          onScreenSelect={setSelectedScreen} 
          onToggle={() => setShowSidebar(!showSidebar)}
          isCollapsed={!showSidebar}
        />

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
            <div className="bg-white h-full w-80 max-w-[80vw]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Screen Templates</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Sidebar onScreenSelect={(screen) => {
                setSelectedScreen(screen);
                setIsSidebarOpen(false);
              }} />
            </div>
          </div>
        )}
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden min-w-0">
          <FlowCanvas 
            ref={canvasRef}
            selectedScreen={selectedScreen}
            onScreenSelect={(screen) => {
              setSelectedScreen(screen);
              if (screen && window.innerWidth < 768) {
                setIsPropertiesOpen(true);
              }
            }}
          />
        </div>
        
        {/* Right Properties Panel - Desktop */}
        <PropertiesPanel 
          selectedScreen={selectedScreen}
          onScreenUpdate={setSelectedScreen}
          onToggle={() => setShowProperties(!showProperties)}
          isCollapsed={!showProperties}
        />

        {/* Mobile Properties Panel Overlay */}
        {isPropertiesOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsPropertiesOpen(false)}>
            <div className="bg-white h-full w-80 max-w-[80vw] ml-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Properties</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsPropertiesOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <PropertiesPanel 
                selectedScreen={selectedScreen}
                onScreenUpdate={(screen) => {
                  setSelectedScreen(screen);
                  if (!screen) {
                    setIsPropertiesOpen(false);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

const Index = () => {
  return (
    <FlowProvider>
      <IndexContent />
    </FlowProvider>
  );
};

export default Index;
