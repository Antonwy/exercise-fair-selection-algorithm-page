import create from 'zustand';

type ModalsState = {
  showCreateUserDialog: boolean;
  showCreateCleaningDialog: boolean;
  showCreateRoomDialog: boolean;
  showCreateAbsenceDialog: boolean;
  showCalculationResultDialog: boolean;
  toggleCreateUserDialog: () => void;
  toggleCreateCleaningDialog: () => void;
  toggleCreateRoomDialog: () => void;
  toggleCreateAbsenceDialog: () => void;
  toggleCalculationResultDialog: () => void;
};

export const useDialogsStore = create<ModalsState>((set) => ({
  showCreateUserDialog: false,
  showCreateCleaningDialog: false,
  showCreateRoomDialog: false,
  showCreateAbsenceDialog: false,
  showCalculationResultDialog: false,
  toggleCreateUserDialog: () =>
    set((state) => ({ showCreateUserDialog: !state.showCreateUserDialog })),
  toggleCreateCleaningDialog: () => {
    set((state) => ({
      showCreateCleaningDialog: !state.showCreateCleaningDialog,
    }));
  },
  toggleCreateRoomDialog: () => {
    set((state) => ({ showCreateRoomDialog: !state.showCreateRoomDialog }));
  },
  toggleCreateAbsenceDialog: () => {
    set((state) => ({
      showCreateAbsenceDialog: !state.showCreateAbsenceDialog,
    }));
  },
  toggleCalculationResultDialog: () => {
    set((state) => ({
      showCalculationResultDialog: !state.showCalculationResultDialog,
    }));
  },
}));
