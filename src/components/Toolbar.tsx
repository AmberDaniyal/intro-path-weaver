
import { Button } from '@/components/ui/button';
import { Play, Download, Share2, Save, Undo, Redo } from 'lucide-react';

interface ToolbarProps {
  onPreview: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onPreview }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 mr-4">
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
        <Save className="w-4 h-4 mr-2" />
        Save
      </Button>
      
      <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 hover:bg-slate-50">
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      <Button variant="outline" size="sm" className="text-slate-600 border-slate-300 hover:bg-slate-50">
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      
      <Button 
        onClick={onPreview}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        size="sm"
      >
        <Play className="w-4 h-4 mr-2" />
        Preview
      </Button>
    </div>
  );
};
