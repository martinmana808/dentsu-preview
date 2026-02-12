<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from "@/lib/utils";

  type Props = HTMLInputAttributes & {
    class?: string;
  };

  let { class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<input
  class={cn(
    "flex h-10 w-full rounded-lg border-none bg-gray-100/80 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 disabled:cursor-not-allowed transition-[color,box-shadow]",
    className
  )}
  bind:value
  {...rest}
/>
