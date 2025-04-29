import { ProgressSpinner } from "@/components/ui/progress-spinner";
import { CgArrowLongRight } from "react-icons/cg";
import { SprintStatus } from "../types";

type Props = {
  name: string;
  status: SprintStatus;
  dateS: Date;
  dateE: Date;
  totalTasks: number;
  completedTasks: number;
};

const statusColor = (status: SprintStatus) => {
  switch (status) {
    case "Future":
      return "bg-gray-500/40";
    case "Current":
      return "bg-blue-500/40";
    case "Completed":
      return "bg-green-500/40";
    case "Next":
      return "bg-purple-500/40";
  }
};

const RowSpirnts = (props: Props) => {
  const tdClass =
    "px-6 py-4 whitespace-nowrap text-sm font-medium text-white/60 border-b border-white/10";
  return (
    <tr className="hover:bg-slate-800/50 cursor-pointer divide-x divide-white/10">
      <td className={tdClass}>
        <div className="max-w-40">{props.name}</div>
      </td>
      <td className={tdClass}>
        <div
          className={`flex -ml-1 max-w-35 ${statusColor(
            props.status
          )}  gap-2 items-center px-2 py-0.5 rounded-xl`}
        >
          <div className={`${statusColor(props.status)} size-2 rounded-full`} />
          {props.status}
        </div>
      </td>
      <td className={tdClass}>
        <div className="flex gap-2 items-center max-w-60 overflow-x-hidden">
          {props.dateS.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}{" "}
          <CgArrowLongRight className="text-slate-300/50 size-4.5" />
          {props.dateE.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </div>
      </td>
      <td className={tdClass}>
        <div className="max-w-25">{props.totalTasks}</div>
      </td>
      <td className={tdClass}>
        <div className="flex gap-3 items-center mr-40">
          {((props.completedTasks / props.totalTasks) * 100).toFixed(2)} %
          <ProgressSpinner
            progress={(props.completedTasks / props.totalTasks) * 100}
            radius={10}
          />
        </div>
      </td>
    </tr>
  );
};

export default RowSpirnts;
