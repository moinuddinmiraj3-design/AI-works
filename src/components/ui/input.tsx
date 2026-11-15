import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-md border bg-background px-2.5 text-sm shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-gray-400 hover:border-gray-300 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15",
        className
      )}
      {...props}
    />
  );
}
export { Input };
