import { TopBar } from "@/components/shell/page-header";
import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPlanPage() {
  return (
    <>
      <TopBar crumbs={["Settings", "Plan & usage"]} />
      <SettingsView initial="plan" />
    </>
  );
}
