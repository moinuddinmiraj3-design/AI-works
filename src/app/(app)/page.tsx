import { Mail, MailOpen, UserCheck } from "lucide-react";
import { TopBar } from "@/components/shell/page-header";
import { OverviewHeader } from "@/components/home/overview-header";
import { SourcedCard } from "@/components/home/sourced-card";
import { ActivityChart } from "@/components/home/activity-chart";
import { MetricCard } from "@/components/home/metric-card";
import { ReplyBreakdown } from "@/components/home/reply-breakdown";
import { TopMatchesCard } from "@/components/home/top-matches-card";
import { OpenRolesCard } from "@/components/home/open-roles-card";
import { ShortlistList } from "@/components/home/shortlist-list";

/*
 * Layout
 *  - phone: one column (the two small metrics share a row)
 *  - md–lg: two columns, cards paired side by side
 *  - xl:    left stack (sourced + chart) beside a 2-col metrics grid, shortlist full width
 * The column wrappers use `contents` below xl so their cards join the outer 2-col grid.
 */
export default function HomePage() {
  return (
    <>
      <TopBar crumbs={["Dashboard"]} />
      <div className="mx-auto w-full max-w-[1684px] px-4 pb-8 pt-4 lg:px-8">
        <OverviewHeader />

        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-12">
            <div className="contents xl:col-span-5 xl:flex xl:flex-col xl:gap-3">
              <div className="col-span-2 flex md:col-span-1 xl:block">
                <SourcedCard />
              </div>
              <div className="col-span-2 flex md:col-span-1 xl:flex xl:flex-1">
                <ActivityChart />
              </div>
            </div>

            <div className="contents xl:col-span-7 xl:grid xl:grid-cols-2 xl:grid-rows-[auto_auto_1fr] xl:gap-3">
              <MetricCard icon={UserCheck} label="Shortlisted" value="126" delta={8.2} suffix="vs last month" />
              <MetricCard icon={Mail} label="Emails sent" value="84" delta={-5.3} suffix="vs last month" />
              <div className="col-span-2 grid md:col-span-1">
                <MetricCard icon={MailOpen} label="Reply rate" value="18%" delta={12.2} suffix="vs last month">
                  <ReplyBreakdown />
                </MetricCard>
              </div>
              <div className="col-span-2 grid md:col-span-1">
                <TopMatchesCard />
              </div>
              <div className="col-span-2 grid md:col-span-1 xl:col-span-2">
                <OpenRolesCard />
              </div>
            </div>

            <div className="col-span-2 grid md:col-span-1 xl:col-span-12">
              <ShortlistList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
