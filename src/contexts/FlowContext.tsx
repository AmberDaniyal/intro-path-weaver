import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FlowData, Screen, Connection, FlowContext as FlowContextType } from '@/types/flow';

const FlowContext = createContext<FlowContextType | null>(null);

const demoFlowData: FlowData = {
  id: 'demo-flow-1',
  name: 'SaaS Product Onboarding Demo',
  description: 'A complete onboarding flow demo showing all features',
  screens: [
    {
      id: 'welcome-1',
      type: 'welcome',
      position: { x: 100, y: 100 },
      properties: {
        title: 'Welcome to TaskFlow!',
        description: 'Get ready to revolutionize how your team manages projects. This quick tour will show you the key features.',
        buttonText: 'Start Tour',
        secondaryButtonText: 'Skip',
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1e293b',
          buttonColor: '#3b82f6',
          animation: 'fade',
          borderRadius: 12
        },
        size: 'large',
        layout: 'modal'
      },
      actions: [
        {
          id: 'action-1',
          trigger: 'click',
          targetScreenId: 'feature-1',
          eventName: 'onboarding_started'
        }
      ],
      isStartScreen: true
    },
    {
      id: 'feature-1',
      type: 'feature',
      position: { x: 500, y: 100 },
      properties: {
        title: 'Smart Project Dashboard',
        description: 'Get a bird\'s eye view of all your projects, track progress, and identify bottlenecks instantly.',
        buttonText: 'Show Me More',
        style: {
          backgroundColor: '#f8fafc',
          textColor: '#1e293b',
          buttonColor: '#8b5cf6',
          animation: 'slide',
          borderRadius: 8
        },
        size: 'medium',
        layout: 'modal'
      },
      actions: [
        {
          id: 'action-2',
          trigger: 'click',
          targetScreenId: 'feature-2',
          eventName: 'dashboard_feature_viewed'
        }
      ]
    },
    {
      id: 'feature-2',
      type: 'feature',
      position: { x: 900, y: 100 },
      properties: {
        title: 'Real-time Collaboration',
        description: 'Work together seamlessly with instant updates, comments, and notifications for your entire team.',
        buttonText: 'That\'s Cool!',
        style: {
          backgroundColor: '#fef3c7',
          textColor: '#1e293b',
          buttonColor: '#f59e0b',
          animation: 'bounce',
          borderRadius: 16
        },
        size: 'medium',
        layout: 'tooltip'
      },
      actions: [
        {
          id: 'action-3',
          trigger: 'click',
          targetScreenId: 'form-1',
          eventName: 'collaboration_feature_viewed'
        }
      ]
    },
    {
      id: 'form-1',
      type: 'form',
      position: { x: 300, y: 350 },
      properties: {
        title: 'Let\'s Set Up Your Workspace',
        description: 'Tell us a bit about your team so we can customize your experience.',
        buttonText: 'Create Workspace',
        secondaryButtonText: 'Do This Later',
        style: {
          backgroundColor: '#ecfdf5',
          textColor: '#1e293b',
          buttonColor: '#10b981',
          animation: 'scale',
          borderRadius: 10
        },
        size: 'large',
        layout: 'modal'
      },
      actions: [
        {
          id: 'action-4',
          trigger: 'click',
          targetScreenId: 'tutorial-1',
          eventName: 'workspace_setup_started'
        }
      ]
    },
    {
      id: 'tutorial-1',
      type: 'tutorial',
      position: { x: 700, y: 350 },
      properties: {
        title: 'Create Your First Project',
        description: 'Click the "+" button in the top right corner to create a new project. Give it a name and choose a template.',
        buttonText: 'I Did It!',
        style: {
          backgroundColor: '#fff7ed',
          textColor: '#1e293b',
          buttonColor: '#ea580c',
          animation: 'fade',
          borderRadius: 8
        },
        size: 'medium',
        layout: 'banner'
      },
      actions: [
        {
          id: 'action-5',
          trigger: 'click',
          targetScreenId: 'tutorial-2',
          eventName: 'first_project_created'
        }
      ]
    },
    {
      id: 'tutorial-2',
      type: 'tutorial',
      position: { x: 1100, y: 350 },
      properties: {
        title: 'Invite Your Team',
        description: 'Go to Settings > Team Members and invite your colleagues. They\'ll get an email to join your workspace.',
        buttonText: 'Next Step',
        style: {
          backgroundColor: '#f0f9ff',
          textColor: '#1e293b',
          buttonColor: '#0ea5e9',
          animation: 'slide',
          borderRadius: 12
        },
        size: 'medium',
        layout: 'tooltip'
      },
      actions: [
        {
          id: 'action-6',
          trigger: 'click',
          targetScreenId: 'success-1',
          eventName: 'team_invitation_completed'
        }
      ]
    },
    {
      id: 'success-1',
      type: 'success',
      position: { x: 500, y: 600 },
      properties: {
        title: 'You\'re All Set! 🎉',
        description: 'Congratulations! You\'ve completed the onboarding. Your team is ready to start collaborating and getting things done.',
        buttonText: 'Go to Dashboard',
        secondaryButtonText: 'Watch Tutorial Video',
        style: {
          backgroundColor: '#f0fdf4',
          textColor: '#1e293b',
          buttonColor: '#16a34a',
          animation: 'bounce',
          borderRadius: 16
        },
        size: 'large',
        layout: 'fullscreen'
      },
      actions: [
        {
          id: 'action-7',
          trigger: 'click',
          eventName: 'onboarding_completed'
        }
      ]
    }
  ],
  connections: [
    {
      id: 'conn-1',
      fromScreenId: 'welcome-1',
      toScreenId: 'feature-1',
      label: 'Start'
    },
    {
      id: 'conn-2',
      fromScreenId: 'feature-1',
      toScreenId: 'feature-2',
      label: 'Next'
    },
    {
      id: 'conn-3',
      fromScreenId: 'feature-2',
      toScreenId: 'form-1',
      label: 'Continue'
    },
    {
      id: 'conn-4',
      fromScreenId: 'form-1',
      toScreenId: 'tutorial-1',
      label: 'Setup'
    },
    {
      id: 'conn-5',
      fromScreenId: 'tutorial-1',
      toScreenId: 'tutorial-2',
      label: 'Complete'
    },
    {
      id: 'conn-6',
      fromScreenId: 'tutorial-2',
      toScreenId: 'success-1',
      label: 'Finish'
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flowData, setFlowData] = useState<FlowData>(demoFlowData);
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
