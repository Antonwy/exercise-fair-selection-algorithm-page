import create from 'zustand';
import { calculateCleaningUsers } from '../helpers/calculateCleaningUser';
import { Absence } from '../models/Absence';
import { Cleaning } from '../models/Cleaning';
import { Room } from '../models/Room';
import { User } from '../models/User';
import { CleaningSettings } from './settingsStore';

type CalculateUserState = {
  users: User[];
  showUser: boolean;
  calculateUser: (
    users: User[],
    rooms: Room[],
    cleanings: Cleaning[],
    absences: Absence[],
    settings: CleaningSettings
  ) => void;
  closeDialog: () => void;
};

export const useCalculateUserStore = create<CalculateUserState>((set) => ({
  showUser: false,
  users: [],
  calculateUser: (users, rooms, cleanings, absences, settings) =>
    set({
      users: calculateCleaningUsers(
        users,
        rooms,
        cleanings,
        absences,
        settings
      ),
      showUser: true,
    }),
  closeDialog: () => set({ showUser: false }),
}));

export const useCalcluateUser = () =>
  useCalculateUserStore(({ showUser, calculateUser, users, closeDialog }) => ({
    showUser,
    calculateUser,
    users,
    closeDialog,
  }));
