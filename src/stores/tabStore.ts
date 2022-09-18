import create from 'zustand';

type TabState = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
};

export const useTabStore = create<TabState>((set) => ({
  activeTab: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
