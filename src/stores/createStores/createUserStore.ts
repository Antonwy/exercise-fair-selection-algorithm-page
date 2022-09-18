import moment, { Moment } from 'moment';
import create from 'zustand';
import { User } from '../../models/User';
import { useDialogsStore } from '../dialogsStore';
import { useUsersStore } from '../usersStore';

type CreateUserFormError = {
  [key: string]: {
    message: string;
  };
};

type CreateUserState = {
  name: string;
  lastTimeCleaned?: Moment;
  errors: CreateUserFormError;
  createUser: () => boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date?: Moment) => void;
  validate: () => CreateUserFormError;
  reset: () => void;
};

const useCreateUserStore = create<CreateUserState>((set, get) => ({
  name: '',
  lastTimeCleaned: moment(),
  errors: {},
  createUser: () => {
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
  handleDateChange: (date) => set({ lastTimeCleaned: date }),
  validate: () => {
    let errors: CreateUserFormError = {};

    const { name, lastTimeCleaned } = get();

    if (!name) errors.name = { message: 'Name is required' };
    if (name.length > 20) errors.name = { message: 'Name is too long' };

    if (!lastTimeCleaned)
      errors.lastTimeCleaned = { message: 'Last time cleaned is required' };
    if (lastTimeCleaned!.isAfter(moment()))
      errors.lastTimeCleaned = {
        message: 'Last time cleaned must be in the past or today',
      };

    return errors;
  },
  reset: () => set({ name: '', lastTimeCleaned: moment(), errors: {} }),
}));

export const useShowCreateUserDialog = () => {
  const usersStore = useUsersStore((state) => state.addUser);
  const { name, lastTimeCleaned } = useAddUserForm();
  const reset = useCreateUserStore((state) => state.reset);

  const { createUser } = useCreateUserStore(({ createUser }) => ({
    createUser,
  }));

  const { showCreateUserDialog, toggleCreateUserDialog } = useDialogsStore(
    ({ showCreateUserDialog, toggleCreateUserDialog }) => ({
      showCreateUserDialog,
      toggleCreateUserDialog,
    })
  );

  const handleAddUser = () => {
    if (!createUser()) return;

    usersStore(User.createUser(name, lastTimeCleaned));
    toggleCreateUserDialog();
    reset();
  };

  return {
    createUser: handleAddUser,
    showDialog: showCreateUserDialog,
    toggleDialog: toggleCreateUserDialog,
  };
};

export const useAddUserForm = () =>
  useCreateUserStore(
    ({ name, lastTimeCleaned, handleInputChange, handleDateChange }) => ({
      name,
      lastTimeCleaned,
      handleInputChange,
      handleDateChange,
    })
  );

export const useFormErrors = () =>
  useCreateUserStore(({ errors }) => ({ errors }));
