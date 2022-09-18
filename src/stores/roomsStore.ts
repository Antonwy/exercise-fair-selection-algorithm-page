import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Room } from '../models/Room';
import { User } from '../models/User';

export type RoomsState = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  removeRoom: (id: string) => void;
};

export const useRoomsStore = create<RoomsState>()(
  persist(
    (set) => ({
      rooms: [],
      addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
      removeRoom: (id) =>
        set((state) => ({ rooms: state.rooms.filter((u) => u.id !== id) })),
    }),
    { name: 'roomsStorage' }
  )
);
