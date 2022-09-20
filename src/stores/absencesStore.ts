import { useEffect, useState } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Absence } from '../models/Absence';
import { Room } from '../models/Room';

export type AbsenceState = {
  absences: Absence[];
  addAbsence: (absence: Absence) => void;
  removeAbsence: (id: string) => void;
};

export const useAbsencesStore = create<AbsenceState>()(
  persist(
    (set) => ({
      absences: [],
      addAbsence: (absence) =>
        set((state) => ({ absences: [...state.absences, absence] })),
      removeAbsence: (id) =>
        set((state) => ({
          absences: state.absences.filter((u) => u.id !== id),
        })),
    }),
    { name: 'roomsStorage' }
  )
);

export const usePersistentAbsences = () => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const persistentAbsences = useAbsencesStore((state) => state.absences);

  useEffect(() => {
    setAbsences(persistentAbsences);
  }, [persistentAbsences]);

  return absences;
};
