<script lang="ts">
  import { X, ChevronDown, ChevronRight } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import { cn } from '@/lib/utils';

  let { isOpen, onClose, onNavigate }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onNavigate?: (tab: 'ranges' | 'sizes') => void; 
  } = $props();

  type PropertyOrigin = 'global' | 'range' | 'size';

  type TreeProperty = {
    name: string;
    origin: PropertyOrigin;
    isOverridden: boolean;
    children?: TreeProperty[];
  };

  type TreeElement = {
    name: string;
    properties: TreeProperty[];
  };

  const elements: TreeElement[] = [
    {
      name: 'Headline',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
        { name: 'Font Color', origin: 'range', isOverridden: true },
        {
          name: 'Credits',
          origin: 'global',
          isOverridden: false,
          children: [
            { name: 'copyright', origin: 'global', isOverridden: false },
            { name: 'legal text', origin: 'global', isOverridden: false },
          ],
        },
      ],
    },
    {
      name: 'Description',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
        { name: 'Font Size', origin: 'size', isOverridden: true },
      ],
    },
    {
      name: 'Cover Image',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
        { name: 'X-Offset', origin: 'size', isOverridden: true },
        { name: 'Y-Offset', origin: 'size', isOverridden: true },
        { name: 'Scale', origin: 'range', isOverridden: true },
      ],
    },
    {
      name: 'Photo Credits',
      properties: [
        { name: 'Text', origin: 'global', isOverridden: false },
      ],
    },
    {
      name: 'Bottom Right Logo',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
      ],
    },
    {
      name: 'Bottom Left Logo',
      properties: [
        { name: 'Image', origin: 'global', isOverridden: false },
      ],
    },
  ];

  let expandedElements = $state(new Set(['Headline', 'Description', 'Cover Image']));

  const toggleElement = (element: string) => {
    const newExpanded = new Set(expandedElements);
    if (newExpanded.has(element)) {
      newExpanded.delete(element);
    } else {
      newExpanded.add(element);
    }
    expandedElements = newExpanded;
  };

  const expandAll = () => {
    expandedElements = new Set(elements.map((e) => e.name));
  };

  const collapseAll = () => {
    expandedElements = new Set();
  };

  const getOriginColor = (origin: PropertyOrigin) => {
    switch (origin) {
      case 'global':
        return '';
      case 'range':
        return 'overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full';
      case 'size':
        return 'overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-orange-500 rounded-full';
    }
  };

  const getOriginLabel = (origin: PropertyOrigin) => {
    switch (origin) {
      case 'global':
        return '';
      case 'range':
        return '1';
      case 'size':
        return '2';
    }
  };
</script>

{#snippet renderProperty(property: TreeProperty)}
    {#if property.children}
      {@const isExpanded = expandedElements.has(property.name)}
      <div class="space-y-1.5">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          onclick={(e) => {
            e.stopPropagation();
            toggleElement(property.name);
          }}
          class="relative tree-lvl2-hasChildren flex items-center justify-between pl-2 py-1.5 bg-white rounded cursor-pointer font-medium"
        >
          <div class="relative flex items-center gap-4">
             {#if property.isOverridden}
                <div class="relative"></div>
             {/if}
             <span class="relative text-xs text-gray-700">{property.name}</span>
          </div>
          {#if isExpanded}
             <ChevronDown class="relative w-4 h-4 text-gray-500" />
          {:else}
             <ChevronRight class="relative w-4 h-4 text-gray-500" />
          {/if}
        </div>
        {#if isExpanded}
          <div class="relative tree-lvl3-children pl-4 space-y-1.5">
            {#each property.children as child}
                {@render renderProperty(child)}
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <div class="relative tree-lvl2 flex items-center justify-between px-2 py-1.5 rounded">
        <div class="relative flex items-center gap-4">
          {#if property.isOverridden}
            <div class="relative"></div>
          {/if}
          <span class="relative text-xs text-gray-700">{property.name}</span>
        </div>
        <button
          class={cn("overrideCount text-xs px-2 py-0.5 rounded-full", getOriginColor(property.origin))}
          onclick={(e) => {
             e.stopPropagation();
             if (property.origin === 'range') onNavigate?.('ranges');
             if (property.origin === 'size') onNavigate?.('sizes');
          }}
        >
          {getOriginLabel(property.origin)}
        </button>
      </div>
    {/if}
{/snippet}

<div
  class={cn(
    "fixed top-20 left-6 w-80 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-in-out",
    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[400px] opacity-0 pointer-events-none'
  )}
>
  <div class="flex flex-col h-full max-h-[calc(100vh-120px)]">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
      <h2 class="text-gray-900">Tree View</h2>
      <Button variant="ghost" size="icon" onclick={onClose}>
        <X class="w-5 h-5" />
      </Button>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-white">
      <Button
        variant="ghost"
        size="sm"
        onclick={expandAll}
        class="h-6 px-2 text-blue-600 hover:text-blue-700 text-xs"
      >
        Expand All
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onclick={collapseAll}
        class="h-6 px-2 text-blue-600 hover:text-blue-700 text-xs"
      >
        Collapse All
      </Button>
    </div>

    <!-- Tree Content -->
    <div class="tree flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        {#each elements as element (element.name)}
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onclick={() => toggleElement(element.name)}
              class="w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors"
            >
              <span class="text-sm text-gray-900">{element.name}</span>
              {#if expandedElements.has(element.name)}
                <ChevronDown class="w-4 h-4 text-gray-500" />
              {:else}
                <ChevronRight class="w-4 h-4 text-gray-500" />
              {/if}
            </button>
            {#if expandedElements.has(element.name)}
              <div class="px-2 pb-2 space-y-1.5 bg-gray-50/30">
                {#each element.properties as prop}
                    {@render renderProperty(prop)}
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
