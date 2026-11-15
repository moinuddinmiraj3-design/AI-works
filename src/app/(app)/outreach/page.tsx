import { TopBar } from "@/components/shell/page-header";
import { OutreachView } from "@/components/outreach/outreach-view";

export default function OutreachPage() {
  return (
    <>
      <TopBar crumbs={["Outreach"]} />
      <OutreachView />
    </>
  );
}
