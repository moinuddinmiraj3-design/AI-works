/** Renders text with {Variables} shown as small neutral chips. */
export function VarText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        /^\{[^}]+\}$/.test(p) ? (
          <span key={i} className="mx-px rounded-[5px] bg-gray-100 px-1 py-px text-[0.92em] font-medium text-gray-700 ring-1 ring-inset ring-black/[0.06]">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </span>
  );
}
