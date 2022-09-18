import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Cleaning } from '../models/Cleaning';

export type CleaningsState = {
  cleanings: Cleaning[];
  addCleaning: (cleaning: Cleaning) => void;
  removeCleaning: (id: string) => void;
};

export const useCleaningsStore = create<CleaningsState>()(
  persist(
    (set) => ({
      cleanings: [],
      addCleaning: (cleaning) =>
        set((state) => ({ cleanings: [...state.cleanings, cleaning] })),
      removeCleaning: (id) =>
        set((state) => ({
          cleanings: state.cleanings.filter((c) => c.id !== id),
        })),
    }),
    { name: 'cleaningsStorage' }
  )
);
