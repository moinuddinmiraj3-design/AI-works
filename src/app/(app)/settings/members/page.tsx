import { TopBar } from "@/components/shell/page-header";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsMembersPage() {
  return (
    <>
      <TopBar crumbs={["Settings", "Team members"]} />
      <SettingsView initial="members" />
    </>
  );
}
