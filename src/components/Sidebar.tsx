
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  CheckCircle,
  Plus,
  Search
} from 'lucide-react';
import { Screen } from '@/types/flow';
import { useFlow } from '@/contexts/FlowContext';

interface SidebarProps {
  onScreenSelect: (screen: Screen) => void;
}

const screenTemplates = [
  {
    type: 'welcome' as const,
    icon: Sparkles,
    title: 'Welcome Screen',
    description: 'Greet users and set expectations',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'feature' as const,
    icon: FileText,
    title: 'Feature Intro',
    description: 'Highlight key features and benefits',
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'form' as const,
    icon: MessageSquare,
    title: 'Form Screen',
    description: 'Collect user information',
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'tutorial' as const,
    icon: BookOpen,
    title: 'Tutorial Step',
    description: 'Guide users through actions',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    type: 'success' as const,
    icon: CheckCircle,
    title: 'Success Screen',
    description: 'Celebrate completion',
    color: 'from-emerald-500 to-teal-500'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ onScreenSelect }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'screens'>('templates');
  const { flowData, addScreen, setSelectedScreen } = useFlow();

  const handleAddScreen = (template: typeof screenTemplates[0]) => {
    const newScreen: Omit<Screen, 'id'> = {
      type: template.type,
      position: { x: 200, y: 200 },
      properties: {
        title: template.title,
        description: template.description,
        buttonText: 'Continue',
        style: {
          backgroundColor: '#ffffff',
          textColor: '#1e293b',
          buttonColor: '#3b82f6',
          animation: 'fade',
          borderRadius: 8
        },
        size: 'medium',
        layout: 'modal'
      },
      actions: []
    };
    
    addScreen(newScreen);
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-slate-200 flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'templates'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => setActiveTab('screens')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'screens'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Screens
          {flowData.screens.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {flowData.screens.length}
            </Badge>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'templates' ? (
          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-800 mb-4">
              Add Screen Templates
            </div>
            {screenTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.type} className="cursor-pointer hover:shadow-md transition-shadow group">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 text-sm mb-1">{template.title}</h3>
                        <p className="text-xs text-slate-500 mb-3">{template.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddScreen(template)}
                          className="w-full group-hover:bg-slate-50"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Screen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-slate-800">
                Flow Screens
              </div>
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {flowData.screens.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-slate-400 mb-2">No screens yet</div>
                <div className="text-xs text-slate-500">Add templates to get started</div>
              </div>
            ) : (
              flowData.screens.map((screen) => {
                const template = screenTemplates.find(t => t.type === screen.type);
                const IconComponent = template?.icon || FileText;
                
                return (
                  <Card 
                    key={screen.id} 
                    className="cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => {
                      onScreenSelect(screen);
                      setSelectedScreen(screen.id);
                    }}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${template?.color || 'from-gray-400 to-gray-500'} flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-800 text-sm truncate">
                            {screen.properties.title}
                          </h3>
                          <p className="text-xs text-slate-500 capitalize">{screen.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
