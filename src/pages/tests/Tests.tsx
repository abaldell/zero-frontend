import TestRunSummary from "./components/TestRunSummary";
import { ReportTestList } from "./components/ReportTestList";
import { useExecutionStore } from "../../store/executionStore";
import { useNavStore } from "../../store/navStore";
import { UiNavHorizontal, UiProcessBar } from "../../components/ui";

export default function TestsPage() {
  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);

  const testsStore = useExecutionStore((state) => state.testsStore);
  const isFinishedStore = useExecutionStore((state) => state.isFinishedStore);
  const isLoadingStore = useExecutionStore((state) => state.isLoadingStore);
  const resultTestStore = useExecutionStore((state) => state.resultTestStore);
  const totalTestsStore = useExecutionStore((state) => state.totalTestsStore);
  const summaryStore = useExecutionStore((state) => state.summaryStore);
  const durationStore = useExecutionStore((state) => state.durationStore);
  const progressStore = useExecutionStore((state) => state.progressStore);

  return (
    <div
      className={`flex flex-col ${open ? "w-5/6" : "w-[95%]"} ${openDrawer ? "absolute top-0 right-0" : "relative"} transition-all duration-300`}
    >
      <UiNavHorizontal
        isFinished={isFinishedStore}
        isLoading={isLoadingStore}
        totalTests={totalTestsStore}
        numTest={testsStore.length}
      />

      <section className="shadow-panel overflow-x-hidden h-[91vh]">
        <div className="p-3">
          {isFinishedStore && summaryStore && (
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

          {!isFinishedStore && testsStore.length > 0 && (
            <ReportTestList items={testsStore} />
          )}

          {isFinishedStore && resultTestStore.length > 0 && (
            <ReportTestList items={resultTestStore} />
          )}
        </div>
      </section>
    </div>
  );
}
