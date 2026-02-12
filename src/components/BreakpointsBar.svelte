<script lang="ts">
  import { cn } from "@/lib/utils";
  import type { SizeInfo } from "@/lib/types";

  let { selectedFormat, onFormatChange }: {
    selectedFormat: SizeInfo;
    onFormatChange: (format: SizeInfo) => void;
  } = $props();

  import { SIZES } from "@/lib/data";

  // Mock Data
  const MAX_WIDTH = 1200; // Visual limit for the bar
  const formats = SIZES;

  const ranges = [
    { start: 0, end: 479, label: '< 480px', color: 'bg-purple-100 border-purple-300' },
    { start: 480, end: 768, label: '480px - 768px', color: 'bg-orange-100 border-orange-300' },
    { start: 769, end: 1200, label: '> 768px', color: 'bg-blue-100 border-blue-300' },
  ];

  let hoveredRange: number | null = $state(null);

  const getPercentage = (width: number) => Math.min(100, (width / MAX_WIDTH) * 100);

  const isFormatInRange = (formatWidth: number, rangeIdx: number) => {
    if (rangeIdx === null) return false;
    const r = ranges[rangeIdx];
    return formatWidth >= r.start && formatWidth <= r.end;
  };
</script>

<div class="breakpoints-bar w-full bg-white border-b border-gray-200 h-24 flex flex-col relative overflow-hidden select-none">
  <!-- Ranges Layer (Hidden per user request) -->
  <div class="breakpoints-bar__ranges h-10 flex w-full relative border-b border-gray-100 hidden">
     {#each ranges as range, i}
        <div 
          class={cn(
             "h-full border-r text-xs flex items-center justify-center font-medium text-gray-500 transition-colors cursor-col-resize group relative", 
             range.color,
             hoveredRange === i ? "brightness-95" : "brightness-100"
          )}
          style="width: {getPercentage(range.end - range.start)}%"
          onmouseenter={() => hoveredRange = i}
          onmouseleave={() => hoveredRange = null}
        >
           {range.label}
           
           <!-- Drag Handle Mock -->
           <div class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-black/10 z-10"></div>
        </div>
     {/each}
  </div>

  <!-- Ruler & Formats Layer (Hidden per user request) -->
  <div class="breakpoints-bar__ruler flex-1 relative bg-gray-50/50 hidden">
     <!-- Ticks -->
     {#each Array.from({ length: 13 }) as _, i}
        <div 
           class="absolute top-0 bottom-0 border-l border-gray-300"
           style="left: {getPercentage(i * 100)}%"
        >
           <span class="absolute top-1 left-1 text-[10px] text-gray-400">{i * 100}</span>
        </div>
     {/each}

     <!-- Format Markers -->
     {#each formats as format}
        {@const isActive = selectedFormat.width === format.width && selectedFormat.height === format.height}
        {@const isHighlighted = hoveredRange !== null && isFormatInRange(format.width, hoveredRange)}
        
        <button
           class={cn(
             "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 transition-all duration-200 group",
             isActive ? "z-30 scale-110" : "z-20 opacity-70 hover:opacity-100"
           )}
           style="left: {getPercentage(format.width)}%"
           onclick={() => onFormatChange(format)}
        >
           <!-- Marker Icon -->
           <div class={cn(
              "w-3 h-3 rotate-45 border transition-colors shadow-sm",
              isActive ? "bg-blue-500 border-blue-600" : "bg-white border-gray-400",
              isHighlighted ? "bg-purple-400 border-purple-500 scale-125" : ""
           )}></div>
           
           <!-- Label -->
           <div class={cn(
              "text-[9px] bg-white px-1 rounded shadow-sm border border-gray-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity",
              isActive ? "opacity-100 font-bold text-blue-600" : "text-gray-500"
           )}>
              {format.width}x{format.height}
           </div>
           
           <!-- Active Indicator Line -->
           {#if isActive}
             <div class="absolute -top-4 bottom-[-100px] w-px bg-blue-500/50 pointer-events-none h-[200px]"></div>
           {/if}
        </button>
     {/each}
  </div>
</div>
