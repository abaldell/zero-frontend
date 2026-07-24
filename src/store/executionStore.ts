
import { create } from 'zustand';
import type { TestResult } from '../types/test.type';
import type { TestRunSummary as Summary } from "../types/playwright";

interface ExecutionStore {
  isFinishedStore: boolean,
  isLoadingStore: boolean,
  totalTestsStore: number,
  summaryStore: Summary,
  durationStore: number,
  progressStore: number,
  testsStore: TestResult[],
  resultTestStore: TestResult[]

  setTestExecutions: (testsExecutions: TestResult[]) => void;
  setLoadingExecutions:(loading:boolean) => void;
  setFinishedExecutions:(finished:boolean) => void;
  setProgressExecutions:(progress:number) => void;
  setDurationExecutions:(duration:number) => void;
  setTotalExecutions:(total:number) => void;
  setSummaryExecutions:(summary:Summary) => void;
  setResultTestExecutions:(tests:TestResult[]) => void
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
  resultTestStore: [],

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

  reset: () =>
    set({
      isFinishedStore: false,
      isLoadingStore: false,
      totalTestsStore: 0,
      summaryStore: {} as Summary,
      durationStore: 0,
      progressStore: 0,
      testsStore: [],
      resultTestStore: [],
    }),
}));
