<script lang="ts">
  import BreakpointsBar from './components/BreakpointsBar.svelte';
  import TopNavigation from './components/TopNavigation.svelte';
  import TreeView from './components/TreeView.svelte';
  import OverridesMap from './components/maps/OverridesMap.svelte';
  import RangesMap from './components/maps/RangesMap.svelte';
  import HierarchyLegend from './components/HierarchyLegend.svelte';
  import AdCanvas from './components/AdCanvas.svelte';
  import Toolbar from './components/Toolbar.svelte';
  import PropertiesPanelNew from './components/PropertiesPanelNew.svelte';
  import type { PanelMode, SelectedElement, PropertyTab, SizeInfo, RangeInfo } from '@/lib/types';
  import { SIZES, RANGES } from '@/lib/data';
  
  // State
  let selectedFormat: SizeInfo = $state(SIZES[0]);
  let selectedRange: RangeInfo = $state(RANGES[0]);
  let isPanelOpen = $state(false);
  let panelMode: PanelMode = $state('global');
  let selectedElement: SelectedElement = $state(null);
  let topNavTab: 'Creative' | 'Overrides' | 'Ranges' = $state('Creative');
  let isTreeOpen = $state(false);
  let isLegendOpen = $state(false);
  let activePanelTab: PropertyTab = $state('global');

  // Handlers
  const openPanelTab = (tab: PropertyTab) => {
      activePanelTab = tab;
      isPanelOpen = true;
  };

  const handleGlobalClick = () => {
    panelMode = 'global';
    selectedElement = null;
    isPanelOpen = true;
  };

  const handleSpecificClick = () => {
    panelMode = 'specific';
    selectedElement = null;
    isPanelOpen = true;
  };

  const handleTreeClick = () => {
    isTreeOpen = !isTreeOpen;
  };

  const handleInfoClick = () => {
    isLegendOpen = !isLegendOpen;
  };

  const handleElementClick = (element: SelectedElement) => {
    panelMode = 'specific';
    selectedElement = element;
    isPanelOpen = true;
  };

  const handleFormatChange = (format:  SizeInfo) => {
    selectedFormat = format;
  }

  const handleRangeChange = (range: RangeInfo) => {
    selectedRange = range;
  }
</script>

<div class="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
  <!-- Breakpoints / Ranges Bar -->
  <div class="z-50 relative shadow-sm">
     <BreakpointsBar 
        selectedFormat={selectedFormat} 
        onFormatChange={handleFormatChange}
     />
  </div>

  <!-- Main Content - Full Screen Canvas -->
  <div class="flex-1 relative overflow-hidden">
    
    <!-- Floating Top Navigation - Very Top -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-40">
      <TopNavigation 
        activePanelTab={activePanelTab} 
        selectedFormat={selectedFormat}
        selectedRange={selectedRange}
        onFormatChange={handleFormatChange}
        onTabChange={(tab) => activePanelTab = tab}
      />
    </div>

    <!-- Range Visualizer - Below Format Selector -->
    {#if topNavTab === 'Creative'}
      <div class="absolute inset-0 flex items-center justify-center p-8 bg-gray-100/50">
        <AdCanvas format={selectedFormat} onElementClick={handleElementClick} />
      </div>
    {/if}

    <!-- Maps hidden per user request -->
    <!-- {#if topNavTab === 'Overrides'} ... {/if} -->
    <!-- {#if topNavTab === 'Ranges'} ... {/if} -->

    <!-- Floating Toolbar - Right Side -->
    <div 
        class="absolute top-20 right-6 z-10 transition-[right] duration-300 ease-in-out"
        style:right={isPanelOpen ? '24px' : '24px'}
    >
      <Toolbar 
        onGlobalClick={handleGlobalClick}
        onSpecificClick={handleSpecificClick}
        onTreeClick={handleTreeClick}
        onInfoClick={handleInfoClick}
        activeMode={isPanelOpen ? panelMode : null}
        isTreeOpen={isTreeOpen}
      />
    </div>

    <!-- Tree View - Left Side -->
    <TreeView isOpen={isTreeOpen} onClose={() => isTreeOpen = false} onNavigate={openPanelTab} />

    <!-- Properties Panel - Right Side -->
    <PropertiesPanelNew
      isOpen={isPanelOpen}
      onClose={() => isPanelOpen = false}
      selectedElement={selectedElement}
      activeTab={activePanelTab}
      onTabChange={(tab) => activePanelTab = tab}
      bind:selectedSizeLabel={selectedFormat.label}
      bind:selectedRangeLabel={selectedRange.label}
      onFormatChange={handleFormatChange}
      onRangeChange={handleRangeChange}
    />

    <!-- Hierarchy Legend - Right Side -->
    <HierarchyLegend isOpen={isLegendOpen} onClose={() => isLegendOpen = false} />
  </div>
</div>
