import TestRunSummary from "./components/TestRunSummary";
import { ReportTestList } from "./components/ReportTestList";
import { useExecutionStore } from "../../store/executionStore";
import { useNavStore } from "../../store/navStore";
import { UiProcessBar } from "../../components/ui";
import NavTests from "./components/NavTests";
import { useEffect } from "react";
import { stripAnsi } from "../../utils/Utils";
import type { TestResult } from "../../types/test.type";
import type { PwExecution } from "../../types/playwright";

interface TestsPageProps {
  isExecution?: boolean;
}
export default function TestsPage(props: TestsPageProps) {
  const { isExecution = false } = props;

  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);

  const testsStore = useExecutionStore((state) => state.testsStore);
  const isFinishedStore = useExecutionStore((state) => state.isFinishedStore);
  const isLoadingStore = useExecutionStore((state) => state.isLoadingStore);
  const resultTestStore = useExecutionStore((state) => state.resultTestStore);
  const setExecuteSpira = useExecutionStore((state) => state.setExecuteSpira);
  const totalTestsStore = useExecutionStore((state) => state.totalTestsStore);
  const summaryStore = useExecutionStore((state) => state.summaryStore);
  const durationStore = useExecutionStore((state) => state.durationStore);
  const progressStore = useExecutionStore((state) => state.progressStore);
  const hasTests =
    testsStore.length > 0 || Object.keys(resultTestStore).length > 0;

  const formatStepToSpira = (steps: TestResult[]) => {
    const newSteps = steps.map((step) => {
      return {
        name: step.title,
        status: step.error ? "failed" : "passed",
        actualResult: "",
        error: stripAnsi(step.error?.message || ""),
      };
    });
    return newSteps;
  };

  useEffect(() => {
    const executions: PwExecution[] = isExecution
      ? Object.values(resultTestStore).flatMap((tests) =>
          tests.map((item) => ({
            spiraTestCaseId: item.id,
            title: item.title,
            status: item.error ? "failed" : "passed",
            duration: item.duration,
            steps: formatStepToSpira(item.steps),
          })),
        )
      : [];

    setExecuteSpira(executions);
  }, [isExecution, resultTestStore, setExecuteSpira]);

  return (
    <div
      className={`flex flex-col ${open ? "w-5/6" : "w-[95%]"} ${openDrawer ? "absolute top-0 right-0" : "relative"} transition-transform duration-300`}
    >
      <NavTests
        isFinished={isFinishedStore}
        isLoading={isLoadingStore}
        totalTests={totalTestsStore}
        numTest={testsStore.length}
        isExecution={isExecution}
      />

      <section className="shadow-panel overflow-x-hidden h-[91vh] dark:scrollbar-thumb-teal-500 dark:scrollbar-track-slate-900">
        <div className="p-3">
          {isFinishedStore &&
            summaryStore &&
            summaryStore.total !== undefined && (
              <TestRunSummary
                summary={summaryStore}
                durationTotal={durationStore}
              />
            )}

          {!isFinishedStore && testsStore.length > 0 && progressStore >= 0 && (
            <UiProcessBar
              progress={progressStore}
              message={"Ejecutando tests..."}
            />
          )}

          {hasTests && (
            <ReportTestList items={testsStore} itemsResult={resultTestStore} />
          )}
        </div>
      </section>
    </div>
  );
}
