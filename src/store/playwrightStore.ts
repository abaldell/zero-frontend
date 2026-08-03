import { create } from 'zustand';

interface TestPlaywright {
  id: number;
}

interface NavStore {
  testsExistsPW: TestPlaywright[];
  setTestsExistsPW: (testId: number) => void;
}

export const usePlaywrightStore = create<NavStore>((set) => ({
  testsExistsPW: [],

  setTestsExistsPW: (testId) =>
    set((state) => ({
      testsExistsPW: [
        ...state.testsExistsPW,
        { id: testId },
      ],
    })),
}));