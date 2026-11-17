"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Fire a short confirmation message from anywhere. */
export function toast(message: string) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("lasso-toast", { detail: message }));
}

export function Toaster() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      setShow(true);
      clearTimeout(t);
      t = setTimeout(() => setShow(false), 2200);
    };
    window.addEventListener("lasso-toast", on);
    return () => { window.removeEventListener("lasso-toast", on); clearTimeout(t); };
  }, []);
  return (
    <div
      role="status"
      aria-live="polite"
      data-react-toaster
      className={cn(
        "pointer-events-none fixed bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-full fx-glass-dark px-4 py-2.5 text-[13px] font-medium text-white transition-all duration-200",
        show ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      )}
    >
      {msg}
    </div>
  );
}
