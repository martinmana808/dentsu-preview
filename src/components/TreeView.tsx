import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type TreeViewProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PropertyOrigin = 'global' | 'range' | 'size';

type TreeProperty = {
  name: string;
  origin: PropertyOrigin;
  isOverridden: boolean;
  children?: TreeProperty[];
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
        {
          name: 'Credits',
          origin: 'global',
          isOverridden: false,
          children: [
            { name: 'copyright', origin: 'global', isOverridden: false },
            { name: 'legal text', origin: 'global', isOverridden: false },
          ],
        },
      ],
    },
    {
      name: 'Description',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
        { name: 'Font Size', origin: 'size', isOverridden: true },
      ],
    },
    {
      name: 'Cover Image',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
        { name: 'X-Offset', origin: 'size', isOverridden: true },
        { name: 'Y-Offset', origin: 'size', isOverridden: true },
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
        return '';
      case 'range':
        return 'overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full';
      case 'size':
        return 'overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-orange-500 rounded-full';
    }
  };

  const getOriginLabel = (origin: PropertyOrigin) => {
    switch (origin) {
      case 'global':
        return '';
      case 'range':
        return '1';
      case 'size':
        return '2';
    }
  };

  const renderProperty = (property: TreeProperty) => {
    if (property.children) {
      const isExpanded = expandedElements.has(property.name);
      return (
        <div key={property.name} className="space-y-1.5">
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleElement(property.name);
            }}
            className="relative tree-lvl2-hasChildren flex items-center justify-between pl-2 py-1.5 bg-white rounded   cursor-pointer font-medium"
          >
            <div className="relative flex items-center gap-4">
               {/* Match sibling styling for nested parents too? */}
               {property.isOverridden && (
                  <div className="relative " />
               )}
               <span className="relative text-xs text-gray-700">{property.name}</span>
            </div>
            {isExpanded ? (
               <ChevronDown className="relative w-4 h-4 text-gray-500" />
            ) : (
               <ChevronRight className="relative w-4 h-4 text-gray-500" />
            )}
          </div>
          {isExpanded && (
            <div className="relative tree-lvl3-children pl-4 space-y-1.5">
              {property.children.map(renderProperty)}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={property.name}
        className="relative tree-lvl2 flex items-center justify-between px-2 py-1.5   rounded "
      >
        <div className="relative flex items-center gap-4">
          {property.isOverridden && (
            <div className="relative " />
          )}
          <span className="relative text-xs text-gray-700">{property.name}</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${getOriginColor(
            property.origin
          )}`}
        >
          {getOriginLabel(property.origin)}
        </span>
      </div>
    );
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
            variant="ghost"
            size="sm"
            onClick={expandAll}
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 h-6 px-2 text-blue-600 hover:text-blue-700 text-xs"
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 rounded-md gap-1.5 has-[>svg]:px-2.5 h-6 px-2 text-blue-600 hover:text-blue-700 text-xs"
          >
            Collapse All
          </Button>
        </div>

        {/* Tree Content */}
        <div className="tree flex-1 overflow-y-auto p-4">
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
                    {element.properties.map(renderProperty)}
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
