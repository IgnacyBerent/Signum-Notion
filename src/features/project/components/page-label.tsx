import React from "react";

type Props = {
  icon: React.ReactNode;
  label: string;
};

const PageLabel = (props: Props) => {
  return (
    <div className="flex font-bold text-5xl text-slate-300/80 gap-4 mb-10">
      <div className="text-slate-400/80">{props.icon}</div>
      {props.label}
    </div>
  );
};

export default PageLabel;
