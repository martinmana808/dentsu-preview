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

  const ALL_SECTIONS = [
    'headline', 
    'description', 
    'coverImage', 
    'photoCredits', 
    'logoBottomRight', 
    'logoBottomLeft', 
    'fontColour'
  ];

  let expandedSections = $state(new Set(['headline', 'description', 'coverImage']));
  
  // Sizes State
  let selectedSize = $state('300x600');
  const sizes = ['300x600', '300x250', '728x90', '320x50', '160x600'];

  // Ranges State
  let selectedRange = $state('<480px');
  const ranges = ['<480px', '480px>768px', '1000px>2000px', '200px<'];

  // Override Management
  let activeRangeOverrides = $state(new Set(['headline']));
  let activeSizeOverrides = $state(new Set(['description', 'coverImage']));
  
  let isAddRangeOverrideOpen = $state(false);
  let isAddSizeOverrideOpen = $state(false);

  let showApplyToDropdown: string | null = $state(null);

  const addRangeOverride = (sectionId: string) => {
    const newSet = new Set(activeRangeOverrides);
    newSet.add(sectionId);
    activeRangeOverrides = newSet;
    isAddRangeOverrideOpen = false;
    // Auto-expand
    if (!expandedSections.has(sectionId)) toggleSection(sectionId);
  };

  const removeRangeOverride = (sectionId: string) => {
    const newSet = new Set(activeRangeOverrides);
    newSet.delete(sectionId);
    activeRangeOverrides = newSet;
  };

  const addSizeOverride = (sectionId: string) => {
     const newSet = new Set(activeSizeOverrides);
     newSet.add(sectionId);
     activeSizeOverrides = newSet;
     isAddSizeOverrideOpen = false;
     if (!expandedSections.has(sectionId)) toggleSection(sectionId);
  };

  const removeSizeOverride = (sectionId: string) => {
     const newSet = new Set(activeSizeOverrides);
     newSet.delete(sectionId);
     activeSizeOverrides = newSet;
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
</script>

{#snippet PropertySection({ 
    title, 
    sectionId, 
    children, 
    isNested = false, 
    rangeOverrideCount = 0, 
    sizeOverrideCount = 0, 
    extraClass = "",
    onRemove = undefined,
    onApply = undefined,
    applyDropdownOpen = false,
    onToggleApply = undefined
}: { 
    title: string, 
    sectionId: string, 
    children: any,
    isNested?: boolean,
    rangeOverrideCount?: number,
    sizeOverrideCount?: number,
    extraClass?: string,
    onRemove?: () => void,
    onApply?: () => void,
    applyDropdownOpen?: boolean,
    onToggleApply?: (e: Event) => void
})}
  {@const isExpanded = expandedSections.has(sectionId)}
  {@const borderOverride = isExpanded ? "expanded" : "collapsed"}
  <div class={cn(extraClass, borderOverride, "form-field border border-gray-200 rounded-lg overflow-hidden", isNested ? 'bg-gray-50/50' : '')}>
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
      
      <div class="flex items-center gap-2" onclick={(e) => e.stopPropagation()}>
         {#if onApply && onToggleApply}
             <div class="relative">
                <button 
                  class={cn("p-1 rounded text-xs flex items-center gap-1 hover:bg-gray-100", extraClass.includes('purple') ? "text-purple-600" : "text-orange-600")}
                  title="Apply to..."
                  onclick={onToggleApply}
                >
                  <ArrowRight class="w-3 h-3" />
                  <span class="text-[10px] font-medium">Apply</span>
                </button>
                {#if applyDropdownOpen}
                    <div class="absolute right-0 top-8 w-40 bg-white shadow-xl rounded-lg border border-gray-200 z-50 py-1" onclick={(e) => e.stopPropagation()}>
                        <div class="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Apply to...</div>
                        <button class="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700" onclick={onApply}>All Scopes</button>
                        <button class="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 text-gray-700" onclick={onApply}>Specific...</button>
                    </div>
                    <!-- Backdrop handled by parent or simpler click-outside logic needed, but for now this suffices as mock -->
                {/if}
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

         {#if isExpanded}
           <ChevronDown class="w-4 h-4 text-gray-500" />
         {:else}
           <ChevronRight class="w-4 h-4 text-gray-500" />
         {/if}
      </div>
    </button>
    {#if isExpanded}
       <div class={cn("p-3 border-t border-gray-200 bg-white space-y-3 animate-in slide-in-from-top-2 duration-200", isNested ? "p-2" : "")}>
          {@render children()}
       </div>
    {/if}
  </div>
{/snippet}

{#snippet renderGlobalProperties()}
    <div class="space-y-3 global-properties">
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-green-600 hover:text-green-700 text-xs">
          Expand all properties
        </Button>
        <div class="w-px h-3 bg-gray-200"></div>
        <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-green-600 hover:text-green-700 text-xs">
          Collapse all properties
        </Button>
      </div>

      <!-- Headline -->
      {@render PropertySection({
        title: "Headline",
        sectionId: "headline",
        rangeOverrideCount: 2,
        sizeOverrideCount: 1,
        children: HeadlineContent
      })}

      <!-- Description -->
      {@render PropertySection({
        title: "Description",
        sectionId: "description",
        sizeOverrideCount: 3,
        children: DescriptionContent
      })}

      <!-- Cover Image -->
      {@render PropertySection({
        title: "Cover Image",
        sectionId: "coverImage",
        rangeOverrideCount: 1,
        children: CoverImageContent
      })}

      <!-- Photo Credits -->
      {@render PropertySection({
        title: "Photo Credits",
        sectionId: "photoCredits",
        children: PhotoCreditsContent
      })}

      <!-- Bottom Right Logo -->
      {@render PropertySection({
        title: "Bottom Right Logo",
        sectionId: "logoBottomRight",
        children: LogoRightContent
      })}

      <!-- Bottom Left Logo -->
      {@render PropertySection({
        title: "Bottom Left Logo",
        sectionId: "logoBottomLeft",
        children: LogoLeftContent
      })}

      <!-- Font Colour -->
      {@render PropertySection({
        title: "Font Colour",
        sectionId: "fontColour",
        rangeOverrideCount: 1,
        children: FontColourContent,
        extraClass: "border-green-200"
      })}
    </div>
{/snippet}

{#snippet HeadlineContent()}
    <div class="space-y-2">
        <Label for="headline-text">Text</Label>
        <Input id="headline-text" value="THE GOAT" readonly />
    </div>
{/snippet}

{#snippet DescriptionContent()}
    <div class="space-y-2">
        <Label for="description-text">Text</Label>
        <Textarea
          id="description-text"
          value={`EMMA TWIGG\nWORLD CHAMPION - WOMEN'S SOLO\nWORLD ROWING BEACH SPRINT FINALS`}
          readonly
          rows={3}
        />
    </div>
{/snippet}

{#snippet CoverImageContent()}
    <div class="space-y-2">
        <Label for="cover-image">Image</Label>
        <Input id="cover-image" type="file" disabled />
    </div>
{/snippet}

{#snippet PhotoCreditsContent()}
    <div class="space-y-2">
        <Label for="photo-credits">Text</Label>
        <Input id="photo-credits" value="Photographer Name" readonly />
    </div>
{/snippet}

{#snippet LogoRightContent()}
    <div class="space-y-2">
        <Label for="logo-right">Image</Label>
        <Input id="logo-right" type="file" disabled />
    </div>
{/snippet}

{#snippet LogoLeftContent()}
    <div class="space-y-2">
        <Label for="logo-left">Image</Label>
        <Input id="logo-left" type="file" disabled />
    </div>
{/snippet}

{#snippet FontColourContent()}
    <div class="space-y-2">
        <Label for="font-colour">Colour</Label>
        <div class="relative">
            <select
                id="font-colour"
                value="Orange"
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm appearance-none"
            >
                <option value="Red">Red</option>
                <option value="Orange">Orange</option>
            </select>
        </div>
    </div>
{/snippet}


<div
  class={cn(
    "fixed top-20 right-[80px] w-96 max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50 transform transition-all duration-300 ease-in-out",
    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[80px] opacity-0 pointer-events-none'
  )}
  style:right={isOpen ? '80px' : '80px'}
  style:transition='all 0.3s ease-in-out'
>
  <div class="flex flex-col h-full max-h-[calc(100vh-120px)]">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50/50">
      <h2 class="text-gray-900">Properties</h2>
      <div class="flex items-center gap-1">
        <Button variant="ghost" size="icon" onclick={onClose} class="ml-1">
          <X class="w-5 h-5" />
        </Button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-gray-50/30">
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
    <div class="space-y-3 ranges-properties">
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

         <!-- Add Override Dropdown -->
         <div class="relative">
            <Button 
               variant="outline" 
               size="sm" 
               class="h-7 text-xs gap-1 border-purple-200 text-purple-700 hover:bg-purple-50"
               onclick={() => isAddRangeOverrideOpen = !isAddRangeOverrideOpen}
            >
               <Plus class="w-3 h-3" />
               Add override
            </Button>
            
            {#if isAddRangeOverrideOpen}
               <div class="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1 max-h-60 overflow-y-auto">
                  {#each ALL_SECTIONS.filter(s => !activeRangeOverrides.has(s)) as section}
                     <button
                        class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                        onclick={() => addRangeOverride(section)}
                     >
                        {section}
                     </button>
                  {/each}
                  {#if ALL_SECTIONS.filter(s => !activeRangeOverrides.has(s)).length === 0}
                     <div class="px-3 py-2 text-xs text-gray-400 italic">No more properties</div>
                  {/if}
               </div>
               <!-- Backdrop -->
               <!-- svelte-ignore a11y_click_events_have_key_events -->
               <!-- svelte-ignore a11y_no_static_element_interactions -->
               <div class="fixed inset-0 z-40" onclick={() => isAddRangeOverrideOpen = false}></div>
            {/if}
         </div>
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
            onRemove: () => removeRangeOverride(sectionId),
            onApply: () => { showApplyToDropdown = null; },
            applyDropdownOpen: showApplyToDropdown === sectionId,
            onToggleApply: (e) => { e.stopPropagation(); showApplyToDropdown = showApplyToDropdown === sectionId ? null : sectionId; }
         })}
      {/each}
    </div>
{/snippet}

{#snippet renderSizesProperties()}
    <div class="space-y-3 sizes-properties">
      <!-- Size Selector -->
      <div class="px-1">
          <label for="size-selector" class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">
            Select Size
          </label>
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

         <!-- Add Override Dropdown -->
         <div class="relative">
            <Button 
               variant="outline" 
               size="sm" 
               class="h-7 text-xs gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
               onclick={() => isAddSizeOverrideOpen = !isAddSizeOverrideOpen}
            >
               <Plus class="w-3 h-3" />
               Add override
            </Button>
            
            {#if isAddSizeOverrideOpen}
               <div class="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1 max-h-60 overflow-y-auto">
                  {#each ALL_SECTIONS.filter(s => !activeSizeOverrides.has(s)) as section}
                     <button
                        class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-900"
                        onclick={() => addSizeOverride(section)}
                     >
                        {section}
                     </button>
                  {/each}
                  {#if ALL_SECTIONS.filter(s => !activeSizeOverrides.has(s)).length === 0}
                     <div class="px-3 py-2 text-xs text-gray-400 italic">No more properties</div>
                  {/if}
               </div>
               <!-- Backdrop -->
               <!-- svelte-ignore a11y_click_events_have_key_events -->
               <!-- svelte-ignore a11y_no_static_element_interactions -->
               <div class="fixed inset-0 z-40" onclick={() => isAddSizeOverrideOpen = false}></div>
            {/if}
         </div>
      </div>

      <div class="h-px bg-gray-100 my-2"></div>

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
            onRemove: () => removeSizeOverride(sectionId),
            onApply: () => { showApplyToDropdown = null; },
            applyDropdownOpen: showApplyToDropdown === sectionId,
            onToggleApply: (e) => { e.stopPropagation(); showApplyToDropdown = showApplyToDropdown === sectionId ? null : sectionId; }
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
