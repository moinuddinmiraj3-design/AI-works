import { notFound } from "next/navigation";
import { TopBar } from "@/components/shell/page-header";
import { CandidatePage } from "@/components/library/candidate-page";
import { collections } from "@/lib/mock";
import { activityFor, allCandidates, collectionMembers, criteriaSets, searchOf } from "@/lib/search-mock";

export function generateStaticParams() {
  return allCandidates.map((c) => ({ id: c.id }));
}

export default async function CandidateRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = allCandidates.find((x) => x.id === id);
  if (!c) notFound();

  const homeCol = collections.find((col) => collectionMembers[col.id]?.some((m) => m.id === id));
  const list = homeCol ? collectionMembers[homeCol.id] : [];
  const idx = list.findIndex((m) => m.id === id);
  const set = criteriaSets[searchOf(id)];

  return (
    <>
      <TopBar crumbs={homeCol ? ["Library", homeCol.name, c.name] : ["Sourcing", c.name]} />
      <CandidatePage
        c={c}
        member={list[idx] ?? null}
        searchTitle={set.title}
        criteria={set.items}
        activity={activityFor(id)}
        inCollections={collections.filter((col) => collectionMembers[col.id]?.some((m) => m.id === id)).map(({ id, name, tone }) => ({ id, name, tone }))}
        back={homeCol ? { href: `/collections/${homeCol.id}`, label: homeCol.name } : { href: "/search/s1", label: "Back to search" }}
        position={{
          index: idx >= 0 ? idx + 1 : 1,
          total: list.length || 1,
          prev: idx > 0 ? list[idx - 1].id : null,
          next: idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null,
        }}
      />
    </>
  );
}
