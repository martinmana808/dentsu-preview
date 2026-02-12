<script lang="ts">
  import type { SizeInfo, RangeInfo, PropertyTab } from "@/lib/types";
  import { SIZES } from "@/lib/data";
  import { cn } from "@/lib/utils";
  
  let { 
    selectedFormat,
    selectedRange,
    activePanelTab,
    onFormatChange,
    onTabChange
  }: {
    selectedFormat: SizeInfo;
    selectedRange: RangeInfo;
    activePanelTab: PropertyTab;
    onFormatChange: (format: SizeInfo) => void;
    onTabChange: (tab: PropertyTab) => void;
  } = $props();

  // Helper to check if a size belongs to the selected range
  const isSizeInSelectedRange = (size: SizeInfo) => {
    return size.rangeIds.includes(selectedRange.id);
  };

  // Calculate wrap position and width
  let wrapStyles = $derived.by(() => {
    const indices = SIZES.map((_, i) => i);
    let targetIndices: number[] = [];

    if (activePanelTab === 'global') {
      targetIndices = indices;
    } else if (activePanelTab === 'ranges') {
      targetIndices = SIZES.map((s, i) => isSizeInSelectedRange(s) ? i : -1).filter(i => i !== -1);
    } else if (activePanelTab === 'sizes') {
      const idx = SIZES.findIndex(s => s.id === selectedFormat.id);
      if (idx !== -1) targetIndices = [idx];
    }

    if (targetIndices.length === 0) return { opacity: 0 };

    const minIdx = Math.min(...targetIndices);
    const maxIdx = Math.max(...targetIndices);
    
    // Each size button is w-16 (64px) with gap-2 (8px)
    const startPos = minIdx * 72; // index * (64 + 8)
    const endPos = (maxIdx + 1) * 72 - 8; 

    let color = 'bg-green-500/10 border-green-500';
    if (activePanelTab === 'ranges') color = 'bg-purple-500/10 border-purple-500';
    if (activePanelTab === 'sizes') color = 'bg-orange-500/10 border-orange-500';

    return {
      left: `${startPos}px`,
      width: `${endPos - startPos}px`,
      color,
      opacity: 1
    };
  });

</script>

<div class="top-navigation-container relative flex items-center justify-center">
    <div class="top-navigation relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2 flex items-center gap-2 z-50">
      
      <!-- Reactive Wrap Overlay -->
      <div 
        class={cn(
            "absolute top-1 bottom-1 border-2 rounded-lg transition-all duration-300 ease-in-out z-0 pointer-events-none",
            wrapStyles.color
        )}
        style:left={wrapStyles.left}
        style:width={wrapStyles.width}
        style:opacity={wrapStyles.opacity}
      ></div>

      <!-- Size Index Buttons -->
      {#each SIZES as size, i}
        <button
          onclick={() => {
              onFormatChange(size);
              onTabChange('sizes');
          }}
          class={cn(
            "relative z-10 w-16 h-10 rounded-lg flex flex-col items-center justify-center transition-all group",
            selectedFormat.id === size.id ? "bg-white shadow-sm ring-1 ring-gray-200 text-gray-900" : "hover:bg-gray-50 text-gray-400 group-hover:text-gray-600"
          )}
          title={size.label}
        >
          <span class="text-[9px] font-bold whitespace-nowrap px-1">
            {size.label}
          </span>
          <div class="text-[7px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {size.id}
          </div>
        </button>
      {/each}
    </div>
</div>

