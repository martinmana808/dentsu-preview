import {
  Globe,
  Sliders,
  Network,
  ZoomIn,
  Hand,
  Save,
  X,
  Download,
  Info,
  Maximize,
  ScanLine,
} from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Separator } from './ui/separator';
import { PanelMode } from '../App';

type ToolbarProps = {
  onGlobalClick: () => void;
  onSpecificClick: () => void;
  onTreeClick: () => void;
  onInfoClick: () => void;
  activeMode: PanelMode | null;
  isTreeOpen: boolean;
};

export function Toolbar({ onGlobalClick, onSpecificClick, onTreeClick, onInfoClick, activeMode, isTreeOpen }: ToolbarProps) {
  const tools = [
    { icon: Sliders, label: 'Edit properties', onClick: onSpecificClick, mode: 'specific' as PanelMode },
    { icon: Network, label: 'Properties tree view', onClick: onTreeClick, isActive: isTreeOpen },
    { icon: Maximize, label: 'Sizes' },
    { icon: ScanLine, label: 'Ranges' },
    { icon: ZoomIn, label: 'Zoom' },
    { icon: Hand, label: 'Hand Tool' },
  ];

  const actions = [
    { icon: Save, label: 'Save' },
    { icon: X, label: 'Cancel' },
  ];

  const export_tools = [
    { icon: Download, label: 'Download JPEG' },
    { icon: Info, label: 'Information', onClick: onInfoClick },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex flex-col items-center py-2 px-1 gap-1">
        {tools.map((tool, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`w-9 h-9 ${
                  tool.mode && activeMode === tool.mode 
                    ? 'bg-blue-100 text-blue-600' 
                    : tool.isActive
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={tool.onClick}
              >
                <tool.icon className="w-4 h-4 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Separator className="my-1 w-6" />

        {actions.map((action, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-gray-100">
                <action.icon className="w-4 h-4 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Separator className="my-1 w-6" />

        {export_tools.map((tool, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9 hover:bg-gray-100" onClick={tool.onClick}>
                <tool.icon className="w-4 h-4 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
}
