
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FlowData, Screen, Connection, FlowContext as FlowContextType } from '@/types/flow';

const FlowContext = createContext<FlowContextType | null>(null);

const initialFlowData: FlowData = {
  id: 'flow-1',
  name: 'Untitled Flow',
  description: 'A new onboarding flow',
  screens: [],
  connections: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flowData, setFlowData] = useState<FlowData>(initialFlowData);
  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null);

  const updateScreen = (screenId: string, updates: Partial<Screen>) => {
    setFlowData(prev => ({
      ...prev,
      screens: prev.screens.map(screen =>
        screen.id === screenId ? { ...screen, ...updates } : screen
      ),
      updatedAt: new Date().toISOString(),
    }));
  };

  const addScreen = (screen: Omit<Screen, 'id'>) => {
    const newScreen: Screen = {
      ...screen,
      id: `screen-${Date.now()}`,
    };
    
    setFlowData(prev => ({
      ...prev,
      screens: [...prev.screens, newScreen],
      updatedAt: new Date().toISOString(),
    }));
  };

  const deleteScreen = (screenId: string) => {
    setFlowData(prev => ({
      ...prev,
      screens: prev.screens.filter(screen => screen.id !== screenId),
      connections: prev.connections.filter(
        conn => conn.fromScreenId !== screenId && conn.toScreenId !== screenId
      ),
      updatedAt: new Date().toISOString(),
    }));
    
    if (selectedScreenId === screenId) {
      setSelectedScreenId(null);
    }
  };

  const addConnection = (connection: Omit<Connection, 'id'>) => {
    const newConnection: Connection = {
      ...connection,
      id: `connection-${Date.now()}`,
    };
    
    setFlowData(prev => ({
      ...prev,
      connections: [...prev.connections, newConnection],
      updatedAt: new Date().toISOString(),
    }));
  };

  const deleteConnection = (connectionId: string) => {
    setFlowData(prev => ({
      ...prev,
      connections: prev.connections.filter(conn => conn.id !== connectionId),
      updatedAt: new Date().toISOString(),
    }));
  };

  const setSelectedScreen = (screenId: string | null) => {
    setSelectedScreenId(screenId);
  };

  const exportFlow = () => flowData;

  const value: FlowContextType = {
    flowData,
    selectedScreenId,
    updateScreen,
    addScreen,
    deleteScreen,
    addConnection,
    deleteConnection,
    setSelectedScreen,
    exportFlow,
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};
