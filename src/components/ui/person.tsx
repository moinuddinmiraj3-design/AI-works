/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

/** Round photo avatar. Small static images, so a plain <img> keeps the markup portable. */
export function PersonAvatar({ src, name, className }: { src: string; name: string; className?: string }) {
  return <img src={src} alt={name} width={32} height={32} className={cn("size-8 shrink-0 rounded-full object-cover ring-1 ring-black/5", className)} />;
}
