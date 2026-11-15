// Tiny formatting for email bodies: **bold**, *italic*, __underline__, [text](url), "• " lists.
// Kept dependency-free so the prototype can reuse the exact same logic.

export type Format = "bold" | "italic" | "underline" | "link" | "list";

const wraps: Record<Exclude<Format, "list">, [string, string, string]> = {
  bold: ["**", "**", "bold text"],
  italic: ["*", "*", "italic text"],
  underline: ["__", "__", "underlined text"],
  link: ["[", "](https://)", "link text"],
};

/** Apply a format to the selection; returns the new value and the new selection. */
export function applyFormat(value: string, start: number, end: number, kind: Format) {
  if (kind === "list") {
    const ls = value.lastIndexOf("\n", start - 1) + 1;
    const leRaw = value.indexOf("\n", end);
    const le = leRaw === -1 ? value.length : leRaw;
    const block = value.slice(ls, le);
    const lines = block.split("\n");
    const allBullets = lines.every((l) => l.startsWith("• "));
    const next = lines.map((l) => (allBullets ? l.slice(2) : l.startsWith("• ") ? l : "• " + l)).join("\n");
    return { value: value.slice(0, ls) + next + value.slice(le), start: ls, end: ls + next.length };
  }
  const [a, b, placeholder] = wraps[kind];
  const sel = value.slice(start, end) || placeholder;
  const v = value.slice(0, start) + a + sel + b + value.slice(end);
  return { value: v, start: start + a.length, end: start + a.length + sel.length };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Render formatted text to safe HTML (escaped first, then markers turned into tags). */
export function richHtml(text: string) {
  return esc(text)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<u>$1</u>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
