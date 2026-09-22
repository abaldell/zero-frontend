
import { create } from 'zustand';
import type { TestResult } from '../types/test.type';
import type { TestRunSummary as Summary, PwExecution } from "../types/playwright";

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

  setTestExecutions: (testsExecutions: TestResult[]) => void;
  setLoadingExecutions:(loading:boolean) => void;
  setFinishedExecutions:(finished:boolean) => void;
  setProgressExecutions:(progress:number) => void;
  setDurationExecutions:(duration:number) => void;
  setTotalExecutions:(total:number) => void;
  setSummaryExecutions:(summary:Summary) => void;
  setResultTestExecutions:(tests:Record<string, TestResult[]>) => void
  setExecuteSpira: (executeSpira: PwExecution[]) => void;
  updateExecuteSpiraStep: (testCaseId: string, stepIndex: number, error: string) => void;
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
    set({ executeSpira }),

  updateExecuteSpiraStep:(testCaseId, stepIndex, result) =>
    set((state) => ({
      executeSpira: state.executeSpira.map((execution) =>
        execution.spiraTestCaseId !== testCaseId
          ? execution
          : {
              ...execution,
              steps: execution.steps.map((step, index) =>
                index === stepIndex ? { ...step, actualResult: result} : step,
              ),
            },
      ),
    })),

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
    }),
}));
