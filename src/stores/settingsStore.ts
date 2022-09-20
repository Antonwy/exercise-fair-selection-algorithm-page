import { useEffect, useState } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsState = {
  cleaningPeriod: number;
  setCleaningPeriod: (period: number) => void;
};

export type CleaningSettings = {
  cleaningPeriod: number;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      cleaningPeriod: 10,
      setCleaningPeriod: (period) => set({ cleaningPeriod: period }),
    }),
    { name: 'settingsStorage' }
  )
);

export const useCleaningSettings = () => {
  const [settings, setCleaningSettings] = useState<CleaningSettings>({
    cleaningPeriod: 0,
  });
  const period = useSettingsStore((state) => state.cleaningPeriod);

  useEffect(() => {
    setCleaningSettings({ cleaningPeriod: period });
  }, [period]);

  return settings;
};
