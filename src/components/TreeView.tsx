import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type TreeViewProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PropertyOrigin = 'global' | 'range' | 'specific';

type TreeProperty = {
  name: string;
  origin: PropertyOrigin;
  isOverridden: boolean;
};

type TreeElement = {
  name: string;
  properties: TreeProperty[];
};

  const elements: TreeElement[] = [
    {
      name: 'Headline',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
        { name: 'Font Color', origin: 'range', isOverridden: true },
      ],
    },
    {
      name: 'Description',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
        { name: 'Font Size', origin: 'specific', isOverridden: true },
      ],
    },
    {
      name: 'Cover Image',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
        { name: 'X-Offset', origin: 'specific', isOverridden: true },
        { name: 'Y-Offset', origin: 'specific', isOverridden: true },
        { name: 'Scale', origin: 'range', isOverridden: true },
      ],
    },
    {
      name: 'Photo Credits',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
      ],
    },
    {
      name: 'Bottom Right Logo',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
      ],
    },
    {
      name: 'Bottom Left Logo',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
      ],
    },
  ];

export function TreeView({ isOpen, onClose }: TreeViewProps) {
  const [expandedElements, setExpandedElements] = useState<Set<string>>(
    new Set(['Headline', 'Description', 'Cover Image'])
  );

  const toggleElement = (element: string) => {
    const newExpanded = new Set(expandedElements);
    if (newExpanded.has(element)) {
      newExpanded.delete(element);
    } else {
      newExpanded.add(element);
    }
    setExpandedElements(newExpanded);
  };

  const expandAll = () => {
    setExpandedElements(new Set(elements.map((e) => e.name)));
  };

  const collapseAll = () => {
    setExpandedElements(new Set());
  };

  const getOriginColor = (origin: PropertyOrigin) => {
    switch (origin) {
      case 'global':
        return 'text-gray-600 bg-gray-100';
      case 'range':
        return 'text-blue-600 bg-blue-100';
      case 'specific':
        return 'text-purple-600 bg-purple-100';
    }
  };

  const getOriginLabel = (origin: PropertyOrigin) => {
    switch (origin) {
      case 'global':
        return 'Global';
      case 'range':
        return 'Range';
      case 'specific':
        return 'Specific';
    }
  };

  return (
    <div
      className={`fixed top-20 left-6 w-80 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[400px] opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-gray-900">Tree View</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-white">
          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="text-xs h-7"
          >
            Expand All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="text-xs h-7"
          >
            Collapse All
          </Button>
        </div>

        {/* Tree Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {elements.map((element) => (
              <div key={element.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleElement(element.name)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-900">{element.name}</span>
                  {expandedElements.has(element.name) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {expandedElements.has(element.name) && (
                  <div className="px-2 pb-2 space-y-1.5 bg-gray-50/30">
                    {element.properties.map((property) => (
                      <div
                        key={property.name}
                        className="flex items-center justify-between px-2 py-1.5 bg-white rounded border border-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          {property.isOverridden && (
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          )}
                          <span className="text-xs text-gray-700">{property.name}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getOriginColor(
                            property.origin
                          )}`}
                        >
                          {getOriginLabel(property.origin)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
