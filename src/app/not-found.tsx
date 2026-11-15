import Link from "next/link";
import { Compass } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas px-6 py-6" data-not-found>
      <Logo />
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-sm text-center">
          <div className="text-[64px] font-medium leading-none tracking-[-0.04em] text-gray-300 tabular">404</div>
          <span className="mx-auto mt-4 grid size-11 place-items-center rounded-2xl bg-ink-900 text-white"><Compass className="size-5" /></span>
          <h1 className="mt-4 text-[20px] font-medium tracking-[-0.02em]">This page wandered off</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">The link might be old, or the page was moved. Your searches and lists are safe.</p>
          <div className="mt-6 flex justify-center gap-2">
            <Link href="/" className="inline-flex h-9 items-center rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800">Go to dashboard</Link>
            <Link href="/search/new" className="inline-flex h-9 items-center rounded-full border border-black/[0.06] bg-white px-4 text-xs font-medium shadow-xs hover:bg-gray-25">Start a search</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
