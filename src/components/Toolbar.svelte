<script lang="ts">
  import { Globe, Sliders, Network, ZoomIn, Hand, Save, X, Download, Info, Maximize, ScanLine } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import Separator from './ui/Separator.svelte';
  import type { PanelMode } from '@/lib/types';
  import { cn } from '@/lib/utils';

  let { 
    onGlobalClick, 
    onSpecificClick, 
    onTreeClick, 
    onInfoClick, 
    activeMode, 
    isTreeOpen 
  }: {
    onGlobalClick: () => void;
    onSpecificClick: () => void;
    onTreeClick: () => void;
    onInfoClick: () => void;
    activeMode: PanelMode | null;
    isTreeOpen: boolean;
  } = $props();

  let tools = $derived([
    { icon: Sliders, label: 'Edit properties', onClick: onSpecificClick, mode: 'specific' as const },
    { icon: Network, label: 'Properties tree view', onClick: onTreeClick, isActive: isTreeOpen },
    { icon: Maximize, label: 'Sizes' },
    { icon: ScanLine, label: 'Ranges' },
    { icon: ZoomIn, label: 'Zoom' },
    { icon: Hand, label: 'Hand Tool' },
  ]);

  const actions = [
    { icon: Save, label: 'Save' },
    { icon: X, label: 'Cancel' },
  ];

  let export_tools = $derived([
    { icon: Download, label: 'Download JPEG' },
    { icon: Info, label: 'Information', onClick: onInfoClick },
  ]);
</script>

<div class="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 flex flex-col items-center py-2 px-1 gap-1">
  {#each tools as tool}
    <div class="relative flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        class={cn(
          "peer w-9 h-9",
          tool.mode && activeMode === tool.mode 
            ? 'bg-blue-100 text-blue-600' 
            : ('isActive' in tool && tool.isActive)
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100'
        )}
        onclick={tool.onClick}
      >
        <tool.icon class="w-4 h-4 text-gray-700" />
      </Button>
      <span class="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {tool.label}
        <span class="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
      </span>
    </div>
  {/each}

  <Separator class="my-1 w-6" />

  {#each actions as action}
    <div class="relative flex items-center">
      <Button variant="ghost" size="icon" class="peer w-9 h-9 hover:bg-gray-100">
        <action.icon class="w-4 h-4 text-gray-700" />
      </Button>
      <span class="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {action.label}
        <span class="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
      </span>
    </div>
  {/each}

  <Separator class="my-1 w-6" />

  {#each export_tools as tool}
    <div class="relative flex items-center">
      <Button variant="ghost" size="icon" class="peer w-9 h-9 hover:bg-gray-100" onclick={tool.onClick}>
        <tool.icon class="w-4 h-4 text-gray-700" />
      </Button>
      <span class="customTooltip pointer-events-none opacity-0 peer-hover:opacity-100 transition-opacity absolute right-full mr-2 top-1/2 -translate-y-1/2 z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {tool.label}
        <span class="absolute left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900"></span>
      </span>
    </div>
  {/each}
</div>
