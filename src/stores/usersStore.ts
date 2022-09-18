import create from 'zustand';
import { User } from '../models/User';

export type UsersState = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (id) =>
    set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
}));
