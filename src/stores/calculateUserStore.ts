import create from 'zustand';
import { calculateCleaningUser } from '../helpers/calculateCleaningUser';
import { User } from '../models/User';

type CalculateUserState = {
  user?: User;
  showUser: boolean;
  calculateUser: (users: User[]) => void;
  closeDialog: () => void;
};

export const useCalculateUserStore = create<CalculateUserState>((set) => ({
  showUser: false,
  calculateUser: (users) =>
    set({ user: calculateCleaningUser(users), showUser: true }),
  closeDialog: () => set({ showUser: false }),
}));

export const useCalcluateUser = () =>
  useCalculateUserStore(({ showUser, calculateUser, user, closeDialog }) => ({
    showUser,
    calculateUser,
    user,
    closeDialog,
  }));
