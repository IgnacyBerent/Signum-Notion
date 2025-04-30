import { SprintStatus } from "../types";

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

type Props = {
  status: SprintStatus;
};

export const StatusBox = (props: Props) => {
  return (
    <div
      className={`flex -ml-1 max-w-35 ${statusColor(
        props.status
      )}  gap-2 items-center px-2 py-0.5 rounded-xl`}
    >
      <div className={`${statusColor(props.status)} size-2 rounded-full`} />
      {props.status}
    </div>
  );
};
