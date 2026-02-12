<script lang="ts">
  import type { AdFormat, SelectedElement } from "@/lib/types";
  import creativeImage from "@/assets/cfde5f9ca67357be1c660321a574dbff60409e08.png";
  import { cn } from "@/lib/utils";

  let { format, onElementClick }: { 
    format: AdFormat; 
    onElementClick: (element: SelectedElement) => void 
  } = $props();

  import { Move, RotateCcw, Eye, EyeOff, Minus, Plus, Crosshair } from 'lucide-svelte';
  
  let scale = $state(100);
  let panX = $state(0);
  let panY = $state(0);
  let showOverflow = $state(false);
  let isDragging = $state(false);
  let startX = 0;
  let startY = 0;

  // Auto-fit logic
  let canvasContainer = $state<HTMLDivElement | null>(null);
  let containerWidth = $state(0);
  let containerHeight = $state(0);
  
  // Padding for the fit
  const MARGIN = 64; 

  // Combined scale: User Zoom * Auto-Fit Scale
  let fitScale = $derived.by(() => {
    if (!containerWidth || !containerHeight) return 1;
    const availableW = containerWidth - MARGIN;
    const availableH = containerHeight - MARGIN;
    const scaleW = availableW / format.width;
    const scaleH = availableH / format.height;
    return Math.min(scaleW, scaleH, 1);
  });

  // Display scale is what the user expects to see (Zoom%)
  // Effective scale is what is actually applied to the DOM
  let effectiveScale = $derived((scale / 100) * fitScale);

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    // We adjust start position relative to the current pan
    startX = e.clientX - panX * fitScale;
    startY = e.clientY - panY * fitScale;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    // Panning is calculated in "screen pixels" then converted back to "internal pixels"
    // so moving the mouse 1px moves the image 1px visually
    panX = (e.clientX - startX) / fitScale;
    panY = (e.clientY - startY) / fitScale;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const resetPosition = () => {
    panX = 0;
    panY = 0;
  };
  
  const resetScale = () => {
    scale = 100;
  }

  // Track container size
  $effect(() => {
    if (canvasContainer) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          containerWidth = entry.contentRect.width;
          containerHeight = entry.contentRect.height;
        }
      });
      observer.observe(canvasContainer);
      return () => observer.disconnect();
    }
  });

  // Prevent drag default on image
  const preventDrag = (e: Event) => e.preventDefault();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  bind:this={canvasContainer}
  class="ad-canvas w-full h-full relative flex flex-col items-center justify-center gap-4"
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
>
  <div
    class={cn(
      "ad-canvas__creative creative relative shadow-2xl bg-black group select-none origin-center transition-transform duration-300 ease-out", 
      showOverflow ? "overflow-visible ring-2 ring-dashed ring-yellow-400/50" : "overflow-hidden"
    )}
    style="width: {format.width}px; height: {format.height}px; transform: scale({fitScale});"
    onmousedown={handleMouseDown}
  >
    <!-- Headline Area - Top -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="ad-canvas__element ad-canvas__element--headline absolute top-0 left-0 right-0 h-20 cursor-pointer hover:bg-blue-500/10 transition-colors z-20 border border-transparent hover:border-blue-400/30"
      onclick={(e) => { e.stopPropagation(); onElementClick('headline'); }}
      title="Click to edit headline"
    ></div>

    <!-- Cover Image - Center (The interactive zone) -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="absolute top-20 left-0 right-0 bottom-40 cursor-pointer hover:bg-green-500/10 transition-colors z-20 border border-transparent hover:border-green-400/30"
      onclick={(e) => { e.stopPropagation(); onElementClick('coverImage'); }}
      title="Click to edit cover image"
    ></div>

    <!-- Description Area - Bottom middle -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="absolute bottom-12 left-0 right-0 h-28 cursor-pointer hover:bg-purple-500/10 transition-colors z-20 border border-transparent hover:border-purple-400/30"
      onclick={(e) => { e.stopPropagation(); onElementClick('description'); }}
      title="Click to edit description"
    ></div>

    <!-- Bottom Left Logo -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="absolute bottom-2 left-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-20 border border-transparent hover:border-yellow-400/30"
      onclick={(e) => { e.stopPropagation(); onElementClick('logoBottomLeft'); }}
      title="Click to edit bottom left logo"
    ></div>

    <!-- Bottom Right Logo -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="absolute bottom-2 right-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-20 border border-transparent hover:border-yellow-400/30"
      onclick={(e) => { e.stopPropagation(); onElementClick('logoBottomRight'); }}
      title="Click to edit bottom right logo"
    ></div>

    <!-- Overflow Dimming Overlay (Spotlight Effect) -->
    {#if showOverflow}
      <div 
        class="absolute inset-0 z-10 pointer-events-none rounded-[inherit]"
        style="box-shadow: 0 0 0 5000px rgba(243, 244, 246, 0.8);"
      ></div>
    {/if}

    <!-- Actual Image with Transforms -->
    <div 
      class="creative-image w-full h-full pointer-events-none origin-center"
      style:transform={`translate(${panX}px, ${panY}px) scale(${scale / 100})`}
    >
      <!-- Origin Point Visualizer (Zero Point) -->
      <!-- We apply inverse scale to keep it constant size -->
      <div 
        class="crosshair absolute top-1/2 left-1/2 w-0 h-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style:transform={`scale(${1 / (effectiveScale || 1)})`}
      >
        <div class="absolute -top-[5000px] left-0 h-[10000px] w-px bg-cyan-400"></div>
        <div class="absolute top-0 -left-[5000px] w-[10000px] h-px bg-cyan-400"></div>
        <div class="absolute -top-4 -left-4 text-cyan-400 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
           <Crosshair size={32} strokeWidth={1} />
        </div>
      </div>

      <img
        src={creativeImage}
        alt="Ad Creative"
        class="w-full h-full object-contain select-none"
        ondragstart={preventDrag}
      />
    </div>
  </div>

  <!-- Manipulation Controls (Fixed underneath) -->
  <div class="ad-canvas__controls flex items-center gap-4 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200 z-40 transition-all hover:shadow-xl">
     <!-- Position Indicators (Merged from HUD) -->
     <div class="flex items-center gap-3 px-1 border-r border-gray-100 mr-1">
        <div class="flex flex-col">
          <span class="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Position</span>
          <span class="text-[10px] font-mono font-bold text-gray-600 tabular-nums leading-none">
            {Math.round(panX)}<span class="text-gray-300">X</span> {Math.round(panY)}<span class="text-gray-300">Y</span>
          </span>
        </div>
     </div>

     <!-- Scale Controls -->
     <div class="flex items-center gap-2 group/scale relative">
       <button class="text-gray-400 hover:text-gray-900" onclick={() => scale = Math.max(10, scale - 10)}><Minus size={14}/></button>
       <input 
       type="range" 
       min="10" 
       max="200" 
       bind:value={scale} 
       class="peer w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
       />
       <button class="text-gray-400 hover:text-gray-900" onclick={() => scale = Math.min(200, scale + 10)}><Plus size={14}/></button>
       <div class="flex flex-col items-center">
         <span class="text-[10px] w-12 text-center tabular-nums font-bold text-gray-600 leading-none">{scale}%</span>
         {#if fitScale < 1}
           <span class="text-[8px] font-bold text-blue-500/70 tracking-tighter uppercase mt-0.5">Auto-Fit: {Math.round(fitScale * 100)}%</span>
         {/if}
       </div>

       <!-- Tooltip for Scale -->
       <span class="pointer-events-none opacity-0 group-hover/scale:opacity-100 transition-opacity absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
          Zoom Level
          <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900"></span>
       </span>
      </div>
      
      <div class="w-px h-4 bg-gray-200"></div>

      <!-- Reset Position -->
      <div class="relative flex items-center group/reset-pos">
        <button 
        class="peer p-1.5 rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-30" 
        onclick={resetPosition}
        disabled={panX === 0 && panY === 0}
        >
          <Move size={16} />
        </button>
        <span class="pointer-events-none opacity-0 group-hover/reset-pos:opacity-100 transition-opacity absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
           Reset Position
           <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900"></span>
        </span>
      </div>

      <!-- Reset Scale -->
      <div class="relative flex items-center group/reset-scale">
        <button 
        class="peer p-1.5 rounded-full hover:bg-gray-100 text-gray-600 disabled:opacity-30" 
        onclick={resetScale}
        disabled={scale === 100}
        >
          <RotateCcw size={14} />
        </button>
        <span class="pointer-events-none opacity-0 group-hover/reset-scale:opacity-100 transition-opacity absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
           Reset Scale
           <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900"></span>
        </span>
      </div>

     <div class="w-px h-4 bg-gray-200"></div>

     <!-- Overflow Toggle -->
     <div class="relative flex items-center group/overflow">
       <button 
          class={cn("peer p-1.5 rounded-full transition-colors", showOverflow ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600")}
          onclick={() => showOverflow = !showOverflow}
       >
          {#if showOverflow}
            <Eye size={16} />
          {:else}
            <EyeOff size={16} />
          {/if}
       </button>
       <span class="pointer-events-none opacity-0 group-hover/overflow:opacity-100 transition-opacity absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
          {showOverflow ? "Hide Overflow" : "Show Overflow"}
          <span class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900"></span>
       </span>
     </div>
  </div>
</div>
