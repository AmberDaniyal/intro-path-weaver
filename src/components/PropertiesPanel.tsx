
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Screen } from '@/types/flow';
import { useFlow } from '@/contexts/FlowContext';
import { Settings, Trash2, Plus, ChevronRight, ChevronLeft } from 'lucide-react';

interface PropertiesPanelProps {
  selectedScreen: Screen | null;
  onScreenUpdate: (screen: Screen | null) => void;
  onToggle?: () => void;
  isCollapsed?: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedScreen, 
  onScreenUpdate,
  onToggle,
  isCollapsed = false 
}) => {
  const { updateScreen, deleteScreen } = useFlow();

  if (isCollapsed) {
    return (
      <div className="w-12 bg-white/80 backdrop-blur-sm border-l border-slate-200 flex flex-col items-center py-4 relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6 p-0 hover:bg-slate-50"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Expand properties</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex flex-col items-center gap-3 mt-8">
          <Settings className="w-6 h-6 text-slate-400" />
          {selectedScreen && (
            <>
              <div className="w-px h-8 bg-slate-200" />
              <Badge variant="secondary" className="text-xs rotate-90 whitespace-nowrap">
                Selected
              </Badge>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!selectedScreen) {
    return (
      <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-slate-200 p-6 relative">
        {/* Toggle Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6 p-0 hover:bg-slate-50"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Collapse properties</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">No Screen Selected</h3>
          <p className="text-sm text-slate-500">
            Select a screen from the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (path: string, value: any) => {
    const updatedScreen = { ...selectedScreen };
    const keys = path.split('.');
    let current: any = updatedScreen;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateScreen(selectedScreen.id, updatedScreen);
    onScreenUpdate(updatedScreen);
  };

  const handleDeleteScreen = () => {
    if (confirm('Are you sure you want to delete this screen?')) {
      deleteScreen(selectedScreen.id);
      onScreenUpdate(null);
    }
  };

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-slate-200 overflow-y-auto relative">
      {/* Toggle Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-slate-200 shadow-sm rounded-full w-6 h-6 p-0 hover:bg-slate-50"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Collapse properties</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Screen Properties</h3>
            <Badge variant="secondary" className="mt-1 capitalize">
              {selectedScreen.type}
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDeleteScreen}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Basic Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Basic Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-xs font-medium text-slate-600">Title</Label>
              <Input
                id="title"
                value={selectedScreen.properties.title}
                onChange={(e) => handlePropertyChange('properties.title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-xs font-medium text-slate-600">Description</Label>
              <Textarea
                id="description"
                value={selectedScreen.properties.description}
                onChange={(e) => handlePropertyChange('properties.description', e.target.value)}
                className="mt-1 resize-none"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="buttonText" className="text-xs font-medium text-slate-600">Button Text</Label>
              <Input
                id="buttonText"
                value={selectedScreen.properties.buttonText}
                onChange={(e) => handlePropertyChange('properties.buttonText', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="secondaryButtonText" className="text-xs font-medium text-slate-600">Secondary Button (Optional)</Label>
              <Input
                id="secondaryButtonText"
                value={selectedScreen.properties.secondaryButtonText || ''}
                onChange={(e) => handlePropertyChange('properties.secondaryButtonText', e.target.value)}
                className="mt-1"
                placeholder="Skip, Back, etc."
              />
            </div>
          </CardContent>
        </Card>

        {/* Layout & Appearance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Layout & Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-slate-600">Layout Type</Label>
              <Select
                value={selectedScreen.properties.layout}
                onValueChange={(value) => handlePropertyChange('properties.layout', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modal">Modal</SelectItem>
                  <SelectItem value="fullscreen">Fullscreen</SelectItem>
                  <SelectItem value="tooltip">Tooltip</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-slate-600">Size</Label>
              <Select
                value={selectedScreen.properties.size}
                onValueChange={(value) => handlePropertyChange('properties.size', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-slate-600">Animation</Label>
              <Select
                value={selectedScreen.properties.style.animation}
                onValueChange={(value) => handlePropertyChange('properties.style.animation', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Style */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Style</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="backgroundColor" className="text-xs font-medium text-slate-600">Background Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={selectedScreen.properties.style.backgroundColor}
                  onChange={(e) => handlePropertyChange('properties.style.backgroundColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={selectedScreen.properties.style.backgroundColor}
                  onChange={(e) => handlePropertyChange('properties.style.backgroundColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="buttonColor" className="text-xs font-medium text-slate-600">Button Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="buttonColor"
                  type="color"
                  value={selectedScreen.properties.style.buttonColor}
                  onChange={(e) => handlePropertyChange('properties.style.buttonColor', e.target.value)}
                  className="w-12 h-8 p-1 border rounded"
                />
                <Input
                  value={selectedScreen.properties.style.buttonColor}
                  onChange={(e) => handlePropertyChange('properties.style.buttonColor', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              Actions
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedScreen.actions.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-xs text-slate-500 mb-2">No actions defined</p>
                <Button variant="outline" size="sm" className="text-xs">
                  Add Action
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedScreen.actions.map((action, index) => (
                  <div key={index} className="p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs capitalize">
                        {action.trigger}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    {action.targetScreenId && (
                      <div className="text-xs text-slate-600 mt-1">
                        → {action.targetScreenId}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
