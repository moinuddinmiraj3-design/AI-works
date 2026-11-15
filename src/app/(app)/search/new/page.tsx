import { TopBar } from "@/components/shell/page-header";
import { AiSourcing } from "@/components/search/ai-sourcing";

export default function NewSearchPage() {
  return (
    <div className="flex h-dvh flex-col">
      <TopBar crumbs={["Sourcing", "New search"]} />
      <AiSourcing />
    </div>
  );
}
