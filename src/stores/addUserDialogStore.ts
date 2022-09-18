import moment, { Moment } from 'moment';
import create from 'zustand';
import { User } from '../models/User';
import { useUsersStore } from './usersStore';

type AddUserFormError = {
  [key: string]: {
    message: string;
  };
};

type AddUserButtonDialogState = {
  showDialog: boolean;
  name: string;
  lastTimeCleaned?: Moment;
  errors: AddUserFormError;
  openDialog: () => void;
  closeDialog: () => void;
  addUser: () => boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (date?: Moment) => void;
  validate: () => AddUserFormError;
  reset: () => void;
};

const useAddUserButtonDialogStore = create<AddUserButtonDialogState>(
  (set, get) => ({
    showDialog: false,
    name: '',
    lastTimeCleaned: moment(),
    errors: {},
    openDialog: () => set({ showDialog: true }),
    closeDialog: () => set({ showDialog: false }),
    addUser: () => {
      const errors = get().validate();

      set({ errors });

      if (Object.keys(errors).length > 0) return false;

      set({ showDialog: false });
      return true;
    },
    handleInputChange: (e) => {
      const { id, value } = e.target;

      console.log(id);

      set({ [id]: value });
    },
    handleDateChange: (date) => set({ lastTimeCleaned: date }),
    validate: () => {
      let errors: AddUserFormError = {};

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
  })
);

export const useShowDialog = () => {
  const usersStore = useUsersStore((state) => state.addUser);
  const { name, lastTimeCleaned } = useAddUserForm();
  const reset = useAddUserButtonDialogStore((state) => state.reset);

  const { showDialog, openDialog, closeDialog, addUser } =
    useAddUserButtonDialogStore(
      ({ showDialog, openDialog, closeDialog, addUser }) => ({
        showDialog,
        openDialog,
        closeDialog,
        addUser,
      })
    );

  const handleAddUser = () => {
    if (!addUser()) return;

    usersStore(User.createUser(name, lastTimeCleaned));
    reset();
  };

  return { showDialog, openDialog, closeDialog, addUser: handleAddUser };
};

export const useAddUserForm = () =>
  useAddUserButtonDialogStore(
    ({ name, lastTimeCleaned, handleInputChange, handleDateChange }) => ({
      name,
      lastTimeCleaned,
      handleInputChange,
      handleDateChange,
    })
  );

export const useFormErrors = () =>
  useAddUserButtonDialogStore(({ errors }) => ({ errors }));
