<script lang="ts">
  import TopNavigation from './components/TopNavigation.svelte';
  import TreeView from './components/TreeView.svelte';
  import OverridesMap from './components/maps/OverridesMap.svelte';
  import RangesMap from './components/maps/RangesMap.svelte';
  import HierarchyLegend from './components/HierarchyLegend.svelte';
  import AdCanvas from './components/AdCanvas.svelte';
  import Toolbar from './components/Toolbar.svelte';
  import PropertiesPanelNew from './components/PropertiesPanelNew.svelte';
  import type { AdFormat, PanelMode, SelectedElement, PropertyTab } from '@/lib/types';
  
  // State
  let selectedFormat: AdFormat = $state({ width: 300, height: 600, label: '300 × 600' });
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
</script>

<div class="min-h-screen bg-gray-50 flex flex-col font-sans">
  <!-- Main Content - Full Screen Canvas -->
  <div class="flex-1 relative overflow-hidden">
    
    <!-- Floating Top Navigation - Very Top -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-[9999]">
      <TopNavigation 
        activeTab={topNavTab} 
        onTabChange={(tab) => topNavTab = tab} 
        selectedFormat={selectedFormat}
        onFormatChange={(format) => selectedFormat = format}
      />
    </div>

    <!-- Range Visualizer - Below Format Selector -->
    {#if topNavTab === 'Creative'}
      <div class="absolute inset-0 flex items-center justify-center p-8">
        <AdCanvas format={selectedFormat} onElementClick={handleElementClick} />
      </div>
    {/if}

    <!-- Overrides Mode Info Banner -->
    {#if topNavTab === 'Overrides'}
      <div class="absolute top-28 left-1/2 -translate-x-1/2 z-10 w-[calc(100vw-200px)]">
        <OverridesMap onNavigate={openPanelTab} />
      </div>
    {/if}
    
    <!-- Ranges Mode Info Banner -->
    {#if topNavTab === 'Ranges'}
      <div class="absolute top-28 left-1/2 -translate-x-1/2 z-10 w-[calc(100vw-200px)]">
        <RangesMap onNavigate={openPanelTab} />
      </div>
    {/if}

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
    />

    <!-- Hierarchy Legend - Right Side -->
    <HierarchyLegend isOpen={isLegendOpen} onClose={() => isLegendOpen = false} />
  </div>
</div>
