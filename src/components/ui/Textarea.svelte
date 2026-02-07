<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import { cn } from "@/lib/utils";

  type Props = HTMLTextareaAttributes & {
    class?: string;
  };

  let { class: className, value = $bindable(), ...rest }: Props = $props();
</script>

<textarea
  class={cn(
    "flex min-h-[60px] w-full rounded-lg border-none bg-gray-100/80 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 disabled:cursor-not-allowed",
    className
  )}
  bind:value
  {...rest}
></textarea>
