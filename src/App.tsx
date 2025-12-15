import { TopNavigation } from './components/TopNavigation';
import { TreeView } from './components/TreeView';
import { OverridesMap, RangesMap } from './components/VisualizerMaps';
import { HierarchyLegend } from './components/HierarchyLegend';
import { useState } from 'react';
import { FormatSelector } from './components/FormatSelector';
import { AdCanvas } from './components/AdCanvas';
import { Toolbar } from './components/Toolbar';
import { PropertiesPanelNew, PropertyTab } from './components/PropertiesPanelNew';
import { TooltipProvider } from './components/ui/tooltip';

export type AdFormat = {
  width: number;
  height: number;
  label: string;
};

export type PanelMode = 'global' | 'specific' | 'element';
export type SelectedElement = 'headline' | 'description' | 'coverImage' | 'photoCredits' | 'logoBottomLeft' | 'logoBottomRight' | null;

export default function App() {
  const [selectedFormat, setSelectedFormat] = useState<AdFormat>({ width: 300, height: 600, label: '300 × 600' });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>('global');
  const [selectedElement, setSelectedElement] = useState<SelectedElement>(null);
  const [topNavTab, setTopNavTab] = useState<'Creative' | 'Overrides' | 'Ranges'>('Creative');
  const [isTreeOpen, setIsTreeOpen] = useState(false);
  const [showRangeVisualizer, setShowRangeVisualizer] = useState(true);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState<PropertyTab>('global');

  const openPanelTab = (tab: PropertyTab) => {
      setActivePanelTab(tab);
      setIsPanelOpen(true);
  };

  const handleGlobalClick = () => {
    setPanelMode('global');
    setSelectedElement(null);
    setIsPanelOpen(true);
  };

  const handleSpecificClick = () => {
    setPanelMode('specific');
    setSelectedElement(null);
    setIsPanelOpen(true);
  };

  const handleTreeClick = () => {
    setIsTreeOpen(!isTreeOpen);
  };

  const handleInfoClick = () => {
    setIsLegendOpen(!isLegendOpen);
  };

  const handleElementClick = (element: SelectedElement) => {
    setPanelMode('specific');
    setSelectedElement(element);
    setIsPanelOpen(true);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main Content - Full Screen Canvas */}
        <div className="flex-1 relative overflow-hidden">
          {/* Canvas Area - Behind everything */}
          

          {/* Floating Top Navigation - Very Top */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <TopNavigation 
              activeTab={topNavTab} 
              onTabChange={setTopNavTab} 
              selectedFormat={selectedFormat}
              onFormatChange={setSelectedFormat}
            />
          </div>

          {/* Range Visualizer - Below Format Selector */}
          {topNavTab === 'Creative' && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <AdCanvas format={selectedFormat} onElementClick={handleElementClick} />
            </div>
          )}

          {/* Overrides Mode Info Banner */}
          {topNavTab === 'Overrides' && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10" style={{ width: 'calc(100vw - 200px)' }}>
              <OverridesMap onNavigate={openPanelTab} />
            </div>
          )}
          
          {/* Ranges Mode Info Banner */}
          {topNavTab === 'Ranges' && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10" style={{ width: 'calc(100vw - 200px)' }}>
              <RangesMap onNavigate={openPanelTab} />
            </div>
          )}

          {/* Floating Toolbar - Right Side */}
          <div className="absolute top-20 right-6 z-10" style={{ right: isPanelOpen ? '24px' : '24px', transition: 'right 0.3s ease-in-out' }}>
            <Toolbar 
              onGlobalClick={handleGlobalClick}
              onSpecificClick={handleSpecificClick}
              onTreeClick={handleTreeClick}
              onInfoClick={handleInfoClick}
              activeMode={isPanelOpen ? panelMode : null}
              isTreeOpen={isTreeOpen}
            />
          </div>

          {/* Tree View - Left Side */}
          <TreeView isOpen={isTreeOpen} onClose={() => setIsTreeOpen(false)} onNavigate={openPanelTab} />

          {/* Properties Panel - Right Side */}
          <PropertiesPanelNew
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            selectedElement={selectedElement}
            activeTab={activePanelTab}
            onTabChange={setActivePanelTab}
          />

          {/* Hierarchy Legend - Right Side */}
          <HierarchyLegend isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />
        </div>
      </div>
    </TooltipProvider>
  );
}
