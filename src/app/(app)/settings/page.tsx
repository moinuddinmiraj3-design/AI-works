import { TopBar } from "@/components/shell/page-header";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
  return (
    <>
      <TopBar crumbs={["Settings"]} />
      <SettingsView />
    </>
  );
}
