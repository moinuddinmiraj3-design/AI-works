import { notFound } from "next/navigation";
import { TopBar } from "@/components/shell/page-header";
import { CollectionView } from "@/components/library/collection-view";
import { collections } from "@/lib/mock";
import { allCandidates, collectionMembers } from "@/lib/search-mock";

export function generateStaticParams() {
  return collections.map((c) => ({ id: c.id }));
}

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const col = collections.find((c) => c.id === id);
  if (!col) notFound();
  const rows = (collectionMembers[id] ?? []).map((m) => ({ ...m, c: allCandidates.find((c) => c.id === m.id)! }));

  return (
    <>
      <TopBar crumbs={["Library", col.name]} />
      <CollectionView collectionId={id} rows={rows} />
    </>
  );
}
