import type { Tone } from "./mock";

/** Tinted icon tile / chip colors, built around the cobalt accent. */
export const toneClasses: Record<Tone, string> = {
  blue: "bg-brand-50 text-brand-600",
  violet: "bg-[#f1edfd] text-[#6a45d8]",
  amber: "bg-[#fdf3e1] text-[#b06a08]",
  green: "bg-[#e9f6ee] text-[#18804a]",
  rose: "bg-[#fdecef] text-[#c0344f]",
  slate: "bg-muted text-gray-600",
};

export const toneDot: Record<Tone, string> = {
  blue: "bg-brand-600",
  violet: "bg-[#6a45d8]",
  amber: "bg-[#e0901a]",
  green: "bg-success",
  rose: "bg-[#c0344f]",
  slate: "bg-gray-400",
};
