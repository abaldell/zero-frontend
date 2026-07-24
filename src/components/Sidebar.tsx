import { FlaskConical, Home, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavStore } from "../store/navStore";

interface SidebarProps {
  open: boolean;
  openDrawer: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { open, openDrawer } = props;
  const [darkMode, setDarkMode] = useState(true);
  const setOpenDrawer = useNavStore((state) => state.setOpenDrawer);
  const setOpenNav = useNavStore((state) => state.setOpenNav);

  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

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
          <Link
            to="/"
            className="flex items-center gap-3 px-6 py-3 font-semibold tracking-widest hover:bg-slate-200 dark:hover:bg-gray-800"
          >
            <Home size={20} />
            {open && <span>Inicio</span>}
          </Link>
          <a
            className={`flex items-stretch gap-3 ${openDrawer ? "pl-2 dark:text-teal-500  text-teal-500" : "px-6 py-3"} h-12 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold tracking-widest`}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            {openDrawer && (
              <span className="w-1 bg-teal-500 ring-1 ring-inset ring-teal-500/20 rounded-md my-1.5"></span>
            )}
            <div className="flex flex-1 items-center w-full gap-3">
              <FlaskConical size={20} />
              {open && <span>Test</span>}
            </div>
          </a>
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
