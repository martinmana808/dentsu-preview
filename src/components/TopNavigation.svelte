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

  const ITEM_WIDTH = 124; // Width of each size slot

  // Indices that should be highlighted by the pill
  let activeIndices = $derived.by(() => {
    if (activePanelTab === 'global') return SIZES.map((_, i) => i);
    
    if (activePanelTab === 'ranges') {
      const selectedIndices = SIZES.map((s, i) => isSizeInSelectedRange(s) ? i : -1).filter(i => i !== -1);
      if (selectedIndices.length === 0) return [];
      // Fill in all indices between min and max for the text highlight to work correctly
      const minIdx = Math.min(...selectedIndices);
      const maxIdx = Math.max(...selectedIndices);
      const result = [];
      for (let i = minIdx; i <= maxIdx; i++) result.push(i);
      return result;
    }

    if (activePanelTab === 'sizes') {
      const idx = SIZES.findIndex(s => s.id === selectedFormat.id);
      return idx !== -1 ? [idx] : [];
    }
    return [];
  });

  let isAddMenuOpen = $state(false);

  // Calculate wrap position and width
  let wrapStyles = $derived.by(() => {
    if (activeIndices.length === 0) return { opacity: 0 };

    const minIdx = Math.min(...activeIndices);
    const maxIdx = Math.max(...activeIndices);
    
    // Each slot is ITEM_WIDTH + 1px for separator (except last)
    const getSlotStart = (idx: number) => 8 + idx * (ITEM_WIDTH + 1);
    const startPos = getSlotStart(minIdx);
    const endPos = getSlotStart(maxIdx) + ITEM_WIDTH;

    // Vibrant but light colors from images
    let color = 'bg-[#A3FF9D]'; // Global (Green)
    if (activePanelTab === 'ranges') color = 'bg-[#CF9AEE]'; // Range (Purple)
    if (activePanelTab === 'sizes') color = 'bg-[#FFC47D]'; // Size (Orange)

    return {
      left: `${startPos}px`,
      width: `${endPos - startPos}px`,
      color,
      opacity: 1
    };
  });

</script>

<div class="top-nav top-navigation-container relative flex items-center justify-center cursor-pointer">
    <div class="top-navigation relative bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center z-50 overflow-hidden">
      
      <!-- Reactive Wrap Overlay (Pill) -->
      <div 
        class={cn(
            "absolute top-2 bottom-2 rounded-full transition-all duration-300 ease-in-out z-0",
            wrapStyles.color
        )}
        style:left={wrapStyles.left}
        style:width={wrapStyles.width}
        style:opacity={wrapStyles.opacity}
      ></div>

      <!-- Size Index Buttons -->
      {#each SIZES as size, i}
        {#if i > 0}
          <!-- Vertical Separator -->
          <div class="h-6 w-px bg-gray-100 z-10 shrink-0"></div>
        {/if}
        
        <button
          onclick={() => {
              onFormatChange(size);
              onTabChange('sizes');
          }}
          class={cn(
            "top-nav__size relative z-20 h-10 rounded-full flex flex-col items-center justify-center transition-all group",
            activeIndices.includes(i) ? "text-gray-900" : "text-gray-400 hover:text-gray-600 font-medium"
          )}
          style:width="{ITEM_WIDTH}px"
        >
          <span class="text-[11px] font-bold whitespace-nowrap px-4 tracking-tight">
            {size.label.replace('x', ' × ')}
          </span>
        </button>
      {/each}

      <!-- Add New Button & Popover -->
      <div class="h-6 w-px bg-gray-100 z-10 shrink-0"></div>
      <div class="relative z-30">
        <button
          onclick={() => isAddMenuOpen = !isAddMenuOpen}
          onblur={() => setTimeout(() => isAddMenuOpen = false, 200)}
          class={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all text-gray-400 hover:text-gray-900 hover:bg-gray-100/50",
            isAddMenuOpen && "text-blue-600 bg-blue-50"
          )}
        >
          <span class="text-xl font-medium leading-none mb-0.5">+</span>
        </button>

        {#if isAddMenuOpen}
          <div class="absolute top-full right-0 mt-3 w-44 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-1.5 flex flex-col gap-0.5 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
             <button class="w-full px-3 py-2 rounded-lg text-left text-[11px] font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center gap-2 group">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:scale-125 transition-transform"></span>
                ADD NEW RANGE
             </button>
             <button class="w-full px-3 py-2 rounded-lg text-left text-[11px] font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                <span class="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform"></span>
                ADD NEW SIZE
             </button>
          </div>
        {/if}
      </div>
    </div>
</div>

<style>
  /* Ensure the separators don't overlap with the pill visually if needed, 
     though being behind z-20 text but above z-0 pill works well */
</style>
