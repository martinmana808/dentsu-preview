<script lang="ts">
  import { X } from 'lucide-svelte';
  import Button from './ui/Button.svelte';

  let { isOpen, onClose }: { isOpen: boolean; onClose: () => void } = $props();
</script>

<div
  class={cn(
    "fixed bottom-6 left-6 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-40 transform transition-all duration-300 ease-in-out",
    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[400px] opacity-0 pointer-events-none'
  )}
>
  <div class="flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
      <h3 class="text-sm text-gray-900">Value Hierarchy</h3>
      <Button variant="ghost" size="icon" class="w-7 h-7" onclick={onClose}>
        <X class="w-4 h-4" />
      </Button>
    </div>

    <!-- Content -->
    <div class="p-4 space-y-4">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-gray-100 border border-gray-300"></div>
          <span class="text-xs text-gray-700">Global</span>
        </div>
        <p class="text-xs text-gray-500 ml-5">
          Default values applied to all sizes
        </p>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-purple-100 border border-purple-300"></div>
          <span class="text-xs text-purple-500">Range</span>
        </div>
        <p class="text-xs text-gray-500 ml-5">
          Values for groups (e.g., +480px, landscape, etc.)
        </p>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded bg-orange-100 border border-orange-300"></div>
          <span class="text-xs text-gray-700">Sizes</span>
        </div>
        <p class="text-xs text-gray-500 ml-5">
          Per-size overrides (highest priority)
        </p>
      </div>

      <div class="pt-2 border-t border-gray-200 space-y-2">
        <div class="flex items-center gap-2">
          <span class="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full">2</span>
          <span class="text-xs text-gray-700">Overridden indicator (n)</span>
        </div>
        <p class="text-xs text-gray-500 ml-4">
          Shows an override done in a higher hierarchy level 
        </p>
      </div>
      <div class="infoPurple p-2 border-t border-gray-200 space-y-2">
        <p class="text-xs text-gray-500 ml-2">
          This is an override done by the actual range or size 
        </p>
      </div>
    </div>
  </div>
</div>

<script lang="ts" module>
    import { cn } from '@/lib/utils';
</script>
