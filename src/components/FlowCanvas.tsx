
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { Screen } from '@/types/flow';
import { ScreenNode } from '@/components/ScreenNode';
import { ConnectionLine } from '@/components/ConnectionLine';
import { useFlow } from '@/contexts/FlowContext';

interface FlowCanvasProps {
  selectedScreen: Screen | null;
  onScreenSelect: (screen: Screen | null) => void;
}

export const FlowCanvas = forwardRef<HTMLDivElement, FlowCanvasProps>(
  ({ selectedScreen, onScreenSelect }, ref) => {
    const { flowData, updateScreen, setSelectedScreen } = useFlow();
    const [dragState, setDragState] = useState<{
      isDragging: boolean;
      screenId: string | null;
      startPos: { x: number; y: number };
      initialScreenPos: { x: number; y: number };
    }>({
      isDragging: false,
      screenId: null,
      startPos: { x: 0, y: 0 },
      initialScreenPos: { x: 0, y: 0 }
    });

    const canvasRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent, screenId: string) => {
      e.preventDefault();
      e.stopPropagation();
      
      const screen = flowData.screens.find(s => s.id === screenId);
      if (!screen) return;
      
      setDragState({
        isDragging: true,
        screenId,
        startPos: { x: e.clientX, y: e.clientY },
        initialScreenPos: screen.position
      });
      
      onScreenSelect(screen);
      setSelectedScreen(screenId);
    }, [flowData.screens, onScreenSelect, setSelectedScreen]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!dragState.isDragging || !dragState.screenId) return;
      
      const deltaX = e.clientX - dragState.startPos.x;
      const deltaY = e.clientY - dragState.startPos.y;
      
      const newPosition = {
        x: Math.max(10, dragState.initialScreenPos.x + deltaX),
        y: Math.max(10, dragState.initialScreenPos.y + deltaY)
      };
      
      updateScreen(dragState.screenId, { position: newPosition });
    }, [dragState, updateScreen]);

    const handleMouseUp = useCallback(() => {
      setDragState({
        isDragging: false,
        screenId: null,
        startPos: { x: 0, y: 0 },
        initialScreenPos: { x: 0, y: 0 }
      });
    }, []);

    React.useEffect(() => {
      if (dragState.isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onScreenSelect(null);
        setSelectedScreen(null);
      }
    };

    return (
      <div 
        ref={ref}
        className="w-full h-full relative overflow-auto bg-gradient-to-br from-slate-50 to-blue-50"
        onClick={handleCanvasClick}
      >
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle, #64748b 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 min-w-full min-h-full">
          {flowData.connections.map(connection => {
            const fromScreen = flowData.screens.find(s => s.id === connection.fromScreenId);
            const toScreen = flowData.screens.find(s => s.id === connection.toScreenId);
            
            if (!fromScreen || !toScreen) return null;
            
            return (
              <ConnectionLine
                key={connection.id}
                from={{
                  x: fromScreen.position.x + 150,
                  y: fromScreen.position.y + 100
                }}
                to={{
                  x: toScreen.position.x + 150,
                  y: toScreen.position.y + 100
                }}
                label={connection.label}
              />
            );
          })}
        </svg>
        
        {/* Screen Nodes */}
        <div className="absolute inset-0 z-20 min-w-full min-h-full">
          {flowData.screens.map(screen => (
            <ScreenNode
              key={screen.id}
              screen={screen}
              isSelected={selectedScreen?.id === screen.id}
              onMouseDown={(e) => handleMouseDown(e, screen.id)}
            />
          ))}
        </div>
        
        {/* Empty State */}
        {flowData.screens.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center max-w-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">Start Building Your Flow</h3>
              <p className="text-sm md:text-base text-slate-600 mb-4">
                Add screen templates from the sidebar to create your onboarding experience
              </p>
              <div className="text-xs md:text-sm text-slate-500">
                Drag screens around the canvas to arrange your flow
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FlowCanvas.displayName = 'FlowCanvas';
