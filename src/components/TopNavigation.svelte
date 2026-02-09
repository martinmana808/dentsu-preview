<script lang="ts">
  import type { AdFormat } from "@/lib/types";
  import { cn } from "@/lib/utils";
  
  const AVAILABLE_FORMATS: AdFormat[] = [
    { width: 300, height: 250, label: '300 × 250' },
    { width: 320, height: 50, label: '320 × 50' },
    { width: 1024, height: 768, label: '1024 × 768' },
    { width: 300, height: 600, label: '300 × 600' },
    { width: 728, height: 90, label: '728 × 90' },
  ];

  let { 
    activeTab, 
    onTabChange, 
    selectedFormat, 
    onFormatChange 
  }: {
    activeTab: 'Creative' | 'Overrides' | 'Ranges';
    onTabChange: (tab: 'Creative' | 'Overrides' | 'Ranges') => void;
    selectedFormat: AdFormat;
    onFormatChange: (format: AdFormat) => void;
  } = $props();

  let isHovered = $state(false);
</script>

<div class="top-navigation bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 px-1 py-1 flex items-center gap-1 z-50">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="relative"
    onmouseenter={() => isHovered = true}
    onmouseleave={() => isHovered = false}
  >
    <button
      onclick={() => onTabChange('Creative')}
      class={cn(
        "top-navigation__tab text-xs px-5 py-1.5 rounded-full transition-all",
        activeTab === 'Creative'
          ? 'bg-gray-900 text-white'
          : 'bg-transparent text-gray-600 hover:bg-gray-100'
      )}
    >
      {activeTab === 'Creative' ? selectedFormat.label : 'Creative view'}
    </button>

    <!-- Dropdown Menu - Shows on hover -->
    <div 
      class={cn(
        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-32 transition-all duration-200 z-[9999]",
        isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <div class="bg-white rounded-lg shadow-xl border border-gray-100 py-1 flex flex-col gap-0.5">
        {#each AVAILABLE_FORMATS as format}
          <button
            onclick={(e) => {
              e.stopPropagation();
              onFormatChange(format);
              onTabChange('Creative');
              isHovered = false;
            }}
            class={cn(
              "text-xs px-3 py-2 text-left hover:bg-gray-50 transition-colors",
              selectedFormat.label === format.label ? 'font-medium text-gray-900 bg-gray-50' : 'text-gray-600'
            )}
          >
            {format.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <button
    onclick={() => onTabChange('Overrides')}
    class={cn(
      "text-xs px-5 py-1.5 rounded-full transition-all",
      activeTab === 'Overrides'
        ? 'bg-gray-900 text-white'
        : 'bg-transparent text-gray-600 hover:bg-gray-100'
    )}
  >
    Overrides map
  </button>
  <button
    onclick={() => onTabChange('Ranges')}
    class={cn(
      "text-xs px-5 py-1.5 rounded-full transition-all",
      activeTab === 'Ranges'
        ? 'bg-gray-900 text-white'
        : 'bg-transparent text-gray-600 hover:bg-gray-100'
    )}
  >
    Ranges map
  </button>
</div>
