import { useUserAuth } from "@/context/userAuthContext";
import {
  ChevronDown,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FileSpreadsheet,
  Folder,
  LogOutIcon,
  PenBoxIcon,
  SquareCheckIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import { BiRun } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import SidebarItem from "./sidebarItem";

type Props = {
  toggleCollapse: () => void;
  collapsed: boolean;
};

const projectName = "Project name";

const Sidebar = (props: Props) => {
  const { id } = useParams();
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  return (
    <div className="mt-6 w-full flex flex-col items-center">
      {props.collapsed && (
        <div
          className="flex justify-between w-fit mb-7 items-center hover:bg-slate-400/20 rounded-sm cursor-pointer"
          onClick={props.toggleCollapse}
        >
          <ChevronsRightIcon className="text-slate-300/50 w-7.5 h-7.5 hover:text-slate-200" />
        </div>
      )}
      {!props.collapsed && (
        <div className="flex justify-between w-full mb-6 px-2 py-1 items-center  hover:bg-slate-400/20 rounded-sm cursor-pointer">
          <div className="flex gap-2 items-center">
            <div className="bg-slate-500/50 w-5 h-5 rounded-xs text-xs font-semibold text-slate-300/50 flex items-center justify-center">
              {projectName.charAt(0).toUpperCase()}
            </div>
            <>
              <div className="text-center max-h-6 overflow-clip align-middle text-slate-300 font-medium text-md">
                {projectName}
              </div>
              <ChevronDown className="text-slate-300/50 w-5 h-5" />
            </>
          </div>

          <div className="flex items-center gap-0">
            <div className="relative group">
              <div
                className="hover:bg-slate-400/20 rounded-sm "
                onClick={props.toggleCollapse}
              >
                <ChevronsLeftIcon className="text-slate-300/50 w-6 h-6 hover:text-slate-200" />
              </div>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                {props.collapsed ? "Expand sidebar" : "Collapse sidebar"}
              </span>
            </div>
            <div className="relative group">
              <div className="hover:bg-slate-400/20 rounded-sm p-0.5">
                <PenBoxIcon className="text-slate-300/50 w-5 h-5 hover:text-slate-200" />
              </div>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                Edit project
              </span>
            </div>
          </div>
        </div>
      )}

      <SidebarItem
        onClick={() => navigate("/projects")}
        icon={<Folder className="w-4 h-4" />}
        label="Projects"
        collapsed={props.collapsed}
      />
      <div className="h-3" />
      <SidebarItem
        onClick={() => navigate(`/project/${id}/sprints`)}
        icon={<BiRun className="w-5 h-5 -mr-0.5 -ml-0.5" />}
        label="Sprints"
        collapsed={props.collapsed}
      />
      <SidebarItem
        onClick={() => navigate(`/project/${id}/board`)}
        icon={<TargetIcon className="w-4 h-4" />}
        label="Board"
        collapsed={props.collapsed}
      />
      <SidebarItem
        onClick={() => navigate(`/project/${id}/backlog`)}
        icon={<FileSpreadsheet className="w-4 h-4" />}
        label="Backlog"
        collapsed={props.collapsed}
      />
      <SidebarItem
        onClick={() => navigate(`/project/${id}/tasks`)}
        icon={<SquareCheckIcon className="w-4 h-4" />}
        label="Tasks"
        collapsed={props.collapsed}
      />
      <SidebarItem
        onClick={() => navigate(`/project/${id}/team`)}
        icon={<UsersIcon className="w-4 h-4" />}
        label="Team"
        collapsed={props.collapsed}
      />
      <div className="h-3" />
      <SidebarItem
        onClick={logOut}
        icon={<LogOutIcon className="w-4 h-4" />}
        label="Logout"
        collapsed={props.collapsed}
      />
    </div>
  );
};

export default Sidebar;
