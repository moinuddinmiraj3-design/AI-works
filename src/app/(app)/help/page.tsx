import Link from "next/link";
import { BookOpen } from "lucide-react";
import { TopBar } from "@/components/shell/page-header";
import { Roll } from "@/components/ui/fx";

export default function HelpPage() {
  return (
    <>
      <TopBar crumbs={["Knowledge hub"]} />
      <div className="mx-auto grid w-full max-w-[1120px] flex-1 place-items-center px-4 py-16">
        <div className="max-w-sm text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white text-gray-500 shadow-xs ring-1 ring-black/[0.06]"><BookOpen className="size-5" /></span>
          <h1 className="mt-4 text-[20px] font-medium tracking-[-0.02em]">Knowledge hub is on the way</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Guides on writing great search briefs, sequences that get replies and keeping your sender reputation healthy will live here.</p>
          <Link href="/" className="fx-btn mt-5 inline-flex h-9 items-center rounded-full bg-ink-900 px-4 text-xs font-medium text-white hover:bg-ink-800"><Roll>Back to dashboard</Roll></Link>
        </div>
      </div>
    </>
  );
}
