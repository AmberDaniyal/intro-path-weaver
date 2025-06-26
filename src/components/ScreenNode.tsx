import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Screen } from '@/types/flow';
import { useFlow } from '@/contexts/FlowContext';
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  CheckCircle,
  MoreHorizontal,
  Play,
  X,
  Trash2
} from 'lucide-react';

interface ScreenNodeProps {
  screen: Screen;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onSelect: () => void;
}

const getScreenIcon = (type: Screen['type']) => {
  switch (type) {
    case 'welcome': return Sparkles;
    case 'feature': return FileText;
    case 'form': return MessageSquare;
    case 'tutorial': return BookOpen;
    case 'success': return CheckCircle;
    default: return FileText;
  }
};

const getScreenColor = (type: Screen['type']) => {
  switch (type) {
    case 'welcome': return 'from-blue-500 to-cyan-500';
    case 'feature': return 'from-purple-500 to-pink-500';
    case 'form': return 'from-green-500 to-emerald-500';
    case 'tutorial': return 'from-orange-500 to-yellow-500';
    case 'success': return 'from-emerald-500 to-teal-500';
    default: return 'from-gray-400 to-gray-500';
  }
};

export const ScreenNode: React.FC<ScreenNodeProps> = ({ 
  screen, 
  isSelected, 
  onMouseDown,
  onSelect 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteScreen } = useFlow();
  const IconComponent = getScreenIcon(screen.type);
  const colorClass = getScreenColor(screen.type);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteScreen(screen.id);
    setShowDeleteDialog(false);
  };

  const handleContextDelete = () => {
    setShowDeleteDialog(true);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={`absolute cursor-move transition-all duration-200 ${
              isSelected ? 'z-30' : 'z-20'
            }`}
            style={{
              left: screen.position.x,
              top: screen.position.y,
              transform: isSelected ? 'scale(1.02)' : 'scale(1)'
            }}
            onMouseDown={onMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}
          >
            <Card 
              className={`w-80 transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 bg-blue-50/30' 
                  : 'shadow-md hover:shadow-lg'
              }`}
            >
              <CardHeader className="pb-3 relative">
                {/* Modern delete button on hover */}
                {isHovered && (
                  <button
                    onClick={handleDelete}
                    className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition-colors flex items-center justify-center z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm leading-none">
                        {screen.properties.title}
                      </h3>
                      <Badge variant="secondary" className="mt-1 text-xs capitalize">
                        {screen.type}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {screen.properties.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Button 
                        size="sm" 
                        className="w-full h-8 text-xs"
                        style={{ backgroundColor: screen.properties.style.buttonColor }}
                      >
                        {screen.properties.buttonText}
                      </Button>
                    </div>
                    {screen.properties.secondaryButtonText && (
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        {screen.properties.secondaryButtonText}
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="capitalize">{screen.properties.layout}</span>
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      <span className="capitalize">{screen.properties.style.animation}</span>
                    </div>
                  </div>
                </div>
                
                {screen.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">Actions</div>
                    <div className="flex flex-wrap gap-1">
                      {screen.actions.map((action, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {action.trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleContextDelete} className="text-red-600 focus:text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Screen
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Screen</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this screen? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
