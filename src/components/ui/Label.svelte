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
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...rest}
>
  {@render children?.()}
</LabelPrimitive.Root>
