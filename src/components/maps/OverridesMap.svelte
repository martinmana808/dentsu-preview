<script lang="ts">
  import BaseMapTable from './BaseMapTable.svelte';
  import { PROPERTIES, SIZES, OVERRIDES_DATA } from './constants';
  import { cn } from '@/lib/utils';
  
  let { onNavigate }: { onNavigate?: (tab: 'ranges' | 'sizes') => void } = $props();

  const getRangeStyle = (isStart: boolean, isEnd: boolean, isMiddle: boolean) => {
      let rangeStyle: any = {
        position: 'absolute',
        height: '1rem', // h-4
        backgroundColor: '#a855f7', // purple-500
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
      };

      if (isStart && isEnd) {
          rangeStyle.left = '50%';
          rangeStyle.right = '50%';
          rangeStyle.width = '10px';
          rangeStyle.marginLeft = '-5px';
          rangeStyle.borderRadius = '100rem';
      } else if (isStart) {
          rangeStyle.left = 'calc(50% - 8px)';
          rangeStyle.right = '-1px';
          rangeStyle.borderTopLeftRadius = '100rem';
          rangeStyle.borderBottomLeftRadius = '100rem';
      } else if (isEnd) {
          rangeStyle.left = '-1px';
          rangeStyle.right = 'calc(50% - 8px)';
          rangeStyle.borderTopRightRadius = '100rem';
          rangeStyle.borderBottomRightRadius = '100rem';
      } else {
          rangeStyle.left = '0';
          rangeStyle.right = '0';
          rangeStyle.marginInline = '-1px';
      }
      return rangeStyle;
  };
    
  function styleToString(style: any) {
    return Object.keys(style).reduce((acc, key) => (
        acc + key.replace(/[A-Z]/g, '-$&').toLowerCase() + ':' + style[key] + ';'
    ), '');
  }
</script>

<div class="rounded-lg p-6 w-full">
    <BaseMapTable>
        {#each PROPERTIES as prop}
            <tr class="border-gray-100 hover:bg-gray-50/30 transition-colors">
                <td class="propertyCell sticky left-0 z-10 p-3 font-medium text-gray-800 border-gray-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] whitespace-nowrap">
                    {prop}
                </td>
                
                {#each SIZES as size, colIndex}
                     {@const overrides = OVERRIDES_DATA[prop] || []}
                     {@const rangeOverride = overrides.find(o => o.type === 'range' && o.sizes.includes(size))}
                     {@const sizeOverride = overrides.find(o => o.type === 'size' && o.sizes.includes(size))}

                     {@const prevSize = colIndex > 0 ? SIZES[colIndex - 1] : null}
                     {@const nextSize = colIndex < SIZES.length - 1 ? SIZES[colIndex + 1] : null}

                     {@const isStart = rangeOverride && (!prevSize || !rangeOverride.sizes.includes(prevSize))}
                     {@const isEnd = rangeOverride && (!nextSize || !rangeOverride.sizes.includes(nextSize))}

                     <td>
                         <div class="w-full h-full flex items-center justify-center relative">
                            {#if rangeOverride}
                                <!-- svelte-ignore a11y_click_events_have_key_events -->
                                <!-- svelte-ignore a11y_no_static_element_interactions -->
                                <button
                                    onclick={() => onNavigate?.('ranges')}
                                    class="absolute inset-0 cursor-pointer hover:bg-purple-500/10 transition-colors"
                                    style={styleToString(getRangeStyle(!!isStart, !!isEnd, true))}
                                    aria-label="Navigate to ranges"
                                ></button>
                            {/if}

                            {#if sizeOverride}
                                <button 
                                    onclick={() => onNavigate?.('sizes')}
                                    class="w-4 h-4 bg-orange-500 rounded-full z-20 shadow-sm cursor-pointer hover:scale-125 transition-transform" 
                                    title="Size Override" 
                                    aria-label="Navigate to sizes"
                                ></button>
                            {/if}
                         </div>
                     </td>
                {/each}
            </tr>
        {/each}
    </BaseMapTable>
</div>
