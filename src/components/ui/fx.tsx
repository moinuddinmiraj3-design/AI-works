import type { CSSProperties } from "react";

/**
 * Motion helpers layered on top of the Lasso design system (styles in src/app/effects.css).
 * They only add movement and surface effects; colours, type and spacing stay on the existing tokens.
 */

/** Hover text roll: each letter slides up and the same letter rolls in from below, staggered. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="fx-roll-wrap">
      <span className="sr-only">{children}</span>
      <span aria-hidden className="fx-roll">
        {Array.from(children).map((ch, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties}>{ch}</span>
        ))}
      </span>
    </span>
  );
}

/** Idle border beam: a small light that keeps travelling around the button's edge. Parent needs `relative`. */
export function Beam() {
  return (
    <>
      <span aria-hidden className="fx-beam" />
      <span aria-hidden className="fx-beam-glow"><i /></span>
    </>
  );
}
