import { FlaskConical, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavStore } from "../store/navStore";
import { UiNav } from "./ui";

interface SidebarProps {
  open: boolean;
  openDrawer: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { open, openDrawer } = props;
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const setOpenDrawer = useNavStore((state) => state.setOpenDrawer);
  const setOpenNav = useNavStore((state) => state.setOpenNav);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <aside
      className={`bg-slate-100 dark:bg-slate-900 text-black/70 dark:text-white transition-transform duration-300 z-20 flex flex-col ${
        open ? "w-1/6" : "w-20"
      }`}
    >
      <div
        className={`flex items-center ${open ? "justify-between" : "justify-center"} p-3 border-b border-black/10 `}
      >
        {open && <h1 className="text-xl font-bold">Zero</h1>}

        <button
          onClick={() => setOpenNav(!open)}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>
      <div
        className={`flex flex-1 flex-col ${!open && "items-center"} justify-between border-r border-black/10`}
      >
        <nav className="mt-4">
          <button
            className={`flex w-full items-stretch gap-3 h-12 font-semibold tracking-widest`}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <div className="flex items-center w-full gap-3 p-6  bg-teal-500 hover:bg-teal-600 text-white rounded-md ">
              <FlaskConical size={20} />
              {open && <span>Ejecutar Tests</span>}
            </div>
          </button>
          <UiNav isOpen={open} />
        </nav>
        <nav className="p-3 flex items-center gap-3 ">
          <button
            className="p-2 rounded hover:bg-slate-200 dark:hover:bg-gray-800"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
    </aside>
  );
};
