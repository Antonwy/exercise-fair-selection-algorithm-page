import { SelectChangeEvent } from '@mui/material';
import moment, { Moment } from 'moment';
import create from 'zustand';
import { Cleaning } from '../../models/Cleaning';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { useCleaningsStore } from '../cleaningsStore';
import { useDialogsStore } from '../dialogsStore';
import { useRoomsStore } from '../roomsStore';
import { useUsersStore } from '../usersStore';

type CreateCleaningFormError = {
  [key: string]: {
    message: string;
  };
};

type CreateCleaningState = {
  roomId?: string;
  userId?: string;
  date: Moment;
  errors: CreateCleaningFormError;
  createCleaning: () => boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date?: Moment) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  validate: () => CreateCleaningFormError;
  reset: () => void;
};

const useCreateCleaningStore = create<CreateCleaningState>((set, get) => ({
  userId: '',
  roomId: '',
  date: moment(),
  errors: {},
  createCleaning: () => {
    const errors = get().validate();

    set({ errors });

    if (Object.keys(errors).length > 0) return false;

    return true;
  },
  handleInputChange: (e) => {
    const { id, value } = e.target;

    console.log(id);

    set({ [id]: value });
  },
  handleDateChange: (date) => set({ date }),
  handleSelectChange: ({ target: { name, value } }) => set({ [name]: value }),
  validate: () => {
    let errors: CreateCleaningFormError = {};

    const { userId, roomId, date } = get();

    if (!userId) errors.user = { message: 'User is required' };
    if (!roomId) errors.room = { message: 'Room is required' };
    if (!date) errors.date = { message: 'Date is required' };

    return errors;
  },
  reset: () => set({ roomId: '', userId: '', date: moment(), errors: {} }),
}));

export const useShowCreateCleaningDialog = () => {
  const addCleaning = useCleaningsStore((state) => state.addCleaning);

  const store = useCreateCleaningStore();

  const users = useUsersStore((state) => state.users);
  const rooms = useRoomsStore((state) => state.rooms);

  const { showCreateCleaningDialog, toggleCreateCleaningDialog } =
    useDialogsStore(
      ({ showCreateCleaningDialog, toggleCreateCleaningDialog }) => ({
        showCreateCleaningDialog,
        toggleCreateCleaningDialog,
      })
    );

  const handleCreateRoom = () => {
    if (!store.createCleaning()) return;

    const user = users.find((u) => u.id === store.userId);
    const room = rooms.find((r) => r.id === store.roomId);

    addCleaning(Cleaning.createCleaning(room!, user!, store.date));
    toggleCreateCleaningDialog();
    store.reset();
  };

  return {
    ...store,
    createCleaning: handleCreateRoom,
    showDialog: showCreateCleaningDialog,
    toggleDialog: toggleCreateCleaningDialog,
    rooms,
    users,
  };
};
