import { useRef, useState } from "react";
import { Sprint, SprintStatus } from "../types";
import { CgArrowLongRight } from "react-icons/cg";
import SprintStatusDropdown from "./sprint-status-dropdown";
import { StatusBox } from "./status-box";

const initialValue: Sprint = {
  id: crypto.randomUUID(),
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  status: "Future",
  tasks: [],
};

const tdClass =
  "px-6 py-4 whitespace-nowrap text-sm font-medium text-white/60 border-b border-white/10 hover:bg-slate-800/50 cursor-pointer";

export function NewSprintRow() {
  const [newSprint, setNewSprint] = useState<Sprint>(initialValue);
  const [isClicked, setIsClicked] = useState(false);
  const dateInputRef1 = useRef<HTMLInputElement>(null);
  const dateInputRef2 = useRef<HTMLInputElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);

  if (!isClicked) {
    return (
      <tr
        className="hover:bg-slate-800/50 cursor-pointer"
        onClick={() => setIsClicked(true)}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white/40 border-b border-white/10">
          <div className="flex gap-2 items-center">
            <div className="text-2xl -mt-0.5">+</div>
            <div>New Sprint</div>
          </div>
        </td>
        <td className="border-b border-white/10" />
        <td className="border-b border-white/10" />
        <td className="border-b border-white/10" />
        <td className="border-b border-white/10" />
      </tr>
    );
  } else {
    return (
      <>
        <tr className="divide-x divide-white/10">
          <td className={tdClass}>
            {" "}
            <input
              type="text"
              value={newSprint.name}
              onChange={(e) =>
                setNewSprint({ ...newSprint, name: e.target.value })
              }
              className="bg-transparent text-white/90 outline-none"
            />
          </td>
          <td
            className={tdClass}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={cellRef}
          >
            <StatusBox status={newSprint.status} />
          </td>
          <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-white/60 border-b border-white/10">
            <div className="flex -gap-1 items-center max-w-80 overflow-x-hidden">
              <div
                onClick={() =>
                  dateInputRef1.current?.showPicker
                    ? dateInputRef1.current.showPicker()
                    : dateInputRef1.current?.click()
                }
                className="flex relative p-3 hover:bg-slate-800/50 cursor-pointer"
              >
                <input
                  ref={dateInputRef1}
                  type="date"
                  value={newSprint.startDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNewSprint({
                      ...newSprint,
                      startDate: new Date(e.target.value),
                    })
                  }
                  className="absolute inset-0 size-0"
                />
                <span className="flex items-center justify-start text-white/90 z-1">
                  {newSprint.startDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <CgArrowLongRight className="text-slate-300/50 size-4.5" />
              <div
                onClick={() =>
                  dateInputRef2.current?.showPicker
                    ? dateInputRef2.current.showPicker()
                    : dateInputRef2.current?.click()
                }
                className="flex relative p-3 hover:bg-slate-800/50 cursor-pointer"
              >
                <input
                  ref={dateInputRef2}
                  type="date"
                  value={newSprint.endDate.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setNewSprint({
                      ...newSprint,
                      endDate: new Date(e.target.value),
                    })
                  }
                  className="absolute inset-0 size-0"
                />
                <span className="flex items-center justify-start text-white/90 z-1">
                  {newSprint.endDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </td>
          <td className={tdClass}>0</td>
          <td className={tdClass}>-</td>
        </tr>
        {dropdownOpen && (
          <SprintStatusDropdown
            selectValue={(value: SprintStatus) => {
              setNewSprint({ ...newSprint, status: value });
              setDropdownOpen(false);
            }}
            tabRef={cellRef}
            open={dropdownOpen}
            setOpen={setDropdownOpen}
          />
        )}
      </>
    );
  }
}
