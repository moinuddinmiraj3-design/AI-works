import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-sm border px-1.5 text-xs font-medium [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "h-5 border-transparent bg-accent text-accent-foreground",
        outline: "h-5 bg-background text-foreground",
        muted: "h-5 border-transparent bg-muted text-muted-foreground",
        success: "h-5 border-transparent bg-[#eaf7ef] text-[#167a42]",
        warning: "h-5 border-transparent bg-[#fdf3e1] text-[#9a5b00]",
        danger: "h-5 border-transparent bg-[#fdecec] text-[#b4262b]",
        count: "h-4 min-w-4 justify-center rounded-full border-transparent bg-primary px-1 font-mono text-[10px] text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
