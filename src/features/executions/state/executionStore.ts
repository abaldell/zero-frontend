
import { create } from 'zustand';
import type { TestResult } from '../types/test.type';
import type { TestRunSummary as Summary, PwExecution, PwStep, TestPW } from "../types/playwright";

interface ExecutionStore {
  isFinishedStore: boolean,
  isLoadingStore: boolean,
  totalTestsStore: number,
  summaryStore: Summary,
  durationStore: number,
  progressStore: number,
  testsStore: TestResult[],
  resultTestStore: Record<string, TestResult[]>
  executeSpira: PwExecution[];
  spiraTestCases: TestPW[];
  selectedTestSetId: number | null;

  setTestExecutions: (testsExecutions: TestResult[]) => void;
  setLoadingExecutions:(loading:boolean) => void;
  setFinishedExecutions:(finished:boolean) => void;
  setProgressExecutions:(progress:number) => void;
  setDurationExecutions:(duration:number) => void;
  setTotalExecutions:(total:number) => void;
  setSummaryExecutions:(summary:Summary) => void;
  setResultTestExecutions:(tests:Record<string, TestResult[]>) => void
  setExecuteSpira: (executeSpira: PwExecution[] | ((prev: PwExecution[]) => PwExecution[])) => void;
  setSpiraTestCases: (testCases: TestPW[]) => void;
  setSelectedTestSetId: (testSetId: number | null) => void;
  beginExecution: () => void;
  updateExecuteSpiraStep: (testCaseId: string, stepIndex: number, error: string) => void;
  updateExecuteSpiraStepImage: (testCaseId: string, stepIndex: number, image: PwStep["image"]) => void;
  updateExecuteSpiraStatusStep: (testCaseId: string, stepIndex: number, status: string) => void;
  reset: ()=> void;
}

export const useExecutionStore = create<ExecutionStore>(set => ({

  isFinishedStore: false,
  isLoadingStore: false,
  totalTestsStore: 0,
  summaryStore: {} as Summary,
  durationStore: 0,
  progressStore: 0,
  testsStore: [],
  resultTestStore: {},
  executeSpira: [],
  spiraTestCases: [],
  selectedTestSetId: null,

  setTestExecutions:(execution) => 
    set({testsStore:execution}),

  setLoadingExecutions:(loading) => 
    set({isLoadingStore:loading}),

  setFinishedExecutions:(finished) => 
    set({isFinishedStore:finished}),

  setProgressExecutions:(progress) => 
    set({progressStore:progress}),

  setDurationExecutions:(duration) => 
    set({durationStore:duration}),

   setTotalExecutions:(total) => 
    set({totalTestsStore:total}),

   setSummaryExecutions:(summary) => 
    set({summaryStore: summary}),

   setResultTestExecutions:(tests) => 
    set({resultTestStore: tests}),

  setExecuteSpira:(executeSpira) =>
    set((state) => ({
      executeSpira:
        typeof executeSpira === "function"
          ? executeSpira(state.executeSpira)
          : executeSpira,
    })),

  setSpiraTestCases:(spiraTestCases) =>
    set({ spiraTestCases }),

  setSelectedTestSetId:(selectedTestSetId) =>
    set({ selectedTestSetId }),

  beginExecution: () =>
    set({
      isFinishedStore: false,
      isLoadingStore: true,
      totalTestsStore: 0,
      summaryStore: {} as Summary,
      durationStore: 0,
      progressStore: 0,
      testsStore: [],
      resultTestStore: {},
      executeSpira: [],
    }),

  updateExecuteSpiraStep:(testCaseId, stepIndex, result) =>
    set((state) => {
      const execution = state.executeSpira.find(
        (item) => item.spiraTestCaseId === testCaseId,
      );
      if (!execution || execution.steps[stepIndex]?.actualResult === result) {
        return state;
      }

      return {
        executeSpira: state.executeSpira.map((item) =>
          item.spiraTestCaseId !== testCaseId
            ? item
            : {
                ...item,
                steps: item.steps.map((step, index) =>
                  index === stepIndex ? { ...step, actualResult: result } : step,
                ),
              },
        ),
      };
    }),

  updateExecuteSpiraStepImage:(testCaseId, stepIndex, image) =>
    set((state) => ({
      executeSpira: state.executeSpira.map((execution) =>
        execution.spiraTestCaseId !== testCaseId
          ? execution
          : {
              ...execution,
              steps: execution.steps.map((step, index) =>
                index === stepIndex ? { ...step, image} : step,
              ),
            },
      ),
    })
  ),

  updateExecuteSpiraStatusStep:(testCaseId, stepIndex, status) =>
    set((state) => ({
      executeSpira: state.executeSpira.map((execution) =>
        execution.spiraTestCaseId !== testCaseId
          ? execution
          : {
              ...execution,
              steps: execution.steps.map((step, index) =>
                index === stepIndex ? { ...step, status: status} : step,
              ),
            },
      ),
    })
  ),

  reset: () =>
    set({
      isFinishedStore: false,
      isLoadingStore: false,
      totalTestsStore: 0,
      summaryStore: {} as Summary,
      durationStore: 0,
      progressStore: 0,
      testsStore: [],
      resultTestStore: {},
      executeSpira: [],
      spiraTestCases: [],
      selectedTestSetId: null,
    }),
}));
