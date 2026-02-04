<script lang="ts">
  import { X, ChevronDown, ChevronRight, Check } from 'lucide-svelte';
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

  // Mock Override State
  let showApplyToOthers: string | null = $state(null);

  // Mock Dropdown State
  let isRangesOpen = $state(false);
  let isSizesOpen = $state(false);

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
    extraClass = "" 
}: { 
    title: string, 
    sectionId: string, 
    children: any,
    isNested?: boolean,
    rangeOverrideCount?: number,
    sizeOverrideCount?: number,
    extraClass?: string
})}
  {@const isExpanded = expandedSections.has(sectionId)}
  {@const borderOverride = isExpanded ? "expanded" : "collapsed"}
  <div class={cn(extraClass, borderOverride, "form-field border border-gray-200 rounded-lg overflow-hidden", isNested ? 'bg-gray-50/50' : '')}>
    <button
      onclick={() => toggleSection(sectionId)}
      class={cn("w-full flex items-center justify-between p-3 transition-colors", isNested ? 'hover:bg-white' : 'hover:bg-gray-50 bg-gray-50/30')}
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
      {#if isExpanded}
        <ChevronDown class="w-4 h-4 text-gray-500" />
      {:else}
        <ChevronRight class="w-4 h-4 text-gray-500" />
      {/if}
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
        <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Expand all properties
        </Button>
        <div class="w-px h-3 bg-gray-200"></div>
        <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
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
        children: FontColourContent
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
        <button
          onclick={() => onTabChange(tab as PropertyTab)}
          class={cn(
            "flex-1 px-4 py-2.5 text-sm transition-all capitalize",
            activeTab === tab
              ? 'bg-white text-gray-900 border-b-2 border-blue-500'
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

      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Expand all properties
        </Button>
        <div class="w-px h-3 bg-gray-200"></div>
        <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Collapse all properties
        </Button>
      </div>

      <!-- Reuse Property Sections but conceptually they would edit overrides -->
      <!-- Headline -->
      {@render PropertySection({ title: "Headline", sectionId: "headline", children: HeadlineContent, extraClass: "border-purple-200" })}
      <!-- Description -->
      {@render PropertySection({ title: "Description", sectionId: "description", children: DescriptionContent, extraClass: "border-purple-200" })}
      <!-- Cover Image -->
      {@render PropertySection({ title: "Cover Image", sectionId: "coverImage", children: CoverImageContent, extraClass: "border-purple-200" })}
      <!-- Photo Credits -->
      {@render PropertySection({ title: "Photo Credits", sectionId: "photoCredits", children: PhotoCreditsContent, extraClass: "border-purple-200" })}
      <!-- Bottom Right Logo -->
      {@render PropertySection({ title: "Bottom Right Logo", sectionId: "logoBottomRight", children: LogoRightContent, extraClass: "border-purple-200" })}
      <!-- Bottom Left Logo -->
      {@render PropertySection({ title: "Bottom Left Logo", sectionId: "logoBottomLeft", children: LogoLeftContent, extraClass: "border-purple-200" })}
      <!-- Font Colour -->
      {@render PropertySection({ title: "Font Colour", sectionId: "fontColour", children: FontColourContent, extraClass: "border-purple-200" })}
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

      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" onclick={expandAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Expand all properties
        </Button>
        <div class="w-px h-3 bg-gray-200"></div>
        <Button variant="ghost" size="sm" onclick={collapseAll} class="h-6 text-[10px] px-2 text-blue-600 hover:text-blue-700 text-xs">
          Collapse all properties
        </Button>
      </div>

      <!-- Reuse Property Sections -->
      <!-- Headline -->
      {@render PropertySection({ title: "Headline", sectionId: "headline", children: HeadlineContent, extraClass: "border-orange-200" })}
      <!-- Description -->
      {@render PropertySection({ title: "Description", sectionId: "description", children: DescriptionContent, extraClass: "border-orange-200" })}
      <!-- Cover Image -->
      {@render PropertySection({ title: "Cover Image", sectionId: "coverImage", children: CoverImageContent, extraClass: "border-orange-200" })}
      <!-- Photo Credits -->
      {@render PropertySection({ title: "Photo Credits", sectionId: "photoCredits", children: PhotoCreditsContent, extraClass: "border-orange-200" })}
      <!-- Bottom Right Logo -->
      {@render PropertySection({ title: "Bottom Right Logo", sectionId: "logoBottomRight", children: LogoRightContent, extraClass: "border-orange-200" })}
      <!-- Bottom Left Logo -->
      {@render PropertySection({ title: "Bottom Left Logo", sectionId: "logoBottomLeft", children: LogoLeftContent, extraClass: "border-orange-200" })}
      <!-- Font Colour -->
      {@render PropertySection({ title: "Font Colour", sectionId: "fontColour", children: FontColourContent, extraClass: "border-orange-200" })}
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
