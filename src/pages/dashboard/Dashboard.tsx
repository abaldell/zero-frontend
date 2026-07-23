import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { TestRunSummary as Summary } from "../../types/playwright";
import { SelectTests } from "./components/selectedTest";
import { Sidebar } from "../../components/Sidebar";
import TestRunSummary from "./components/TestRunSummary";
import { ReportTestList } from "./components/ReportTestList";
import { ProcessBar } from "../../components/ProcessBar";
import { buildResultsMap, loadPlaywrightResults } from "../../utils/ReadReport";
import type { TestResult } from "../../types/test.type";
import { executionService } from "../../services/execution.service";
import { getApiEvents } from "../../utils/Utils";

export default function DashboardPage() {
  const [finished, setFinished] = useState(false);
  const [open, setOpen] = useState(true);
  const [summary, setSummary] = useState<Summary | undefined>(undefined);
  const [runOutput, setRunOutput] = useState<string[] | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [selectedScriptKeys, setSelectedScriptKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [resultTest, setResultTest] = useState<TestResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [totalTests, setTotalTests] = useState<number>(0);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const source = new EventSource(`${getApiEvents()}/live`);

    source.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.totalTest) {
        setTotalTests(msg.totalTest);
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
        case "execution-started":
          setIsLoading(true);
          break;

        case "execution-finished":
          setFinished(true);
          setIsLoading(false);
          break;

        case "log":
        case "error":
        case "info":
          setRunOutput((prev) => [...(prev ?? []), msg.message]);
          break;

        case "summary":
          setSummary(msg);
          break;

        case "finished":
          setFinished(true);
          setIsLoading(false);
          break;
      }
    };

    return () => source.close();
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      const durationTest = tests.reduce((acc, t) => acc + (t.duration ?? 0), 0);
      setDuration(durationTest);
      changeProgress();
    }
  }, [tests]);

  useEffect(() => {
    if (finished) {
      readResults(tests);
      setOpen(false);
    }
  }, [finished]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", openDrawer);
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openDrawer]);

  console.log("resultTest", resultTest);

  const runTests = async () => {
    setTests([]);
    setResultTest([]);
    setProgress(0);
    setError(null);
    setIsLoading(true);
    setFinished(false);
    setSummary(undefined);
    setRunOutput(null);

    try {
      await executionService.run({
        selectedPaths,
        selectedScriptKeys,
      });
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const changeProgress = () => {
    if (!totalTests) {
      setProgress(0);
      return;
    }

    const completed = tests.filter(
      (t) => t.status === "passed" || t.status === "failed",
    ).length;
    const progressPercentage = Math.round((completed / totalTests) * 100);
    setProgress(progressPercentage);
  };

  const readResults = async (tests: TestResult[]) => {
    const report = await loadPlaywrightResults();
    const resultsMap = buildResultsMap(report, tests);
    setResultTest(resultsMap);
  };

  return (
    <main className="flex min-h-screen bg-white text-black/70 dark:bg-slate-800 dark:text-slate-100">
      <Sidebar
        open={open}
        openDrawer={openDrawer || finished}
        setOpen={setOpen}
        onOpenDrawer={(val) => setOpenDrawer(val)}
      />
      {openDrawer && (
        <SelectTests
          onOpenDrawer={setOpenDrawer}
          onRun={() => runTests()}
          onError={(err) => setError(err)}
          isLoading={isLoading}
          onSelectPath={(path) => setSelectedPaths(path)}
          onSelectScript={(script) => setSelectedScriptKeys(script)}
        />
      )}
      <div
        className={`flex flex-col ${open ? "w-5/6" : "w-[95%]"} ${openDrawer ? "absolute top-0 right-0" : "relative"} transition-all duration-300`}
      >
        {error ? (
          <div className="rounded-3xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="w-full dark:bg-slate-900 bg-slate-100 p-3 h-[9%] transition-all duration-300">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles size={22} className="text-sky-400" />
              <h2 className="text-xl font-semibold text-white">
                Reporte visual
              </h2>
            </div>
            {(isLoading || finished) && (
              <div className="flex gap-3">
                <span className="rounded-md bg-slate-800/90 px-4 py-2 text-sm text-slate-300">
                  {tests.length}/{totalTests} tests
                </span>
                <span
                  className={`text-sm font-medium rounded-md px-4 py-2 ${finished ? "bg-green-400 text-green-800" : "bg-teal-500 text-teal-800"}`}
                >
                  {finished ? "Finalizado" : "Ejecutando..."}
                </span>
              </div>
            )}
          </div>
        </div>
        <section className="shadow-panel overflow-x-hidden h-[91vh]">
          <div className="p-3">
            {finished && summary && (
              <TestRunSummary summary={summary} durationTotal={duration} />
            )}

            {!finished && tests.length > 0 && progress >= 0 && (
              <ProcessBar progress={progress} message={"Ejecutando tests..."} />
            )}

            {!finished && tests.length > 0 && <ReportTestList items={tests} />}

            {finished && resultTest.length > 0 && (
              <ReportTestList items={resultTest} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
