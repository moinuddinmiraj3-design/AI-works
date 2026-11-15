import { notFound } from "next/navigation";
import { TopBar } from "@/components/shell/page-header";
import { SearchWorkspace } from "@/components/search/search-workspace";
import { searches } from "@/lib/mock";

export function generateStaticParams() {
  return searches.map((s) => ({ id: s.id }));
}

export default async function SearchResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const search = searches.find((s) => s.id === id);
  if (!search) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar crumbs={["Sourcing", search.title]} />
      <SearchWorkspace title={search.title} description={search.description} progress={search.progress} />
    </div>
  );
}
