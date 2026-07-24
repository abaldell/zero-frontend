
import { create } from 'zustand';

interface NavStore {
  open: boolean,
  openDrawer: boolean

  setOpenNav: (executions: any) => void;
  setOpenDrawer: (executions: any) => void;
  reset: ()=> void
}

export const useNavStore = create<NavStore>(set => ({
  open: false,
  openDrawer: false,

  setOpenNav: (status) =>
    set({ open:status }),

  setOpenDrawer: (status) =>
    set({ openDrawer:status }),

  reset: () =>
    set({
        open: false,
        openDrawer: false,
    }),
}));
