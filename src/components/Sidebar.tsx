import { FlaskConical, Home, Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarProps {
  open: boolean;
  openDrawer: boolean;
  setOpen: (open: boolean) => void;
  onOpenDrawer: (open: boolean) => void;
}

export const Sidebar = (props: SidebarProps) => {
  const { open, openDrawer, setOpen, onOpenDrawer } = props;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setDarkMode(localStorage.getItem("theme") === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <aside
      className={`bg-slate-100 dark:bg-slate-900 text-black/70 dark:text-white transition-all duration-300 z-20 flex flex-col ${
        open ? "w-1/6" : "w-20"
      }`}
    >
      <div
        className={`flex items-center ${open ? "justify-between" : "justify-center"} p-3 border-b border-gray-700`}
      >
        {open && <h1 className="text-xl font-bold">Zero</h1>}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-slate-200 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>
      <div
        className={`flex flex-1 flex-col ${!open && "items-center"} justify-between`}
      >
        <nav className="mt-4">
          <a className="flex items-center gap-3 px-6 py-3 font-semibold tracking-[0.1em] hover:bg-slate-200 dark:hover:bg-gray-800">
            <Home size={20} />
            {open && <span>Inicio</span>}
          </a>
          <a
            className={`flex items-center gap-3 px-6 py-3 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold tracking-[0.1em] ${openDrawer && "dark:text-teal-500  text-teal-500 bg-slate-200 dark:bg-gray-800"}`}
            onClick={() => onOpenDrawer(true)}
          >
            <FlaskConical size={20} />
            {open && <span>Test</span>}
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
