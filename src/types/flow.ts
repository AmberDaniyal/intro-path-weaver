
export interface Position {
  x: number;
  y: number;
}

export interface ScreenStyle {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  animation: 'fade' | 'slide' | 'bounce' | 'scale';
  borderRadius: number;
}

export interface Action {
  id: string;
  trigger: 'click' | 'timer' | 'condition';
  targetScreenId?: string;
  eventName?: string;
  condition?: string;
  delay?: number;
}

export interface Screen {
  id: string;
  type: 'welcome' | 'feature' | 'form' | 'tutorial' | 'success';
  position: Position;
  properties: {
    title: string;
    description: string;
    buttonText: string;
    secondaryButtonText?: string;
    style: ScreenStyle;
    size: 'small' | 'medium' | 'large';
    layout: 'modal' | 'fullscreen' | 'tooltip' | 'banner';
  };
  actions: Action[];
  isStartScreen?: boolean;
}

export interface Connection {
  id: string;
  fromScreenId: string;
  toScreenId: string;
  condition?: string;
  label?: string;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  screens: Screen[];
  connections: Connection[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface FlowContext {
  flowData: FlowData;
  selectedScreenId: string | null;
  updateScreen: (screenId: string, updates: Partial<Screen>) => void;
  addScreen: (screen: Omit<Screen, 'id'>) => void;
  deleteScreen: (screenId: string) => void;
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  deleteConnection: (connectionId: string) => void;
  setSelectedScreen: (screenId: string | null) => void;
  exportFlow: () => FlowData;
}
