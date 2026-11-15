"use client";

/*
 * Popover menus and dialogs.
 * Panels stay in the DOM (hidden when closed) and carry data-* hooks so the
 * static prototype can open and close them with the same markup.
 */

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import { toast } from "./toaster";
import { cn } from "@/lib/utils";

const CloseCtx = createContext<() => void>(() => {});
export const useClose = () => useContext(CloseCtx);

/* ---------------- Popover ---------------- */

export function Popover({
  trigger, triggerClassName, triggerLabel, children, align = "start", side = "bottom", width = 240, panelClassName, rootClassName,
}: {
  trigger: React.ReactNode; triggerClassName?: string; triggerLabel?: string; children: React.ReactNode;
  align?: "start" | "end"; side?: "bottom" | "top"; width?: number; panelClassName?: string; rootClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, [open]);

  return (
    <div ref={ref} data-pop-root className={cn("relative inline-flex", rootClassName)}>
      <button type="button" data-pop-trigger aria-label={triggerLabel} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={triggerClassName}>
        {trigger}
      </button>
      <div
        data-pop-panel
        role="menu"
        className={cn(
          "absolute z-50 max-w-[calc(100vw-24px)] rounded-xl border border-black/[0.08] bg-white p-1 text-foreground shadow-[0_16px_40px_-12px_rgba(16,24,40,0.22)]",
          side === "bottom" ? "top-full mt-1.5" : "bottom-full mb-1.5",
          align === "end" ? "right-0" : "left-0",
          !open && "hidden",
          panelClassName
        )}
        style={{ width }}
      >
        <CloseCtx.Provider value={() => setOpen(false)}>{children}</CloseCtx.Provider>
      </div>
    </div>
  );
}

const itemCls = "flex h-8 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] transition-colors hover:bg-gray-50";

export function PopItem({
  icon: Icon, children, onSelect, toast: msg, href, danger, hint,
}: { icon?: React.ElementType; children: React.ReactNode; onSelect?: () => void; toast?: string; href?: string; danger?: boolean; hint?: string }) {
  const close = useClose();
  const inner = (
    <>
      {Icon && <Icon className={cn("size-4", danger ? "text-danger" : "text-gray-500")} strokeWidth={1.75} />}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
    </>
  );
  if (href)
    return <Link href={href} role="menuitem" data-pop-item onClick={close} className={cn(itemCls, danger && "text-danger")}>{inner}</Link>;
  return (
    <button type="button" role="menuitem" data-pop-item data-toast={msg} onClick={() => { onSelect?.(); if (msg) toast(msg); close(); }} className={cn(itemCls, danger && "text-danger")}>
      {inner}
    </button>
  );
}

export function PopOption({ label, selected, onSelect, hint }: { label: string; selected: boolean; onSelect: () => void; hint?: string }) {
  const close = useClose();
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      data-pop-option
      data-label={label}
      data-selected={selected}
      onClick={() => { onSelect(); close(); }}
      className={cn(itemCls, "group data-[selected=true]:font-medium")}
    >
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {hint && <span className="text-[11px] text-gray-400">{hint}</span>}
      <Check className="invisible size-4 text-foreground group-data-[selected=true]:visible" strokeWidth={2.25} />
    </button>
  );
}

export function PopHeading({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-2.5 pb-1 pt-1.5">
      <span className="text-[11px] font-medium text-gray-500">{children}</span>
      {action}
    </div>
  );
}

export const PopSeparator = () => <div className="-mx-1 my-1 h-px bg-black/[0.06]" />;

/** A menu of mutually-exclusive options whose trigger shows the current choice. */
export function OptionsMenu({
  options, value: initial, icon: Icon, triggerClassName, align = "start", width = 200, prefix, rootClassName,
}: { options: string[]; value: string; icon?: React.ElementType; triggerClassName?: string; align?: "start" | "end"; width?: number; prefix?: string; rootClassName?: string }) {
  const [value, setValue] = useState(initial);
  return (
    <Popover
      align={align}
      width={width}
      rootClassName={rootClassName}
      triggerClassName={triggerClassName ?? "inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 text-xs shadow-xs hover:bg-gray-25"}
      trigger={
        <>
          {Icon && <Icon className="size-3.5 text-gray-500" />}
          {prefix}
          <span data-pop-label>{value}</span>
          <svg viewBox="0 0 24 24" className="size-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="m6 9 6 6 6-6" /></svg>
        </>
      }
    >
      {options.map((o) => <PopOption key={o} label={o} selected={o === value} onSelect={() => setValue(o)} />)}
    </Popover>
  );
}

/* ---------------- Dialog ---------------- */

export function Dialog({
  trigger, triggerClassName, triggerLabel, title, description, children, footer, side = "center", width = 480, triggerAs,
}: {
  trigger: React.ReactNode; triggerClassName?: string; triggerLabel?: string; title: string; description?: string;
  children: React.ReactNode; footer?: React.ReactNode; side?: "center" | "right"; width?: number; triggerAs?: "button" | "span";
}) {
  const [open, setOpen] = useState(false);
  const [portal, setPortal] = useState(false);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  const close = () => { setOpen(false); setPortal(false); };
  const Trigger = triggerAs === "span" ? "span" : "button";
  const wrap = (node: React.ReactNode) => (portal && typeof document !== "undefined" ? createPortal(node, document.body) : node);

  return (
    <>
      <Trigger
        {...(Trigger === "button" ? { type: "button" as const } : { role: "button", tabIndex: 0 })}
        data-dialog-trigger
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        onClick={(e) => {
          // Inside the phone menu: close the menu and render the dialog at the page root
          // so it isn't trapped inside the sliding drawer.
          if ((e.currentTarget as HTMLElement).closest("[data-mobile-drawer]")) {
            setPortal(true);
            window.dispatchEvent(new Event("lasso-close-menu"));
          }
          setOpen(true);
        }}
        className={triggerClassName}
      >
        {trigger}
      </Trigger>
      {wrap(
      <div data-dialog-panel className={cn("fixed inset-0 z-[60]", !open && "hidden")}>
        <div data-dialog-close className="absolute inset-0 bg-black/30" onClick={close} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={cn(
            "absolute flex flex-col bg-white text-left text-foreground shadow-[0_24px_64px_-16px_rgba(0,0,0,0.35)]",
            side === "right"
              ? "inset-y-2 right-2 w-[min(420px,calc(100vw-16px))] rounded-2xl"
              : "left-1/2 top-[10vh] max-h-[80vh] w-[min(var(--dlg-w),calc(100vw-32px))] -translate-x-1/2 rounded-2xl"
          )}
          style={{ ["--dlg-w" as string]: `${width}px` }}
        >
          <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-5">
            <div>
              <h2 className="text-[16px] font-medium leading-tight">{title}</h2>
              {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
            </div>
            <button type="button" data-dialog-close aria-label="Close" onClick={close} className="-mr-1.5 -mt-1 grid size-8 shrink-0 place-items-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>
          <CloseCtx.Provider value={close}>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{children}</div>
            {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t border-black/[0.06] px-5 py-3">{footer}</div>}
          </CloseCtx.Provider>
        </div>
      </div>
      )}
    </>
  );
}

/** Button inside a dialog that closes it, optionally confirming with a toast or navigating. */
export function DialogAction({
  children, primary, toast: msg, onClick, href, className,
}: { children: React.ReactNode; primary?: boolean; toast?: string; onClick?: () => void; href?: string; className?: string }) {
  const close = useClose();
  const cls = cn(
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-medium transition-colors",
    primary ? "bg-ink-900 text-white hover:bg-ink-800" : "text-gray-600 hover:bg-gray-50",
    className
  );
  if (href) return <Link href={href} data-dialog-close data-toast={msg} onClick={() => { if (msg) toast(msg); close(); }} className={cls}>{children}</Link>;
  return (
    <button type="button" data-dialog-close data-toast={msg} onClick={() => { onClick?.(); if (msg) toast(msg); close(); }} className={cls}>
      {children}
    </button>
  );
}

/* ---------------- Form bits used inside popups ---------------- */

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-600">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="mt-1 block text-[11px] text-gray-400">{hint}</span>}
    </label>
  );
}

export const inputCls = "h-10 w-full rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 text-[13px] outline-none focus:border-gray-300 focus:bg-white";
export const textareaCls = "w-full resize-none rounded-xl border border-black/[0.08] bg-gray-25 px-3.5 py-2.5 text-[13px] leading-relaxed outline-none focus:border-gray-300 focus:bg-white";
