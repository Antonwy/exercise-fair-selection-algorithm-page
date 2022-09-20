import { SelectChangeEvent } from '@mui/material';
import moment from 'moment';
import { Moment } from 'moment';
import create from 'zustand';
import { Absence } from '../../models/Absence';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { useAbsencesStore } from '../absencesStore';
import { useDialogsStore } from '../dialogsStore';
import { useRoomsStore } from '../roomsStore';
import { useUsersStore } from '../usersStore';

type CreateAbsenceFormError = {
  [key: string]: {
    message: string;
  };
};

type CreateAbsenceState = {
  userId: string;
  from: Moment;
  to: Moment;
  errors: CreateAbsenceFormError;
  createAbsence: () => boolean;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleDateChange: (field: 'from' | 'to', date?: Moment) => void;
  validate: () => CreateAbsenceFormError;
  reset: () => void;
};

const useCreateAbsenceStore = create<CreateAbsenceState>((set, get) => ({
  userId: '',
  from: moment(),
  to: moment().add(10, 'day'),
  errors: {},
  createAbsence: () => {
    const errors = get().validate();

    set({ errors });

    if (Object.keys(errors).length > 0) return false;

    return true;
  },
  handleSelectChange: ({ target: { name, value } }) => set({ [name]: value }),
  handleDateChange: (field, date) => set({ [field]: date }),
  validate: () => {
    let errors: CreateAbsenceFormError = {};

    const { userId, from, to } = get();

    if (!userId) errors.user = { message: 'User is required' };

    if (to.isBefore(from))
      errors.to = { message: 'To date must be after from date' };

    return errors;
  },
  reset: () =>
    set({
      userId: '',
      from: moment(),
      to: moment().add(10, 'day'),
      errors: {},
    }),
}));

export const useShowCreateAbsenceDialog = () => {
  const addAbsence = useAbsencesStore((state) => state.addAbsence);
  const { userId, from, to } = useCreateAbsenceForm();
  const reset = useCreateAbsenceStore((state) => state.reset);

  const { createAbsence, handleDateChange, handleSelectChange, errors } =
    useCreateAbsenceStore(
      ({ createAbsence, handleDateChange, handleSelectChange, errors }) => ({
        createAbsence,
        handleDateChange,
        handleSelectChange,
        errors,
      })
    );

  const { showCreateAbsenceDialog, toggleCreateAbsenceDialog } =
    useDialogsStore(
      ({ showCreateAbsenceDialog, toggleCreateAbsenceDialog }) => ({
        showCreateAbsenceDialog,
        toggleCreateAbsenceDialog,
      })
    );

  const users = useUsersStore((state) => state.users);

  const handleCreateRoom = () => {
    if (!createAbsence()) return;

    const user = users.find((user) => user.id === userId);

    addAbsence(Absence.createAbsence(user!, from, to));
    toggleCreateAbsenceDialog();
    reset();
  };

  return {
    createAbsence: handleCreateRoom,
    showDialog: showCreateAbsenceDialog,
    toggleDialog: toggleCreateAbsenceDialog,
    users,
    handleDateChange,
    handleSelectChange,
    errors,
    userId,
    from,
    to,
  };
};

export const useCreateAbsenceForm = () =>
  useCreateAbsenceStore(
    ({ userId, from, to, handleSelectChange, handleDateChange }) => ({
      userId,
      from,
      to,
      handleSelectChange,
      handleDateChange,
    })
  );

export const useFormErrors = () =>
  useCreateAbsenceStore(({ errors }) => ({ errors }));
