<script lang="ts">
  import { Separator as SeparatorPrimitive, type WithoutChildrenOrChild } from "bits-ui";
  import { cn } from "@/lib/utils";

  let { class: className, orientation = "horizontal", decorational = true, ...rest }: 
  WithoutChildrenOrChild<SeparatorPrimitive.RootProps> & { class?: string } = $props();
</script>

<SeparatorPrimitive.Root
  class={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
    className
  )}
  {...rest}
/>
