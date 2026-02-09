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

  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
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

  // Prevent drag default on image
  const preventDrag = (e: Event) => e.preventDefault();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
  class="ad-canvas relative flex flex-col items-center gap-4"
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
>
  <div
    class={cn(
      "ad-canvas__creative creative relative shadow-2xl bg-black group select-none", 
      showOverflow ? "overflow-visible ring-2 ring-dashed ring-yellow-400/50" : "overflow-hidden"
    )}
    style="width: {format.width}px; height: {format.height}px;"
    onmousedown={handleMouseDown}
  >
    <!-- Origin Point Visualizer (Zero Point) -->
    <div class="absolute top-1/2 left-1/2 w-0 h-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div class="absolute -top-[1000px] left-0 h-[2000px] w-px bg-cyan-400/50"></div>
      <div class="absolute top-0 -left-[1000px] w-[2000px] h-px bg-cyan-400/50"></div>
      <div class="absolute -top-4 -left-4 text-cyan-400">
         <Crosshair size={32} strokeWidth={1} />
      </div>
    </div>

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

    <!-- Actual Image with Transforms -->
    <div 
      class="w-full h-full pointer-events-none origin-center"
      style:transform={`translate(${panX}px, ${panY}px) scale(${scale / 100})`}
    >
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
     <!-- Position Reset -->
     <button 
      class="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 tooltip-trigger" 
      onclick={resetPosition}
      title="Reset Position"
      disabled={panX === 0 && panY === 0}
     >
       <Move size={16} />
     </button>

     <div class="w-px h-4 bg-gray-200"></div>

     <!-- Scale Controls -->
     <div class="flex items-center gap-2">
       <button class="text-gray-400 hover:text-gray-900" onclick={() => scale = Math.max(10, scale - 10)}><Minus size={14}/></button>
       <input 
          type="range" 
          min="10" 
          max="200" 
          bind:value={scale} 
          class="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
       />
       <button class="text-gray-400 hover:text-gray-900" onclick={() => scale = Math.min(200, scale + 10)}><Plus size={14}/></button>
       <span class="text-xs w-8 text-center tabular-nums font-medium text-gray-500">{scale}%</span>
     </div>
     
     <button 
        class="p-1.5 rounded-full hover:bg-gray-100 text-gray-600" 
        onclick={resetScale}
        title="Reset Scale"
        disabled={scale === 100}
     >
       <RotateCcw size={14} />
     </button>

     <div class="w-px h-4 bg-gray-200"></div>

     <!-- Overflow Toggle -->
     <button 
        class={cn("p-1.5 rounded-full transition-colors", showOverflow ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600")}
        onclick={() => showOverflow = !showOverflow}
        title={showOverflow ? "Hide Overflow" : "Show Overflow"}
     >
        {#if showOverflow}
          <Eye size={16} />
        {:else}
          <EyeOff size={16} />
        {/if}
     </button>

  </div>
</div>
