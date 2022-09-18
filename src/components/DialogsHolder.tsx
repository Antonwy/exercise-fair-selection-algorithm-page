import { CreateCleaningDialog } from './dialogs/CreateCleaningDialog';
import { CreateRoomDialog } from './dialogs/CreateRoomDialog';
import { CreateUserDialog } from './dialogs/CreateUserDialog';

export const DialogsHolder = () => {
  return (
    <div>
      <CreateUserDialog />
      <CreateRoomDialog />
      <CreateCleaningDialog />
    </div>
  );
};
