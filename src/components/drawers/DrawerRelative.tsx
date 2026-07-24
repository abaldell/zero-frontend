import React from "react";
import { X } from "lucide-react";
import { useNavStore } from "../../store/navStore";

interface DrawerRelativeProps {
  children: React.ReactNode;
}

export const DrawerRelative = (props: DrawerRelativeProps) => {
  const { children } = props;
  const setOpenDrawer = useNavStore((state) => state.setOpenDrawer);

  return (
    <div className="min-w-2.5 bg-slate-100 border-slate-300 dark:bg-slate-900 border-l dark:border-slate-700 z-20 p-3 transform duration-500 ease-in-out transition-all">
      <button
        type="button"
        onClick={() => setOpenDrawer(false)}
        className="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        <span className="absolute -inset-2.5" />
        <span className="sr-only">Close panel</span>
        <X size={24} />
      </button>
      <div className="flex flex-col gap-3 h-[92vh] ">{children}</div>
    </div>
  );
};
