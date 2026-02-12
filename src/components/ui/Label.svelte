<script lang="ts">
  import { Label as LabelPrimitive, type WithoutChildrenOrChild } from "bits-ui";
  import { cn } from "@/lib/utils";

  type Props = WithoutChildrenOrChild<LabelPrimitive.RootProps> & {
    class?: string;
    children?: import("svelte").Snippet;
  };

  let { class: className, children, ...rest }: Props = $props();
</script>

<LabelPrimitive.Root
  class={cn(
    "flex items-center gap-2 text-xs leading-none text-gray-500 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 my-2",
    className
  )}
  {...rest}
>
  {@render children?.()}
</LabelPrimitive.Root>
