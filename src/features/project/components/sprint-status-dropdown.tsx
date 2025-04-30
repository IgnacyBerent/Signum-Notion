import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StatusBox } from "./status-box";
import { SprintStatus } from "../types";

type Props = {
  selectValue: (value: SprintStatus) => void;
  tabRef: React.RefObject<HTMLTableCellElement | null>;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SprintStatusDropdown(props: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Set dropdown position based on button position
  useEffect(() => {
    if (props.open && props.tabRef!.current) {
      const rect = props.tabRef!.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [props.open, props.tabRef]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !props.tabRef!.current?.contains(e.target as Node)
      ) {
        props.setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [props]);

  // remove scrollbar from body when dropdown is open
  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [props.open]);

  return createPortal(
    <div
      ref={dropdownRef}
      className="flex absolute flex-col -mt-3.5 px-2 py-1 bg-slate-950 rounded-md shadow-lg z-[9999]"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <span className="mb-3 text-sm font-medium text-slate-200/80">
        Select Status:
      </span>
      <div className="flex">
        {["Current", "Completed", "Next", "Future"].map((status) => (
          <div
            key={status}
            onClick={() => {
              props.selectValue(status as SprintStatus);
              props.setOpen(false);
            }}
            className="flex py-1 px-2 items-center rounded-md hover:bg-slate-800/50 cursor-pointer"
          >
            <StatusBox status={status as SprintStatus} />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}
