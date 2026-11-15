import { TopBar } from "@/components/shell/page-header";
import { Searching } from "@/components/search/searching";
import { searches } from "@/lib/mock";

export default function SearchingPage() {
  return (
    <>
      <TopBar crumbs={["Sourcing", "Searching"]} />
      <Searching brief={searches[0].description} />
    </>
  );
}
