import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  // Update localStorage whenever 'collapsed' changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex bg-slate-900 max-h-screen overflow-auto">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen border-r border-slate-200/10 bg-slate-800/50 transition-all duration-500 ${
          collapsed ? "w-12" : "w-60"
        }`}
      >
        <div className="p-2">
          <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
        </div>
      </aside>
      <div
        className={`flex-1 2xl:px-30 xl:px-15 pt-15 mb-10 overflow-visible transition-all duration-500 ${
          collapsed ? "ml-10" : "ml-60"
        } h-screen`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
