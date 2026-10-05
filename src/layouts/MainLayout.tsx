import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { SelectTests } from "../pages/tests/components/selectedTest";
import { useEffect, useState } from "react";
import type { TestResult } from "../types/test.type";
import { executionService } from "../services/execution.service";
import { buildResultsMap, loadPlaywrightResults } from "../utils/ReadReport";
import { getApiEvents } from "../utils/Utils";
import { useExecutionStore } from "../store/executionStore";
import { useNavStore } from "../store/navStore";

export default function MainLayout() {
  const navigate = useNavigate();

  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);
  const setOpenNav = useNavStore((state) => state.setOpenNav);

  const testsStore = useExecutionStore((state) => state.testsStore);
  const isFinishedStore = useExecutionStore((state) => state.isFinishedStore);
  const isLoadingStore = useExecutionStore((state) => state.isLoadingStore);
  const totalTestsStore = useExecutionStore((state) => state.totalTestsStore);
  const spiraTestCases = useExecutionStore((state) => state.spiraTestCases);

  const setLoadingExecutions = useExecutionStore(
    (state) => state.setLoadingExecutions,
  );
  const setFinishedExecutions = useExecutionStore(
    (state) => state.setFinishedExecutions,
  );
  const setProgressExecutions = useExecutionStore(
    (state) => state.setProgressExecutions,
  );
  const setDurationExecutions = useExecutionStore(
    (state) => state.setDurationExecutions,
  );
  const setTotalExecutions = useExecutionStore(
    (state) => state.setTotalExecutions,
  );
  const setTestExecutions = useExecutionStore(
    (state) => state.setTestExecutions,
  );
  const setSummaryExecutions = useExecutionStore(
    (state) => state.setSummaryExecutions,
  );
  const setResultTestExecutions = useExecutionStore(
    (state) => state.setResultTestExecutions,
  );

  const [tests, setTests] = useState<TestResult[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [selectedScriptKeys, setSelectedScriptKeys] = useState<string[]>([]);

  useEffect(() => {
    const source = new EventSource(`${getApiEvents()}/live`);

    source.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "execution-started") {
        setTests([]);
        setTestExecutions([]);
        setFinishedExecutions(false);
        setLoadingExecutions(true);
      }

      if (msg.totalTest) {
        setTotalExecutions(msg.totalTest);
      }

      if (msg.type === "test-started" || msg.type === "test-finished") {
        setTests((prev) => {
          const copy = [...prev];
          const index = copy.findIndex((t) => t.id === msg.id);

          if (index >= 0) {
            copy[index] = {
              ...copy[index],
              ...msg,
            };
          } else {
            copy.push(msg);
          }
          return copy;
        });
      }

      switch (msg.type) {
        case "execution-finished":
          if (msg.result) {
            setSummaryExecutions(msg.result);
          }
          setFinishedExecutions(true);
          setLoadingExecutions(false);
          break;

        case "summary":
          setSummaryExecutions(msg);
          break;

        case "finished":
          break;
      }
    };

    return () => source.close();
  }, []);

  const changeProgress = (currentTests: TestResult[]) => {
    if (!totalTestsStore) {
      setProgressExecutions(0);
      return;
    }

    const completed = currentTests.filter(
      (t) =>
        t.status === "passed" ||
        t.status === "failed" ||
        t.status === "skipped",
    ).length;
    const progressPercentage = Math.round((completed / totalTestsStore) * 100);
    setProgressExecutions(progressPercentage);
  };

  const readResults = async (tests: TestResult[]) => {
    const report = await loadPlaywrightResults();
    const selectedCaseIds = spiraTestCases.map((testCase) => testCase.id);
    const resultsMap = buildResultsMap(report, tests, selectedCaseIds);

    setResultTestExecutions(resultsMap);
    if (selectedCaseIds.length > 0) {
      const results = Object.values(resultsMap).flat();
      setTestExecutions(results);
      setTotalExecutions(results.length);
      setDurationExecutions(
        results.reduce((total, result) => total + (result.duration ?? 0), 0),
      );
    }
  };

  const runTests = async () => {
    setTests([]);
    navigate("/tests");

    try {
      await executionService.run({
        selectedPaths,
        selectedScriptKeys,
      });
    } catch (err) {
      setLoadingExecutions(false);
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (tests.length > 0) {
      setTestExecutions(tests);
      const durationTest = tests.reduce((acc, t) => acc + (t.duration ?? 0), 0);
      setDurationExecutions(durationTest);
      changeProgress(tests);
    }
  }, [tests, setTestExecutions]);

  useEffect(() => {
    if (isFinishedStore) {
      readResults(testsStore).catch((error) =>
        console.error("Error al cargar el reporte:", error),
      );
      setOpenNav(false);
    }
  }, [isFinishedStore, spiraTestCases]);

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
