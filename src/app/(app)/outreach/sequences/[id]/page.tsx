import { notFound } from "next/navigation";
import { TopBar } from "@/components/shell/page-header";
import { SequenceEditor } from "@/components/outreach/sequence-editor";
import { sequences } from "@/lib/outreach-mock";

export function generateStaticParams() {
  return sequences.map((s) => ({ id: s.id }));
}

export default async function SequencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seq = sequences.find((s) => s.id === id);
  if (!seq) notFound();
  return (
    <>
      <TopBar crumbs={["Outreach", seq.name]} />
      <SequenceEditor seq={seq} />
    </>
  );
}
