import { ProgressSpinner } from "@/components/ui/progress-spinner";
import { CgArrowLongRight } from "react-icons/cg";
import { SprintStatus } from "../types";
import { StatusBox } from "./status-box";

type Props = {
  name: string;
  status: SprintStatus;
  dateS: Date;
  dateE: Date;
  totalTasks: number;
  completedTasks: number;
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
        <StatusBox status={props.status} />
      </td>
      <td className={tdClass}>
        <div className="flex gap-2 items-center max-w-80 overflow-x-hidden">
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
