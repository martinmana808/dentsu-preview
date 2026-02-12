import { X } from 'lucide-react';
import { Button } from './ui/button';

type HierarchyLegendProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function HierarchyLegend({ isOpen, onClose }: HierarchyLegendProps) {
  return (
    <div
      className={`fixed bottom-6 left-6 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-40 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[400px] opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="text-sm text-gray-900">Value Hierarchy</h3>
          <Button variant="ghost" size="icon" className="w-7 h-7" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-100 border border-gray-300" />
              <span className="text-xs text-gray-700">Global</span>
            </div>
            <p className="text-xs text-gray-500 ml-5">
              Default values applied to all sizes
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-100 border border-purple-300" />
              <span className="text-xs text-purple-500">Range</span>
            </div>
            <p className="text-xs text-gray-500 ml-5">
              Values for groups (e.g., +480px, landscape, etc.)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-100 border border-orange-300" />
              <span className="text-xs text-gray-700">Sizes</span>
            </div>
            <p className="text-xs text-gray-500 ml-5">
              Per-size overrides (highest priority)
            </p>
          </div>

          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="flex items-center gap-2">
              <span class="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full">2</span>
              <span className="text-xs text-gray-700">Overridden indicator (n)</span>
            </div>
            <p className="text-xs text-gray-500 ml-4">
              Shows an override done in a higher hierarchy level 
            </p>
          </div>
          <div className="infoPurple p-2 border-t border-gray-200 space-y-2">
            <p className="text-xs text-gray-500 ml-2">
              This is an override done by the actual range or size 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
