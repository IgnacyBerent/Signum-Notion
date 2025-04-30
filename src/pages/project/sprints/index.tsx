import Layout from "@/components/layout";
import ColumnTitle from "@/features/project/components/column-title";
import { NewSprintRow } from "@/features/project/components/new-sprint-row";
import PageLabel from "@/features/project/components/page-label";
import RowSpirnts from "@/features/project/components/row-sprints";
import {
  BiRun,
  BiLoaderCircle,
  BiTable,
  BiCalendar,
  BiListUl,
  BiListCheck,
} from "react-icons/bi";

const sprints = [1, 2, 3, 4, 5];

const Sprints = () => {
  return (
    <Layout>
      <PageLabel icon={<BiRun className="w-13 h-13" />} label="Sprints" />
      <div className="flex">
        <div className="py-1 text-sm text-slate-200/60 font-semibold border-b-2 border-slate-200/60">
          <div className="flex pb-1 -mb-1 px-3 gap-2 items-center rounded-xs hover:bg-slate-800/50 cursor-pointer">
            <BiTable />
            All
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-t border-white/10">
            <tr className="divide-x divide-white/10">
              <ColumnTitle icon={<div>Aa</div>} title="Sprint Name" />
              <ColumnTitle
                icon={<BiLoaderCircle className="-ml-1" />}
                title="Status"
              />
              <ColumnTitle
                icon={<BiCalendar className="-mt-0.5" />}
                title="Dates"
              />
              <ColumnTitle
                icon={<BiListUl className="-ml-1 -mr-0.5 w-5 h-5" />}
                title="Total tasks"
              />
              <ColumnTitle
                icon={<BiListCheck className="-ml-1 -mr-0.5 -mt-0.5 w-6 h-6" />}
                title="Completed tasks"
              />
            </tr>
          </thead>
          <tbody>
            {sprints.map((sprint, index) => (
              <RowSpirnts
                key={index}
                name="Sprint 1"
                status="Current"
                dateS={new Date("2023-10-01")}
                dateE={new Date("2023-10-31")}
                totalTasks={11}
                completedTasks={5}
              />
            ))}
            <NewSprintRow />
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Sprints;
