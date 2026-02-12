<script lang="ts">
  import { X, ChevronDown, ChevronRight, Check, Plus, Trash2, ArrowRight, Settings } from 'lucide-svelte';
  import Button from './ui/Button.svelte';
  import Input from './ui/Input.svelte';
  import Label from './ui/Label.svelte';
  import Textarea from './ui/Textarea.svelte';
  import type { SelectedElement, PropertyTab } from '@/lib/types';
  import { cn } from '@/lib/utils';
  
  let { 
    isOpen, 
    onClose, 
    selectedElement, 
    activeTab, 
    onTabChange 
  }: {
    isOpen: boolean;
    onClose: () => void;
    selectedElement: SelectedElement;
    activeTab: PropertyTab;
    onTabChange: (tab: PropertyTab) => void;
  } = $props();

  import { SIZES, RANGES, ALL_SECTIONS } from '@/lib/data';


  let expandedSections = $state(new Set(['headline', 'description', 'coverImage']));
  
  // Sizes State
  let selectedSize = $state('300x600');
  const sizes = SIZES.map(s => s.label);

  // Ranges State
  let selectedRange = $state('<480px');
  const ranges = RANGES.map(r => r.label);

  // Override Management - Reactive Maps synced with Database
  let rangeOverridesMap = $state(new Map(RANGES.map(r => [r.label, new Set(r.overrides)])));
  let sizeOverridesMap = $state(new Map(SIZES.map(s => [s.label, new Set(s.overrides)])));

  // Derived active sets based on current selection
  let activeRangeOverrides = $derived(rangeOverridesMap.get(selectedRange) || new Set<string>());
  let activeSizeOverrides = $derived(sizeOverridesMap.get(selectedSize) || new Set<string>());
  
  let isAddRangeOverrideOpen = $state(false);
  let isAddSizeOverrideOpen = $state(false);

  // Dropdown Management (Lifted State for Overflow Fix)
  let activeApplyState = $state<{ id: string, type: 'range' | 'size', top: number, left: number } | null>(null);
  let activeAddOverrideState = $state<{ type: 'range' | 'size', top: number, left: number } | null>(null);

  const openApplyDropdown = (e: MouseEvent, id: string, type: 'range' | 'size') => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    activeApplyState = { id, type, top: rect.bottom + 5, left: rect.left };
    activeAddOverrideState = null;
  };

  const openAddOverrideDropdown = (e: MouseEvent, type: 'range' | 'size') => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    activeAddOverrideState = { type, top: rect.bottom + 5, left: rect.left };
    activeApplyState = null;
  };

  const closeDropdowns = () => {
    activeApplyState = null;
    activeAddOverrideState = null;
  };

  const addRangeOverride = (sectionId: string) => {
    const current = rangeOverridesMap.get(selectedRange);
    if (current) {
        const next = new Set(current);
        next.add(sectionId);
        rangeOverridesMap.set(selectedRange, next);
    }
    isAddRangeOverrideOpen = false;
    // Auto-expand
    if (!expandedSections.has(sectionId)) toggleSection(sectionId);
  };

  const removeRangeOverride = (sectionId: string) => {
    const current = rangeOverridesMap.get(selectedRange);
    if (current) {
        const next = new Set(current);
        next.delete(sectionId);
        rangeOverridesMap.set(selectedRange, next);
    }
  };

  const addSizeOverride = (sectionId: string) => {
     const current = sizeOverridesMap.get(selectedSize);
     if (current) {
         const next = new Set(current);
         next.add(sectionId);
         sizeOverridesMap.set(selectedSize, next);
     }
     isAddSizeOverrideOpen = false;
     if (!expandedSections.has(sectionId)) toggleSection(sectionId);
  };

  const removeSizeOverride = (sectionId: string) => {
     const current = sizeOverridesMap.get(selectedSize);
     if (current) {
         const next = new Set(current);
         next.delete(sectionId);
         sizeOverridesMap.set(selectedSize, next);
     }
  };

  const expandAll = () => expandedSections = new Set(ALL_SECTIONS);
  const collapseAll = () => expandedSections = new Set();

  $effect(() => {
    if (selectedElement) {
      onTabChange('sizes');
      const elementMap: Record<string, string> = {
        headline: 'headline',
        description: 'description',
        coverImage: 'coverImage',
        photoCredits: 'photoCredits',
        logoBottomLeft: 'logoBottomLeft',
        logoBottomRight: 'logoBottomRight',
      };
      if (elementMap[selectedElement]) {
        const newExpanded = new Set(expandedSections);
        newExpanded.add(elementMap[selectedElement]);
        expandedSections = newExpanded;
      }
    }
  });

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    expandedSections = newExpanded;
  };

  let currentSizeObj = $derived(SIZES.find(s => s.label === selectedSize));

  // Aggregated Counts for Global Tab
  const getAggregatedCounts = (sectionId: string) => {
    let rCount = 0;
    rangeOverridesMap.forEach(set => { if (set.has(sectionId)) rCount++; });
    let sCount = 0;
    sizeOverridesMap.forEach(set => { if (set.has(sectionId)) sCount++; });
    return { rangeOverrideCount: rCount, sizeOverrideCount: sCount };
  };
</script>

{#snippet PropertySection({ 
    title, 
    sectionId, 
    children, 
    isNested = false, 
    rangeOverrideCount = 0, 
    sizeOverrideCount = 0, 
    extraClass = "",
    variant = null,
    onRemove = undefined,
    onApplyClick = undefined,
}: { 
    title: string, 
    sectionId: string, 
    children: any,
    isNested?: boolean,
    rangeOverrideCount?: number,
    sizeOverrideCount?: number,
    extraClass?: string,
    variant?: 'range' | 'size' | null,
    onRemove?: () => void,
    onApplyClick?: (e: MouseEvent) => void,
})}
  {@const isExpanded = expandedSections.has(sectionId)}
  {@const borderOverride = isExpanded ? "expanded" : "collapsed"}
  <div class={cn("form-field border border-gray-200 rounded-lg overflow-hidden", extraClass, borderOverride, isNested ? 'bg-gray-50/50' : '')}>
    <button
      onclick={() => toggleSection(sectionId)}
      class={cn("w-full flex items-center justify-between p-3 transition-colors cursor-pointer", isNested ? 'hover:bg-white' : 'hover:bg-gray-50 bg-gray-50/30')}
    >
      <div class="flex items-center gap-2">
         <span class={cn("text-sm", isNested ? 'text-gray-800' : 'text-gray-900')}>{title}</span>
         
         {#if rangeOverrideCount > 0}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
               onclick={(e) => {
                 e.stopPropagation();
                 onTabChange('ranges');
               }}
               class="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-purple-500 rounded-full hover:scale-110 transition-transform cursor-pointer"
            >
              {rangeOverrideCount}
            </div>
         {/if}

         {#if sizeOverrideCount > 0}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
               onclick={(e) => {
                 e.stopPropagation();
                 onTabChange('sizes');
               }}
               class="overrideCount flex items-center justify-center w-4 h-4 text-[8px] font-medium text-white bg-orange-500 rounded-full hover:scale-110 transition-transform cursor-pointer"
            >
              {sizeOverrideCount}
            </div>
         {/if}
      </div>
      
      <div class="flex items-center gap-2">
         <div class="flex items-center gap-2" onclick={(e) => e.stopPropagation()}>
           {#if onApplyClick}
               <div class="relative">
                  <button 
                    class={cn("p-1 rounded text-xs flex items-center gap-1 hover:bg-gray-100", extraClass.includes('purple') ? "text-purple-600" : "text-orange-600")}
                    title="Apply to..."
                    onclick={onApplyClick}
                  >
                    <ArrowRight class="w-3 h-3" />
                    <span class="text-[10px] font-medium">Apply</span>
                  </button>
               </div>
           {/if}
           
           {#if onRemove}
               <button 
                  class="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Remove override"
                  onclick={(e) => { e.stopPropagation(); onRemove(); }}
               >
                  <Trash2 class="w-3 h-3" />
               </button>
           {/if}
         </div>

         {#if isExpanded}
           <ChevronDown class="w-4 h-4 text-gray-500" />
         {:else}
           <ChevronRight class="w-4 h-4 text-gray-500" />
         {/if}
      </div>
    </button>
    {#if isExpanded}
       <div class={cn("p-3 border-t border-gray-200 bg-white space-y-3 animate-in slide-in-from-top-2 duration-200", isNested ? "p-2" : "")}>
          {@render children({ variant })}
       </div>
    {/if}
  </div>
{/snippet}

{#snippet renderGlobalProperties()}
    <div class="space-y-3 global-properties">
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-green-600 hover:text-green-700 text-xs">
          Expand all 
        </Button>
        <div class="w-px h-3 bg-gray-200"></div>
        <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-green-600 hover:text-green-700 text-xs">
          Collapse all 
        </Button>
      </div>

      {#each ALL_SECTIONS as sectionId}
         {@const titleMap: Record<string, string> = {
            headline: "Headline", description: "Description", coverImage: "Cover Image",
            photoCredits: "Photo Credits", logoBottomRight: "Bottom Right Logo",
            logoBottomLeft: "Bottom Left Logo", fontColour: "Font Colour"
         }}
         {@const contentMap: Record<string, any> = {
            headline: HeadlineContent, description: DescriptionContent, coverImage: CoverImageContent,
            photoCredits: PhotoCreditsContent, logoBottomRight: LogoRightContent,
            logoBottomLeft: LogoLeftContent, fontColour: FontColourContent
         }}
         {@const counts = getAggregatedCounts(sectionId)}
         
         {@render PropertySection({
            title: titleMap[sectionId],
            sectionId: sectionId,
            rangeOverrideCount: counts.rangeOverrideCount,
            sizeOverrideCount: counts.sizeOverrideCount,
            children: contentMap[sectionId]
         })}
      {/each}
    </div>
{/snippet}

{#snippet HeadlineContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="headline-text">Text</Label>
        <Input 
          id="headline-text" 
          value="THE GOAT" 
          readonly 
          class={cn(
            variant === 'range' && "text-purple-900 bg-purple-50",
            variant === 'size' && "text-orange-900 bg-orange-50"
          )}
        />
    </div>
{/snippet}

{#snippet DescriptionContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="description-text">Text</Label>
        <Textarea
          id="description-text"
          value={`EMMA TWIGG\nWORLD CHAMPION - WOMEN'S SOLO\nWORLD ROWING BEACH SPRINT FINALS`}
          readonly
          rows={3}
          class={cn(
            variant === 'range' && "text-purple-900 bg-purple-50",
            variant === 'size' && "text-orange-900 bg-orange-50"
          )}
        />
    </div>
{/snippet}

{#snippet CoverImageContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="cover-image">Image</Label>
        <Input 
            id="cover-image" 
            type="file" 
            disabled 
            class={cn(
                variant === 'range' && "bg-purple-50",
                variant === 'size' && "bg-orange-50"
            )}
        />
    </div>
{/snippet}

{#snippet PhotoCreditsContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="photo-credits">Text</Label>
        <Input 
            id="photo-credits" 
            value="Photographer Name" 
            readonly 
            class={cn(
                variant === 'range' && "text-purple-900 bg-purple-50",
                variant === 'size' && "text-orange-900 bg-orange-50"
            )}
        />
    </div>
{/snippet}

{#snippet LogoRightContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="logo-right">Image</Label>
        <Input 
            id="logo-right" 
            type="file" 
            disabled 
            class={cn(
                variant === 'range' && "bg-purple-50",
                variant === 'size' && "bg-orange-50"
            )}
        />
    </div>
{/snippet}

{#snippet LogoLeftContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="logo-left">Image</Label>
        <Input 
            id="logo-left" 
            type="file" 
            disabled 
            class={cn(
                variant === 'range' && "bg-purple-50",
                variant === 'size' && "bg-orange-50"
            )}
        />
    </div>
{/snippet}

{#snippet FontColourContent({ variant }: { variant?: 'range' | 'size' | null } = {})}
    <div class="space-y-2">
        <Label for="font-colour">Colour</Label>
        <div class="relative">
            <select
                id="font-colour"
                value="Orange"
                disabled
                class={cn(
                    "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm appearance-none",
                    variant === 'range' && "text-purple-900 bg-purple-50 border-purple-200",
                    variant === 'size' && "text-orange-900 bg-orange-50 border-orange-200"
                )}
            >
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
            </select>
        </div>
    </div>
{/snippet}


<div>
<!-- Sliding Panel -->
<div
  class={cn(
    "fixed top-20 right-[80px] w-96 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transition-all duration-300 ease-in-out",
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  )}
  style:margin-right={isOpen ? '0px' : '-400px'}
>
>
  <div class="properties-panel__container flex flex-col h-full max-h-[calc(100vh-120px)]">
    <!-- Header -->
    <div class="properties-panel__header flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
      <h2 class="text-gray-900">Properties</h2>
      <div class="flex items-center gap-1">
        <Button variant="ghost" size="icon" onclick={onClose} class="ml-1">
          <X class="w-5 h-5" />
        </Button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="properties-panel__tabs flex border-b border-gray-200 bg-gray-50/30">
      {#each ['global', 'ranges', 'sizes'] as tab}
        {@const activeColor = tab === 'global' ? 'border-green-500 text-green-700' : tab === 'ranges' ? 'border-purple-500 text-purple-700' : 'border-orange-500 text-orange-700'}
        <button
          onclick={() => onTabChange(tab as PropertyTab)}
          class={cn(
            "flex-1 px-4 py-2.5 text-sm transition-all capitalize",
            activeTab === tab
              ? `bg-white border-b-2 ${activeColor}`
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          {tab}
        </button>
      {/each}
    </div>

    <!-- Properties Content -->
{#snippet renderRangesProperties()}
    <div class="properties-panel__ranges space-y-3 ranges-properties">
      <!-- Range Selector -->
      <div class="px-1">
          <label for="range-selector" class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
            Select Range
          </label>
          <div class="relative">
             <select
                 id="range-selector"
                 bind:value={selectedRange}
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm appearance-none cursor-pointer hover:border-blue-400 transition-colors focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
             >
                 {#each ranges as range}
                     <option value={range}>{range}</option>
                 {/each}
             </select>
             <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
      </div>

      <div class="h-px bg-gray-100 my-2"></div>

      <div class="flex items-center justify-between">
         <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-purple-600 hover:text-purple-700 text-xs">
              Expand all
            </Button>
            <div class="w-px h-3 bg-gray-200"></div>
            <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-purple-600 hover:text-purple-700 text-xs">
              Collapse all
            </Button>
         </div>

         <!-- Add Override Dropdown Trigger -->
         <Button 
            variant="outline" 
            size="sm" 
            class="properties-panel__add-override h-7 text-xs gap-1 border-purple-200 text-purple-700 hover:bg-purple-50"
            onclick={(e: MouseEvent) => openAddOverrideDropdown(e, 'range')}
         >
            <Plus class="w-3 h-3" />
            Add override
         </Button>
      </div>

      {#if activeRangeOverrides.size === 0}
         <div class="text-center py-8 text-gray-400 text-sm italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
            No overrides active for this range.
         </div>
      {/if}
      
      <!-- Range Overrides List -->
      {#each Array.from(activeRangeOverrides) as sectionId}
         {@const titleMap: Record<string, string> = {
            headline: "Headline", description: "Description", coverImage: "Cover Image",
            photoCredits: "Photo Credits", logoBottomRight: "Bottom Right Logo",
            logoBottomLeft: "Bottom Left Logo", fontColour: "Font Colour"
         }}
         {@const contentMap: Record<string, any> = {
            headline: HeadlineContent, description: DescriptionContent, coverImage: CoverImageContent,
            photoCredits: PhotoCreditsContent, logoBottomRight: LogoRightContent,
            logoBottomLeft: LogoLeftContent, fontColour: FontColourContent
         }}
         
         {@render PropertySection({ 
            title: titleMap[sectionId], 
            sectionId: sectionId, 
            children: contentMap[sectionId], 
            extraClass: "border-purple-200 relative",
            variant: "range",
            onRemove: () => removeRangeOverride(sectionId),
            onApplyClick: (e: MouseEvent) => openApplyDropdown(e, sectionId, 'range')
         })}
      {/each}
    </div>
{/snippet}

{#snippet renderSizesProperties()}
    <div class="properties-panel__sizes space-y-3 sizes-properties">
      <!-- Size Selector -->
      <div class="px-1">
          <div class="flex items-center justify-between mb-1.5">
            <label for="size-selector" class="text-xs font-medium text-gray-500 uppercase tracking-wider block">
                Select Size
            </label>
            {#if currentSizeObj && currentSizeObj.rangeIds.length > 0}
                <div class="flex gap-1 items-center">
                    <span class="text-[9px] text-gray-400">Ranges:</span>
                    {#each currentSizeObj.rangeIds as rid}
                        {@const rangeObj = RANGES.find(r => r.id === rid)}
                        <span class="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{rangeObj?.label || rid}</span>
                    {/each}
                </div>
            {/if}
          </div>
          <div class="relative">
             <select
                 id="size-selector"
                 bind:value={selectedSize}
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-orange-50 text-sm appearance-none cursor-pointer hover:border-orange-400 transition-colors focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
             >
                 {#each sizes as size}
                     <option value={size}>{size}</option>
                 {/each}
             </select>
             <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
      </div>

      <div class="h-px bg-gray-100 my-2"></div>

      <div class="flex items-center justify-between">
         <div class="flex items-center gap-2">
            <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-orange-600 hover:text-orange-700 text-xs">
              Expand all
            </Button>
            <div class="w-px h-3 bg-gray-200"></div>
            <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-orange-600 hover:text-orange-700 text-xs">
              Collapse all
            </Button>
         </div>

         <!-- Add Override Dropdown Trigger -->
         <Button 
            variant="outline" 
            size="sm" 
            class="properties-panel__add-override h-7 text-xs gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
            onclick={(e: MouseEvent) => openAddOverrideDropdown(e, 'size')}
         >
            <Plus class="w-3 h-3" />
            Add override
         </Button>
      </div>

      <!-- <div class="h-px bg-gray-100 my-2"></div> -->

      {#if activeSizeOverrides.size === 0}
         <div class="text-center py-8 text-gray-400 text-sm italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
            No overrides active for this size.
         </div>
      {/if}

      <!-- Size Overrides List -->
      {#each Array.from(activeSizeOverrides) as sectionId}
         {@const titleMap: Record<string, string> = {
            headline: "Headline", description: "Description", coverImage: "Cover Image",
            photoCredits: "Photo Credits", logoBottomRight: "Bottom Right Logo",
            logoBottomLeft: "Bottom Left Logo", fontColour: "Font Colour"
         }}
         {@const contentMap: Record<string, any> = {
            headline: HeadlineContent, description: DescriptionContent, coverImage: CoverImageContent,
            photoCredits: PhotoCreditsContent, logoBottomRight: LogoRightContent,
            logoBottomLeft: LogoLeftContent, fontColour: FontColourContent
         }}
         
         {@render PropertySection({ 
            title: titleMap[sectionId], 
            sectionId: sectionId, 
            children: contentMap[sectionId], 
            extraClass: "border-orange-200 relative",
            variant: "size",
            onRemove: () => removeSizeOverride(sectionId),
            onApplyClick: (e: MouseEvent) => openApplyDropdown(e, sectionId, 'size')
         })}
      {/each}
    </div>
{/snippet}

    <div class="flex-1 overflow-y-auto p-4">
      {#if activeTab === 'global'}
        {@render renderGlobalProperties()}
      {:else if activeTab === 'ranges'}
        {@render renderRangesProperties()}
      {:else if activeTab === 'sizes'}
        {@render renderSizesProperties()}
      {/if}
    </div>
  </div>
</div>

<!-- Global Dropdowns Layer (Moved outside panel to avoid stacking context issues) -->
{#if activeAddOverrideState}
   {@const isPurple = activeAddOverrideState.type === 'range'}
   <div 
      class="fixed w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] py-1 max-h-60 overflow-y-auto"
      style="top: {activeAddOverrideState.top}px; left: {activeAddOverrideState.left - 100}px;"
   >
      {#each ALL_SECTIONS.filter(s => !(activeAddOverrideState!.type === 'range' ? activeRangeOverrides : activeSizeOverrides).has(s)) as section}
          <button
            class={cn(
                "w-full text-left px-3 py-2 text-sm transition-colors",
                isPurple ? "text-gray-700 hover:bg-purple-50 hover:text-purple-900" : "text-gray-700 hover:bg-orange-50 hover:text-orange-900"
            )}
            onclick={(e: MouseEvent) => {
                e.stopPropagation();
                activeAddOverrideState!.type === 'range' ? addRangeOverride(section) : addSizeOverride(section);
            }}
          >
            {section}
          </button>
      {/each}
      {#if ALL_SECTIONS.filter(s => !(activeAddOverrideState!.type === 'range' ? activeRangeOverrides : activeSizeOverrides).has(s)).length === 0}
          <div class="px-3 py-2 text-xs text-gray-400 italic">No more properties</div>
      {/if}
   </div>
   <!-- Backdrop -->
   <div class="fixed inset-0 z-[9998]" onclick={closeDropdowns}></div>
{/if}

{#if activeApplyState}
   {@const isPurple = activeApplyState.type === 'range'}
   <div 
      class="fixed w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] py-2"
      style="top: {activeApplyState.top}px; left: {activeApplyState.left - 180}px;"
   >
       <div class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
          Apply {activeApplyState.id} to...
       </div>
       
       <label class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500" />
          <span class="text-xs font-medium text-gray-700">All Sizes</span>
       </label>

       <label class="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
          <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500" />
          <span class="text-xs font-medium text-gray-700">All Ranges</span>
       </label>

       <div class="h-px bg-gray-100 my-1"></div>
       <div class="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase">Specific</div>

       <div class="max-h-40 overflow-y-auto">
          {#each sizes as size}
             <label class="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" class="rounded border-gray-300 text-orange-500 focus:ring-offset-0 focus:ring-1 focus:ring-orange-500" />
                <span class="text-xs text-gray-600">{size}</span>
             </label>
          {/each}
          {#each ranges as range}
             <label class="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                 <input type="checkbox" class="rounded border-gray-300 text-purple-500 focus:ring-offset-0 focus:ring-1 focus:ring-purple-500" />
                 <span class="text-xs text-gray-600">{range}</span>
             </label>
          {/each}
       </div>

       <div class="p-2 border-t border-gray-100 mt-1 flex justify-end">
          <Button size="sm" class="h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white w-full" onclick={closeDropdowns}>
             Apply Changes
          </Button>
       </div>
   </div>
   <!-- Backdrop -->
   <div class="fixed inset-0 z-[9998]" onclick={closeDropdowns}></div>
{/if}
</div>
