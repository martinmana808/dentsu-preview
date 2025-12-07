import { X, ChevronDown, ChevronRight, Plus, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { SelectedElement } from '../App';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type PropertiesPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedElement: SelectedElement;
};

type PropertyTab = 'global' | 'ranges' | 'sizes';

const ALL_SECTIONS = [
  'headline', 
  'description', 
  'coverImage', 
  'photoCredits', 
  'logoBottomRight', 
  'logoBottomLeft', 
  'fontColour'
];

export function PropertiesPanelNew({ isOpen, onClose, selectedElement }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<PropertyTab>('global');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['headline', 'description', 'coverImage'])
  );
  
  // Sizes State
  const [selectedSize, setSelectedSize] = useState('300x600');
  const sizes = ['300x600', '300x250', '728x90', '320x50', '160x600'];

  // Ranges State
  const [selectedRange, setSelectedRange] = useState('Tall');
  const ranges = ['< 480px', '480px > 768px', '1000px > 2000px', '200px <'];

  // Mock Override State for UI Demo
  const [showApplyToOthers, setShowApplyToOthers] = useState<string | null>(null);

  const expandAll = () => setExpandedSections(new Set(ALL_SECTIONS));
  const collapseAll = () => setExpandedSections(new Set());

  // When an element is clicked, switch to Sizes tab and expand that section
  useEffect(() => {
    if (selectedElement) {
      setActiveTab('sizes');
      const elementMap: Record<string, string> = {
        headline: 'headline',
        description: 'description',
        coverImage: 'coverImage',
        photoCredits: 'photoCredits',
        logoBottomLeft: 'logoBottomLeft',
        logoBottomRight: 'logoBottomRight',
      };
      if (elementMap[selectedElement]) {
        const newExpanded = new Set(expandedSections);
        newExpanded.add(elementMap[selectedElement]);
        setExpandedSections(newExpanded);
      }
    }
  }, [selectedElement]);

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
    
    <div className="space-y-3 global-properties">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={expandAll} className="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Expand all properties
        </Button>
        <div className="w-px h-3 bg-gray-200" />
        <Button variant="ghost" size="sm" onClick={collapseAll} className="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Collapse all properties
        </Button>
      </div>
      {/* Headline */}
      <PropertySection
        title="Headline"
        isExpanded={expandedSections.has('headline')}
        onToggle={() => toggleSection('headline')}
        rangeOverrideCount={2} // Purple bubble
        sizeOverrideCount={1} // Orange bubble

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
        sizeOverrideCount={3} // Orange bubble
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
        rangeOverrideCount={1} // Purple bubble
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
        rangeOverrideCount={1} // Purple bubble
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

  const renderRangeProperties = () => (
    <div className="space-y-4 range-properties">
      <Label htmlFor="specific-headline-text">Select Range</Label>
      {/* Range Selector */}
      <div className="flex items-center gap-2">
        <Select value={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="flex-1 h-9 bg-purple-50 border-purple-200 text-purple-900 shadow-sm font-medium focus:ring-2 focus:ring-purple-500/20">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {ranges.map(range => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-9 w-9 border-dashed bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200 hover:border-purple-300 hover:text-purple-800 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new range</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={expandAll} className="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
                          Expand all properties
            </Button>
            <div className="w-px h-3 bg-gray-200" />
            <Button variant="ghost" size="sm" onClick={collapseAll} className="h-6 text-[10px] blue-600 text-blue-600 hover:text-blue-700 text-xs">
              Collapse all properties
            </Button>
      </div>

      <div className="space-y-3">
        {/* Headline */}
        <PropertySection
          title="Headline"
          isExpanded={expandedSections.has('headline')}
          onToggle={() => toggleSection('headline')}
          sizeOverrideCount={1} // Orange bubble
          extraClass="overrideSelf"
        >
          <div className="space-y-2 ">
            <div className=" items-center justify-between">
              <Label htmlFor="range-headline-text">Text</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="applyToOthers h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setShowApplyToOthers(showApplyToOthers === 'range-headline' ? null : 'range-headline')}
              >
                Apply to others 
              </Button>
            </div>
            <Input 
              id="range-headline-text" 
              value="THE GOAT" 
              readOnly 
              className="overrideActive !border-purple-500 ring-1 !ring-purple-500" // Active Override
            />
            
            {showApplyToOthers === 'range-headline' && (
              <div className="mt-2 p-2 bg-purple-50 rounded border border-blue-100 space-y-2">
                <div className="text-xs font-medium text-blue-900">Apply override to:</div>
                {ranges.filter(r => r !== selectedRange).map(range => (
                  <div key={range} className="flex items-center gap-2">
                    <input type="checkbox" id={`apply-${range}`} className="rounded border-gray-300 text-blue-600" />
                    <label htmlFor={`apply-${range}`} className="text-xs text-gray-700">{range}</label>
                  </div>
                ))}
                <Button size="sm" className="w-full h-7 text-xs mt-1">Apply</Button>
              </div>
            )}
          </div>
        </PropertySection>

        {/* Description */}
        <PropertySection
          title="Description"
          isExpanded={expandedSections.has('description')}
          onToggle={() => toggleSection('description')}
          sizeOverrideCount={1} // Orange bubble
        >
          <div className="space-y-2">
            <Label htmlFor="range-description-text">Text</Label>
            <Textarea
              id="range-description-text"
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
          extraClass="overrideSelf"
        >
          <div className="space-y-2">
            <div className=" items-center gap-2">
              <Label htmlFor="range-scale">Scale</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                className="applyToOthers h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setShowApplyToOthers(showApplyToOthers === 'range-headline2' ? null : 'range-headline2')}
              >
                Apply to others
              </Button>
              
            </div>
            <Input 
              id="range-scale" 
              type="number" 
              value="1.2" 
              readOnly 
              className="overrideActive !border-purple-500 ring-1 !ring-purple-500" // Active Override
            />
            {showApplyToOthers === 'range-headline2' && (
              <div className="mt-2 p-2 bg-purple-50 rounded border border-blue-100 space-y-2">
                <div className="text-xs font-medium text-blue-900">Apply override to:</div>
                {ranges.filter(r => r !== selectedRange).map(range => (
                  <div key={range} className="flex items-center gap-2">
                    <input type="checkbox" id={`apply-${range}`} className="rounded border-gray-300 text-blue-600" />
                    <label htmlFor={`apply-${range}`} className="text-xs text-gray-700">{range}</label>
                  </div>
                ))}
                <Button size="sm" className="w-full h-7 text-xs mt-1">Apply</Button>
              </div>
            )}
          </div>
        </PropertySection>

        {/* Photo Credits */}
        <PropertySection
          title="Photo Credits"
          isExpanded={expandedSections.has('photoCredits')}
          onToggle={() => toggleSection('photoCredits')}
        >
          <div className="space-y-2">
            <Label htmlFor="range-photo-credits">Text</Label>
            <Input id="range-photo-credits" value="Photographer Name" readOnly />
          </div>
        </PropertySection>

        {/* Bottom Right Logo */}
        <PropertySection
          title="Bottom Right Logo"
          isExpanded={expandedSections.has('logoBottomRight')}
          onToggle={() => toggleSection('logoBottomRight')}
        >
          <div className="space-y-2">
            <Label htmlFor="range-logo-right">Image</Label>
            <Input id="range-logo-right" type="file" disabled />
          </div>
        </PropertySection>

        {/* Bottom Left Logo */}
        <PropertySection
          title="Bottom Left Logo"
          isExpanded={expandedSections.has('logoBottomLeft')}
          onToggle={() => toggleSection('logoBottomLeft')}
        >
          <div className="space-y-2">
            <Label htmlFor="range-logo-left">Image</Label>
            <Input id="range-logo-left" type="file" disabled />
          </div>
        </PropertySection>

        {/* Font Colour */}
        <PropertySection
          title="Font Colour"
          isExpanded={expandedSections.has('fontColour')}
          onToggle={() => toggleSection('fontColour')}
        >
          <div className="space-y-2">
            <Label htmlFor="range-font-colour">Colour</Label>
            <select
              id="range-font-colour"
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
    </div>
  );

  const renderSizesProperties = () => (
    <div className="space-y-4 sizes-properties">
      <Label htmlFor="specific-headline-text">Select Size</Label>
      {/* Size Selector */}
      <div className="flex items-center gap-2">
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="flex-1 h-9 bg-orange-50 border-orange-200 text-orange-900 shadow-sm font-medium focus:ring-2 focus:ring-orange-500/20">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map(size => (
              <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-9 w-9 border-dashed bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200 hover:border-orange-300 hover:text-orange-800 shrink-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new size</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={expandAll} className="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Expand all properties
        </Button>
        <div className="w-px h-3 bg-gray-200" />
        <Button variant="ghost" size="sm" onClick={collapseAll} className="h-6 text-[10px] blue-600 text-blue-600 hover:text-blue-700 text-xs">
          Collapse all properties
        </Button>
      </div>
      <div className="space-y-3">
        {/* Headline */}
        <PropertySection
          title="Headline"
          isExpanded={expandedSections.has('headline')}
          onToggle={() => toggleSection('headline')}
        >
          <div className="space-y-2">
            <Label htmlFor="specific-headline-text">Text</Label>
            <Input 
              id="specific-headline-text" 
              value="THE GOAT" 
              readOnly 
              className=" !border-orange-500 ring-1 !ring-orange-500" // Active Override
            />
          </div>
        </PropertySection>

        {/* Description */}
        <PropertySection
          title="Description"
          isExpanded={expandedSections.has('description')}
          onToggle={() => toggleSection('description')}
          extraClass="overrideSelf"
        >
          <div className="space-y-3">
            <div className="space-y-2">
               <div className=" items-center justify-between">
                <div className=" items-center gap-2">
                  <Label htmlFor="specific-font-size">Font Size</Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className=" applyToOthers h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setShowApplyToOthers(showApplyToOthers === 'size-font2' ? null : 'size-font2')}
                >
                  Apply to others
                </Button>
              </div>
              <Textarea
                id="specific-description-text"
                value="EMMA TWIGG&#10;WORLD CHAMPION - WOMEN'S SOLO&#10;WORLD ROWING BEACH SPRINT FINALS"
                readOnly
                rows={3}
                className="overrideActive !border-orange-500 ring-1 !ring-orange-500" // Active Override
                extraClass="overrideSelf"
              />
              {showApplyToOthers === 'size-font2' && (
                <div className="mt-2 p-2 bg-orange-50 rounded border border-blue-100 space-y-2">
                  <div className="text-xs font-medium text-blue-900">Apply override to:</div>
                  {sizes.filter(s => s !== selectedSize).map(size => (
                    <div key={size} className="flex items-center gap-2">
                      <input type="checkbox" id={`apply-${size}`} className="rounded border-gray-300 text-blue-600" />
                      <label htmlFor={`apply-${size}`} className="text-xs text-gray-700">{size}</label>
                    </div>
                  ))}
                  <Button size="sm" className="w-full h-7 text-xs mt-1">Apply</Button>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className=" items-center justify-between">
                <div className=" items-center gap-2">
                  <Label htmlFor="specific-font-size">Font Size</Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className=" applyToOthers h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => setShowApplyToOthers(showApplyToOthers === 'size-font' ? null : 'size-font')}
                >
                  Apply to others
                </Button>
              </div>
              <Input 
                id="specific-font-size" 
                type="number" 
                value="20" 
                readOnly 
                className="overrideActive !border-orange-500 ring-1 !ring-orange-500" // Active Override
              />
              
              {showApplyToOthers === 'size-font' && (
                <div className="mt-2 p-2 bg-orange-50 rounded border border-blue-100 space-y-2">
                  <div className="text-xs font-medium text-blue-900">Apply override to:</div>
                  {sizes.filter(s => s !== selectedSize).map(size => (
                    <div key={size} className="flex items-center gap-2">
                      <input type="checkbox" id={`apply-${size}`} className="rounded border-gray-300 text-blue-600" />
                      <label htmlFor={`apply-${size}`} className="text-xs text-gray-700">{size}</label>
                    </div>
                  ))}
                  <Button size="sm" className="w-full h-7 text-xs mt-1">Apply</Button>
                </div>
              )}
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
              <Label htmlFor="specific-cover-image">Image</Label>
              <Input id="specific-cover-image" type="file" disabled />
            </div>
            <div className="space-y-2">
              <div className=" items-center gap-2">
                <Label htmlFor="specific-x-offset">X-Offset</Label>
              </div>
              <Input id="specific-x-offset" type="number" value="10" readOnly />
            </div>
            <div className="space-y-2">
              <div className=" items-center gap-2">
                <Label htmlFor="specific-y-offset">Y-Offset</Label>
              </div>
              <Input id="specific-y-offset" type="number" value="5" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specific-scale">Scale</Label>
              <Input id="specific-scale" type="number" value="1.0" step="0.1" readOnly />
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
            <Label htmlFor="specific-photo-credits">Text</Label>
            <Input id="specific-photo-credits" value="Photographer Name" readOnly />
          </div>
        </PropertySection>

        {/* Bottom Right Logo */}
        <PropertySection
          title="Bottom Right Logo"
          isExpanded={expandedSections.has('logoBottomRight')}
          onToggle={() => toggleSection('logoBottomRight')}
        >
          <div className="space-y-2">
            <Label htmlFor="specific-logo-right">Image</Label>
            <Input id="specific-logo-right" type="file" disabled />
          </div>
        </PropertySection>

        {/* Bottom Left Logo */}
        <PropertySection
          title="Bottom Left Logo"
          isExpanded={expandedSections.has('logoBottomLeft')}
          onToggle={() => toggleSection('logoBottomLeft')}
        >
          <div className="space-y-2">
            <Label htmlFor="specific-logo-left">Image</Label>
            <Input id="specific-logo-left" type="file" disabled />
          </div>
        </PropertySection>

        {/* Font Colour */}
        <PropertySection
          title="Font Colour"
          isExpanded={expandedSections.has('fontColour')}
          onToggle={() => toggleSection('fontColour')}
        >
          <div className="space-y-2">
            <Label htmlFor="specific-font-colour">Colour</Label>
            <select
              id="specific-font-colour"
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
    </div>
  );

  return (
    <div
      className={`fixed top-20 right-6 w-96 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[450px] opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-gray-900">Properties</h2>
          <div className="flex items-center gap-1">
            
            <Button variant="ghost" size="icon" onClick={onClose} className="ml-1">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50/30">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 px-4 py-2.5 text-sm transition-all ${
              activeTab === 'global'
                ? 'bg-white text-gray-900 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab('ranges')}
            className={`flex-1 px-4 py-2.5 text-sm transition-all ${
              activeTab === 'ranges'
                ? 'bg-white text-gray-900 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Ranges
          </button>
          <button
            onClick={() => setActiveTab('sizes')}
            className={`flex-1 px-4 py-2.5 text-sm transition-all ${
              activeTab === 'sizes'
                ? 'bg-white text-gray-900 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Sizes
          </button>
        </div>

        {/* Properties Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'global' && renderGlobalProperties()}
          {activeTab === 'ranges' && renderRangeProperties()}
          {activeTab === 'sizes' && renderSizesProperties()}
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
  isNested?: boolean;
  rangeOverrideCount?: number;
  sizeOverrideCount?: number;
  extraClass?: string;
};

function PropertySection({ 
  title, 
  isExpanded, 
  onToggle, 
  children, 
  isNested = false, 
  rangeOverrideCount = 0,
  sizeOverrideCount = 0,
  extraClass = ""
}: PropertySectionProps) {
  const borderOverride = isExpanded ? "expanded" : "collapsed";

  return (
    <div className={`${extraClass} ${borderOverride} form-field border border-gray-200 rounded-lg overflow-hidden ${isNested ? 'bg-gray-50/50' : ''}`}>
      <button
        onClick={onToggle}
        className={` w-full flex items-center justify-between p-3 transition-colors ${
          isNested ? 'hover:bg-white' : 'hover:bg-gray-50 bg-gray-50/30'
        }`}
      >
        <div className="flex items-center gap-2">
          
          
          <span className={`text-sm ${isNested ? 'text-gray-800' : 'text-gray-900'}`}>{title}</span>
          {/* Indicators */}
          {rangeOverrideCount > 0 && (
            <span className="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full">
              {rangeOverrideCount}
            </span>
          )}
          {sizeOverrideCount > 0 && (
            <span className="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-orange-500 rounded-full">
              {sizeOverrideCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-3 pt-0 border-t border-gray-100 bg-white">
          {children}
        </div>
      )}
    </div>
  );
}


