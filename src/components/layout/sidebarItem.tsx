import React from "react";

type SidebarItemProps = {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  onClick,
  icon,
  label,
  collapsed,
}) => {
  const itemClass = `relative group flex ${
    collapsed ? "py-2 w-fit" : "py-1 w-full"
  } gap-2 px-2 text-slate-300/50 mb-2 items-center hover:text-slate-200 hover:bg-slate-400/20 rounded-sm cursor-pointer`;

  return (
    <div className={itemClass} onClick={onClick}>
      {icon}
      {collapsed ? (
        <span className="absolute left-full ml-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
          {label}
        </span>
      ) : (
        label
      )}
    </div>
  );
};

export default SidebarItem;
