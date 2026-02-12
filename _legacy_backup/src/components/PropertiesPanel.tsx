import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { PanelMode, SelectedElement } from '../App';

type PropertiesPanelProps = {
  isOpen: boolean;
  mode: PanelMode;
  selectedElement: SelectedElement;
  onClose: () => void;
};

export function PropertiesPanel({ isOpen, mode, selectedElement, onClose }: PropertiesPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['headline', 'description', 'coverImage'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const renderGlobalProperties = () => (
    <div className="space-y-2">
      {/* Headline */}
      <PropertySection
        title="Headline"
        isExpanded={expandedSections.has('headline')}
        onToggle={() => toggleSection('headline')}
      >
        <div className="space-y-2">
          <Label htmlFor="headline-text">Text</Label>
          <Input id="headline-text" value="THE GOAT" readOnly />
        </div>
      </PropertySection>

      {/* Description */}
      <PropertySection
        title="Description"
        isExpanded={expandedSections.has('description')}
        onToggle={() => toggleSection('description')}
      >
        <div className="space-y-2">
          <Label htmlFor="description-text">Text</Label>
          <Textarea
            id="description-text"
            value="EMMA TWIGG&#10;WORLD CHAMPION - WOMEN'S SOLO&#10;WORLD ROWING BEACH SPRINT FINALS"
            readOnly
            rows={3}
          />
        </div>
      </PropertySection>

      {/* Cover Image */}
      <PropertySection
        title="Cover Image"
        isExpanded={expandedSections.has('coverImage')}
        onToggle={() => toggleSection('coverImage')}
      >
        <div className="space-y-2">
          <Label htmlFor="cover-image">Image</Label>
          <Input id="cover-image" type="file" disabled />
        </div>
      </PropertySection>

      {/* Photo Credits */}
      <PropertySection
        title="Photo Credits"
        isExpanded={expandedSections.has('photoCredits')}
        onToggle={() => toggleSection('photoCredits')}
      >
        <div className="space-y-2">
          <Label htmlFor="photo-credits">Text</Label>
          <Input id="photo-credits" value="Photographer Name" readOnly />
        </div>
      </PropertySection>

      {/* Bottom Right Logo */}
      <PropertySection
        title="Bottom Right Logo"
        isExpanded={expandedSections.has('logoBottomRight')}
        onToggle={() => toggleSection('logoBottomRight')}
      >
        <div className="space-y-2">
          <Label htmlFor="logo-right">Image</Label>
          <Input id="logo-right" type="file" disabled />
        </div>
      </PropertySection>

      {/* Bottom Left Logo */}
      <PropertySection
        title="Bottom Left Logo"
        isExpanded={expandedSections.has('logoBottomLeft')}
        onToggle={() => toggleSection('logoBottomLeft')}
      >
        <div className="space-y-2">
          <Label htmlFor="logo-left">Image</Label>
          <Input id="logo-left" type="file" disabled />
        </div>
      </PropertySection>

      {/* Font Colour */}
      <PropertySection
        title="Font Colour"
        isExpanded={expandedSections.has('fontColour')}
        onToggle={() => toggleSection('fontColour')}
      >
        <div className="space-y-2">
          <Label htmlFor="font-colour">Colour</Label>
          <select
            id="font-colour"
            value="Orange"
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
          >
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
          </select>
        </div>
      </PropertySection>
    </div>
  );

  const renderSpecificProperties = () => (
    <div className="space-y-2">
      {/* Headline */}
      <PropertySection
        title="Headline"
        isExpanded={expandedSections.has('headline')}
        onToggle={() => toggleSection('headline')}
      >
        <div className="space-y-2">
          <Label htmlFor="headline-text-specific">Text</Label>
          <Input id="headline-text-specific" value="THE GOAT" readOnly />
        </div>
      </PropertySection>

      {/* Description */}
      <PropertySection
        title="Description"
        isExpanded={expandedSections.has('description')}
        onToggle={() => toggleSection('description')}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="description-text-specific">Text</Label>
            <Textarea
              id="description-text-specific"
              value="EMMA TWIGG&#10;WORLD CHAMPION - WOMEN'S SOLO&#10;WORLD ROWING BEACH SPRINT FINALS"
              readOnly
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description-font-size">Font Size</Label>
            <Input id="description-font-size" type="number" value="20" readOnly />
          </div>
        </div>
      </PropertySection>

      {/* Cover Image */}
      <PropertySection
        title="Cover Image"
        isExpanded={expandedSections.has('coverImage')}
        onToggle={() => toggleSection('coverImage')}
      >
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="cover-image-specific">Image</Label>
            <Input id="cover-image-specific" type="file" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="x-offset">X-Offset</Label>
            <Input id="x-offset" type="number" value="0" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="y-offset">Y-Offset</Label>
            <Input id="y-offset" type="number" value="0" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scale">Scale</Label>
            <Input id="scale" type="number" value="1.0" step="0.1" readOnly />
          </div>
        </div>
      </PropertySection>

      {/* Photo Credits */}
      <PropertySection
        title="Photo Credits"
        isExpanded={expandedSections.has('photoCredits')}
        onToggle={() => toggleSection('photoCredits')}
      >
        <div className="space-y-2">
          <Label htmlFor="photo-credits-specific">Text</Label>
          <Input id="photo-credits-specific" value="Photographer Name" readOnly />
        </div>
      </PropertySection>
    </div>
  );

  const renderElementProperties = () => {
    switch (selectedElement) {
      case 'headline':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="element-headline-text">Text</Label>
              <Input id="element-headline-text" value="THE GOAT" readOnly />
            </div>
          </div>
        );
      case 'description':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="element-description-text">Text</Label>
              <Textarea
                id="element-description-text"
                value="EMMA TWIGG&#10;WORLD CHAMPION - WOMEN'S SOLO&#10;WORLD ROWING BEACH SPRINT FINALS"
                readOnly
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="element-description-font-size">Font Size</Label>
              <Input id="element-description-font-size" type="number" value="20" readOnly />
            </div>
          </div>
        );
      case 'coverImage':
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="element-cover-image">Image</Label>
              <Input id="element-cover-image" type="file" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="element-x-offset">X-Offset</Label>
              <Input id="element-x-offset" type="number" value="0" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="element-y-offset">Y-Offset</Label>
              <Input id="element-y-offset" type="number" value="0" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="element-scale">Scale</Label>
              <Input id="element-scale" type="number" value="1.0" step="0.1" readOnly />
            </div>
          </div>
        );
      default:
        return <p className="text-gray-500 text-sm">Select an element to edit</p>;
    }
  };

  const getTitle = () => {
    if (mode === 'global') return 'Global Properties';
    if (mode === 'specific') return 'Size-specific Properties & Overrides';
    if (mode === 'element' && selectedElement) {
      const elementTitles = {
        headline: 'Headline',
        description: 'Description',
        coverImage: 'Cover Image',
        photoCredits: 'Photo Credits',
        logoBottomLeft: 'Bottom Left Logo',
        logoBottomRight: 'Bottom Right Logo',
      };
      return elementTitles[selectedElement];
    }
    return 'Properties';
  };

  return (
    <div
      className={`fixed top-20 right-6 w-80 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[400px] opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-gray-900">{getTitle()}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Properties Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {mode === 'global' && renderGlobalProperties()}
          {mode === 'specific' && renderSpecificProperties()}
          {mode === 'element' && renderElementProperties()}
        </div>
      </div>
    </div>
  );
}

type PropertySectionProps = {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function PropertySection({ title, isExpanded, onToggle, children }: PropertySectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-3 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}
