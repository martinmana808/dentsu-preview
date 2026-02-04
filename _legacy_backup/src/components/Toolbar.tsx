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
          <div key={index} className="relative flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`peer w-9 h-9 ${
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
              <span className="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {tool.label}
                <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
              </span>
          </div>
        ))}

        <Separator className="my-1 w-6" />

        {actions.map((action, index) => (
          <div key={index} className="relative flex items-center">
              <Button variant="ghost" size="icon" className="peer w-9 h-9 hover:bg-gray-100">
                <action.icon className="w-4 h-4 text-gray-700" />
              </Button>
              <span className="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {action.label}
                <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
              </span>
          </div>
        ))}

        <Separator className="my-1 w-6" />

        {export_tools.map((tool, index) => (
          <div key={index} className="relative flex items-center">
              <Button variant="ghost" size="icon" className="peer w-9 h-9 hover:bg-gray-100" onClick={tool.onClick}>
                <tool.icon className="w-4 h-4 text-gray-700" />
              </Button>
              <span className="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {tool.label}
                 <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
              </span>
          </div>
        ))}
    </div>
  );
}
