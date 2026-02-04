<script lang="ts">
  import type { AdFormat, SelectedElement } from "@/lib/types";
  import creativeImage from "@/assets/cfde5f9ca67357be1c660321a574dbff60409e08.png";

  let { format, onElementClick }: { 
    format: AdFormat; 
    onElementClick: (element: SelectedElement) => void 
  } = $props();
</script>

<div
  class="creative relative shadow-2xl overflow-hidden bg-black"
  style="width: {format.width}px; height: {format.height}px;"
>
  <!-- Headline Area - Top -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute top-0 left-0 right-0 h-20 cursor-pointer hover:bg-blue-500/10 transition-colors z-10"
    onclick={() => onElementClick('headline')}
    title="Click to edit headline"
  ></div>

  <!-- Cover Image - Center -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute top-20 left-0 right-0 bottom-40 cursor-pointer hover:bg-green-500/10 transition-colors z-10"
    onclick={() => onElementClick('coverImage')}
    title="Click to edit cover image"
  ></div>

  <!-- Description Area - Bottom middle -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute bottom-12 left-0 right-0 h-28 cursor-pointer hover:bg-purple-500/10 transition-colors z-10"
    onclick={() => onElementClick('description')}
    title="Click to edit description"
  ></div>

  <!-- Bottom Left Logo -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute bottom-2 left-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-10"
    onclick={() => onElementClick('logoBottomLeft')}
    title="Click to edit bottom left logo"
  ></div>

  <!-- Bottom Right Logo -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="absolute bottom-2 right-2 w-20 h-8 cursor-pointer hover:bg-yellow-500/20 transition-colors z-10"
    onclick={() => onElementClick('logoBottomRight')}
    title="Click to edit bottom right logo"
  ></div>

  <!-- Actual Image -->
  <img
    src={creativeImage}
    alt="Ad Creative"
    class="w-full h-full object-contain pointer-events-none"
  />
</div>
