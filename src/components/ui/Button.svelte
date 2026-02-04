<script lang="ts">
  import { Button as ButtonPrimitive, type WithoutChildrenOrChild } from "bits-ui";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "@/lib/utils";

  const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
          outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

  type Props = WithoutChildrenOrChild<ButtonPrimitive.RootProps> &
    VariantProps<typeof buttonVariants> & {
      class?: string;
      children?: import("svelte").Snippet;
    };

    let { class: className, variant, size, children, ...rest }: Props = $props();
</script>

<ButtonPrimitive.Root
  class={cn(buttonVariants({ variant, size, className }))}
  {...rest}
>
  {@render children?.()}
</ButtonPrimitive.Root>
