<script lang="ts">
  import { SIZES, getAspectRatio } from './constants';
  import { cn } from '@/lib/utils';

  let { 
    children, 
    rowHeaderLabel = "Properties" 
  }: { 
    children: any; 
    rowHeaderLabel?: string; 
  } = $props();

  let containerRef: HTMLDivElement | undefined = $state();
  let tableRef: HTMLTableElement | undefined = $state();
  let scale = $state(1);
  let containerHeight = $state('auto');
  let showAspectRatio = $state(false);

  const calculateScale = () => {
    if (containerRef && tableRef) {
      const containerWidth = containerRef.offsetWidth;
      const tableWidth = tableRef.scrollWidth;
      const tableHeight = tableRef.scrollHeight;
      
      const newScale = containerWidth / tableWidth;
      scale = newScale;
      containerHeight = `${tableHeight * newScale}px`;
    }
  };

  $effect(() => {
    if (!containerRef) return;
    
    // Initial calc
    setTimeout(calculateScale, 0);

    const observer = new ResizeObserver(calculateScale);
    observer.observe(containerRef);

    window.addEventListener('resize', calculateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculateScale);
    };
  });
  
  // Also create an effect dependent on children/showAspectRatio to recalc?
  // Svelte effect tracks deps automatically, but calculating scale depends on DOM layout which might change when showAspectRatio changes.
  $effect(() => {
     // trigger recalc when showAspectRatio changes
     // reference variable to track dependency
     showAspectRatio; 
     setTimeout(calculateScale, 0);
  });

</script>

<div bind:this={containerRef} class="w-full relative origin-top-left" style="height: {containerHeight}">
  <div class="togglePixelRatio absolute top-[-3rem] z-50">
     <button 
        onclick={() => showAspectRatio = !showAspectRatio}
        class="bg-gray-100 border border-gray-300 hover:bg-accent hover:bg-blue-500/10 hover:bg-green-500/10 px-5 py-1.5 rounded-full text-xs transition-all"
     >
        {showAspectRatio ? "Show Pixel Sizes" : "Display Aspect Ratios"}
     </button>
  </div>

  <div 
    style="transform: scale({scale}); transform-origin: top left; width: max-content;"
  >
     <table bind:this={tableRef} class="w-max border-collapse text-sm">
        <thead>
            <tr class="bg-gray-50 border-b border-gray-200">
                <th class="sticky left-0 z-20 bg-gray-50 p-2 font-medium text-gray-700 text-left w-48 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                     {rowHeaderLabel}
                </th>
                {#each SIZES as size}
                    <th class="relative tableCell p-2 font-medium text-gray-600 border-gray-300 min-w-[100px] text-center whitespace-nowrap">
                        <div class="grid place-items-center">
                            <span class={cn("col-start-1 row-start-1 transition-opacity duration-300", showAspectRatio ? 'opacity-0' : 'opacity-100')}>
                                {size}
                            </span>
                            <span class={cn("sizesRatios col-start-1 row-start-1 transition-opacity duration-300", showAspectRatio ? 'opacity-100' : 'opacity-0')}>
                                {getAspectRatio(size)}
                            </span>
                        </div>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {@render children?.()}
        </tbody>
     </table>
  </div>
</div>
