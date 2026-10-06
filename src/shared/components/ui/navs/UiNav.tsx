import { Home, TestTubes } from "lucide-react";
import { NavLink } from "react-router-dom";

interface UiNavProps {
  isOpen: boolean;
}
export const UiNav = (props: UiNavProps) => {
  const { isOpen } = props;
  const links = [
    { name: "Dashboard", path: "/", icon: "home" },
    { name: "Conjunto de tests", path: "/testset", icon: "tests" },
  ];

  return (
    <aside>
      <nav className="py-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 font-semibold tracking-widest hover:rounded-md hover:bg-slate-200 dark:hover:bg-gray-800 ${isActive ? "text-teal-500 border-l-teal-500 border-l-4" : ""} py-3 transition-normal duration-100`
            }
          >
            {link.icon === "home" ? (
              <Home size={20} />
            ) : (
              <TestTubes size={20} />
            )}
            {isOpen && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
