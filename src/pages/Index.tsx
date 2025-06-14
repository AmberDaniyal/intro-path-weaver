
import { useState, useCallback, useRef } from 'react';
import { FlowCanvas } from '@/components/FlowCanvas';
import { Sidebar } from '@/components/Sidebar';
import { PropertiesPanel } from '@/components/PropertiesPanel';
import { Toolbar } from '@/components/Toolbar';
import { PreviewModal } from '@/components/PreviewModal';
import { FlowProvider } from '@/contexts/FlowContext';
import { Screen, FlowData } from '@/types/flow';

const Index = () => {
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <FlowProvider>
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 relative z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OF</span>
              </div>
              <h1 className="text-xl font-bold text-slate-800">Onboarding Flow Builder</h1>
            </div>
            <div className="text-sm text-slate-500">Untitled Flow</div>
          </div>
          
          <Toolbar onPreview={() => setIsPreviewOpen(true)} />
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Sidebar */}
          <Sidebar onScreenSelect={setSelectedScreen} />
          
          {/* Canvas Area */}
          <div className="flex-1 relative overflow-hidden">
            <FlowCanvas 
              ref={canvasRef}
              selectedScreen={selectedScreen}
              onScreenSelect={setSelectedScreen}
            />
          </div>
          
          {/* Right Properties Panel */}
          <PropertiesPanel 
            selectedScreen={selectedScreen}
            onScreenUpdate={setSelectedScreen}
          />
        </div>

        {/* Preview Modal */}
        <PreviewModal 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </FlowProvider>
  );
};

export default Index;
