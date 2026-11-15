import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-700",
        dark: "bg-ink-900 text-white hover:bg-ink-800",
        light: "bg-white text-foreground hover:bg-white/90",
        outline: "border bg-background shadow-xs hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-gray-100",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        soft: "bg-accent text-accent-foreground hover:bg-brand-100",
        glass: "border border-white/10 bg-white/5 text-ink-100 hover:bg-white/10",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 text-sm",
        sm: "h-7 px-2.5 text-sm",
        xs: "h-6 rounded-sm px-2 text-xs",
        lg: "h-9 px-4 text-base",
        icon: "size-8",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
