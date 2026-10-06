import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { SelectTests, useExecutionFlow } from "../../features/executions";
import { useEffect } from "react";
import { useExecutionStore } from "../../features/executions/state/executionStore";
import { useNavStore } from "../state/navigationStore";

export default function MainLayout() {
  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);
  const setOpenNav = useNavStore((state) => state.setOpenNav);
  const isFinishedStore = useExecutionStore((state) => state.isFinishedStore);
  const isLoadingStore = useExecutionStore((state) => state.isLoadingStore);
  const { setSelectedPaths, setSelectedScriptKeys, runTests } =
    useExecutionFlow();

  useEffect(() => {
    if (isFinishedStore) {
      setOpenNav(false);
    }
  }, [isFinishedStore, setOpenNav]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", openDrawer);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openDrawer]);

  return (
    <main className="flex h-screen bg-white text-black/70 dark:bg-slate-800 dark:text-slate-100">
      <Sidebar open={open} openDrawer={openDrawer} />
      {openDrawer && (
        <SelectTests
          onRun={() => runTests()}
          isLoading={isLoadingStore}
          onSelectPath={(path) => setSelectedPaths(path)}
          onSelectScript={(script) => setSelectedScriptKeys(script)}
        />
      )}
      <Outlet />
    </main>
  );
}
