import create from 'zustand';
import { Room } from '../../models/Room';
import { useDialogsStore } from '../dialogsStore';
import { useRoomsStore } from '../roomsStore';

type CreateRoomFormError = {
  [key: string]: {
    message: string;
  };
};

type CreateRoomState = {
  name: string;
  errors: CreateRoomFormError;
  createRoom: () => boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => CreateRoomFormError;
  reset: () => void;
};

const useCreateUserStore = create<CreateRoomState>((set, get) => ({
  name: '',
  errors: {},
  createRoom: () => {
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
  validate: () => {
    let errors: CreateRoomFormError = {};

    const { name } = get();

    if (!name) errors.name = { message: 'Name is required' };
    if (name.length > 20) errors.name = { message: 'Name is too long' };

    return errors;
  },
  reset: () => set({ name: '', errors: {} }),
}));

export const useShowCreateRoomDialog = () => {
  const addRoom = useRoomsStore((state) => state.addRoom);
  const { name } = useCreateRoomForm();
  const reset = useCreateUserStore((state) => state.reset);

  const { createRoom } = useCreateUserStore(({ createRoom }) => ({
    createRoom,
  }));

  const { showCreateRoomDialog, toggleCreateRoomDialog } = useDialogsStore(
    ({ showCreateRoomDialog, toggleCreateRoomDialog }) => ({
      showCreateRoomDialog,
      toggleCreateRoomDialog,
    })
  );

  const handleCreateRoom = () => {
    if (!createRoom()) return;

    addRoom(Room.createRoom(name));
    toggleCreateRoomDialog();
    reset();
  };

  return {
    createRoom: handleCreateRoom,
    showDialog: showCreateRoomDialog,
    toggleDialog: toggleCreateRoomDialog,
  };
};

export const useCreateRoomForm = () =>
  useCreateUserStore(({ name, handleInputChange }) => ({
    name,
    handleInputChange,
  }));

export const useFormErrors = () =>
  useCreateUserStore(({ errors }) => ({ errors }));
