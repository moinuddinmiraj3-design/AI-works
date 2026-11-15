"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Dialogs opened from inside the phone menu ask it to close first.
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("lasso-close-menu", close);
    return () => window.removeEventListener("lasso-close-menu", close);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex min-h-dvh bg-canvas">
        <aside data-sidebar data-collapsed={collapsed} className="sticky top-0 z-40 hidden h-dvh w-[236px] shrink-0 overflow-y-auto overflow-x-hidden border-r border-black/[0.05] bg-white lg:block">
          <AppSidebar onToggle={() => setCollapsed((c) => !c)} />
        </aside>

        <div className={cn("fixed inset-0 z-40 lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
          <div className={cn("absolute inset-0 bg-black/25 transition-opacity", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
          <aside data-mobile-drawer className={cn("absolute inset-y-0 left-0 w-[264px] overflow-y-auto bg-white shadow-xl transition-transform", open ? "translate-x-0" : "-translate-x-full")}>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-3 top-3.5 z-10 grid size-8 place-items-center rounded-md text-gray-500 hover:bg-gray-75">
              <X className="size-4" />
            </button>
            <AppSidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>

        <div data-main className="flex min-w-0 flex-1 flex-col">
          <MobileMenuContext.Provider value={() => setOpen(true)}>{children}</MobileMenuContext.Provider>
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

const MobileMenuContext = createContext<() => void>(() => {});

export function MobileMenuButton() {
  const open = useContext(MobileMenuContext);
  return (
    <button onClick={open} aria-label="Open menu" className="-ml-1.5 grid size-8 place-items-center rounded-md hover:bg-muted lg:hidden">
      <Menu className="size-[18px]" />
    </button>
  );
}
