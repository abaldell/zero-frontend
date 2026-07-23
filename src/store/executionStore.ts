
import { create } from 'zustand';

interface ExecutionStore {
  executions: any[];

  setExecutions: (
    executions: any[],
  ) => void;

  addExecution: (
    execution: any,
  ) => void;
}

export const useExecutionStore = create<ExecutionStore>(set => ({
    executions: [],

    setExecutions: executions =>
      set({ executions }),

    addExecution: execution =>
      set(state => ({
        executions: [
          execution,
          ...state.executions,
        ],
    })),
}));
