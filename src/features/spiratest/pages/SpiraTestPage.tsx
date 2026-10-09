import { useEffect, useState } from "react";
import { getAllTestTree } from "../services/spiratest.service";
import { TestSet } from "../components/TestSet";
import type { SpiraTestSet } from "../types/spiratest.types";
import { useNavStore } from "../../../app/state/navigationStore";
import { SidebarProjectId } from "../components/SidebarProjectId";
import { DetailsTestSet } from "../components/detailsTestSet/DetailsTestSet";
import { Spinner } from "flowbite-react";
import NavSpiratest from "../components/NavSpiratest";
import { executionService } from "../../executions/services/execution.service";
import { useNavigate } from "react-router-dom";
import { useExecutionStore } from "../../executions/state/executionStore";
import type { TestPW } from "../../executions/types/playwright";

export default function SpiraTestPage() {
  const navigate = useNavigate();

  const [testSets, setTestSets] = useState<SpiraTestSet[]>([]);
  const [testSetId, setTestSetId] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [spiraTestCases, setSpiraTestCases] = useState<TestPW[]>([]);

  const open = useNavStore((state) => state.open);
  const openDrawer = useNavStore((state) => state.openDrawer);
  const reset = useExecutionStore((state) => state.reset);

  const setLoadingExecutions = useExecutionStore(
    (state) => state.setLoadingExecutions,
  );
  const setTestExecutions = useExecutionStore(
    (state) => state.setTestExecutions,
  );
  const setSelectedSpiraTestCases = useExecutionStore(
    (state) => state.setSpiraTestCases,
  );
  const setSelectedTestSetId = useExecutionStore(
    (state) => state.setSelectedTestSetId,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpiraTestCases([]);
    setSelectedPaths([]);
  }, [testSetId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllTestTree(import.meta.env.VITE_API_PROYECT);
        setTestSets(data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const runTests = async () => {
    reset();
    setTestExecutions([]);
    setSelectedSpiraTestCases(spiraTestCases);
    setSelectedTestSetId(testSetId);
    navigate("/tests/execution");

    try {
      await executionService.run({
        selectedPaths,
        spiraTestCases,
      });
    } catch (err) {
      setLoadingExecutions(false);
      console.log("Error: ", err);
    }
  };

  return (
    <div
      className={`flex  flex-col ${open ? "w-5/6" : "w-[95%]"} ${openDrawer ? "absolute top-0 right-0" : "relative"} transition-transform duration-300`}
    >
      <NavSpiratest
        isFinished={true}
        onRunTests={runTests}
        showButton={spiraTestCases.length > 0}
      />
      <div
        className={`flex gap-3 p-3 transition-transform duration-300 ${loading ? "items-center justify-center" : "items-stretch"} h-[calc(100vh-3.5rem)]`}
      >
        {loading ? (
          <Spinner
            color="info"
            aria-label="Extra large Info spinner"
            size="xl"
          />
        ) : (
          <>
            <div
              className={`${testSetId ? "w-1/4" : "hidden"} overflow-y-auto transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 rounded-md`}
            >
              <SidebarProjectId
                testSets={testSets}
                testSelected={testSetId}
                onSetOpen={setTestSetId}
              />
            </div>

            <div
              className={`${testSetId ? "flex justify-center w-3/4 items-center" : "w-full"} custom-scroll overflow-x-hidden overflow-y-auto dark:scrollbar-thumb-teal-500 dark:scrollbar-track-slate-900 transition-transform duration-300 bg-slate-100 dark:bg-slate-900 p-3 pt-0 rounded-md`}
            >
              {testSetId ? (
                <DetailsTestSet
                  testSelected={testSetId}
                  onSelectTestCase={setSpiraTestCases}
                  onSelectPaths={setSelectedPaths}
                />
              ) : (
                <TestSet data={testSets} onSetId={setTestSetId} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
