import TestRunSummary from "./components/TestRunSummary";
import { ReportTestList } from "./components/ReportTestList";
import { useExecutionStore } from "../../store/executionStore";
import { useNavStore } from "../../store/navStore";
import { UiProcessBar } from "../../components/ui";
import NavTests from "./components/NavTests";
import { useEffect, useState } from "react";
import { stripAnsi } from "../../utils/Utils";
import type { TestResult } from "../../types/test.type";
import type { PwExecution } from "../../types/playwright";
import { reportTestExecutions } from "../../services/spiratest.service";

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
  const executeSpira = useExecutionStore((state) => state.executeSpira);
  const spiraTestCases = useExecutionStore((state) => state.spiraTestCases);
  const totalTestsStore = useExecutionStore((state) => state.totalTestsStore);
  const summaryStore = useExecutionStore((state) => state.summaryStore);
  const durationStore = useExecutionStore((state) => state.durationStore);
  const progressStore = useExecutionStore((state) => state.progressStore);
  const [reportState, setReportState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [reportError, setReportError] = useState("");
  const hasTests =
    testsStore.length > 0 || Object.keys(resultTestStore).length > 0;

  const formatStepToSpira = (steps: TestResult[]) => {
    return steps.map((step) => {
      const error =
        typeof step.error === "string" ? step.error : step.error?.message || "";
      const resultStatus = step.status?.toLowerCase();
      const status =
        resultStatus === "failed" ||
        resultStatus === "blocked" ||
        resultStatus === "caution"
          ? resultStatus
          : resultStatus === "skipped"
            ? "blocked"
            : error
              ? "failed"
              : "passed";

      return {
        name: step.title,
        status,
        actualResult: stripAnsi(error),
        error: stripAnsi(error),
      };
    });
  };

  useEffect(() => {
    const executions: PwExecution[] = isExecution
      ? Object.values(resultTestStore).flatMap((tests) =>
          tests.flatMap((item) => {
            const testCaseId = item.title.match(/\[TC:(\d+)\]/i)?.[1];
            const matchingCase = spiraTestCases.find(
              (testCase) => String(testCase.id) === testCaseId,
            );
            if (!matchingCase) return [];

            return [
              {
                spiraTestCaseId: String(matchingCase.id),
                playwrightTestId: item.id,
                title: item.title,
                status:
                  item.status === "passed"
                    ? "passed"
                    : item.status === "skipped"
                      ? "blocked"
                      : "failed",
                duration: item.duration,
                steps: formatStepToSpira(item.steps),
              },
            ];
          }),
        )
      : [];

    setExecuteSpira(executions);
  }, [isExecution, resultTestStore, setExecuteSpira, spiraTestCases]);

  const reportExecutions = async () => {
    setReportState("loading");
    setReportError("");
    try {
      await reportTestExecutions(
        Number(import.meta.env.VITE_API_PROYECT),
        executeSpira,
      );
      setReportState("success");
    } catch (error) {
      setReportError(
        error instanceof Error
          ? error.message
          : "No se pudieron reportar las pruebas.",
      );
      setReportState("error");
    }
  };

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
        onReportTests={reportExecutions}
        reportState={reportState}
        reportError={reportError}
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
