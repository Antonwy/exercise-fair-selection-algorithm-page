import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { usePersistentAbsences } from '../stores/absencesStore';
import { useCalcluateUser } from '../stores/calculateUserStore';
import { usePersistentCleanings } from '../stores/cleaningsStore';
import { usePersistentRooms } from '../stores/roomsStore';
import { useCleaningSettings } from '../stores/settingsStore';
import { usePersistentUsers, useUsersStore } from '../stores/usersStore';

const CalculateCleaningUser = () => {
  const { showUser, closeDialog, calculateUser, users } = useCalcluateUser();
  const persUsers = usePersistentUsers();
  const cleanings = usePersistentCleanings();
  const rooms = usePersistentRooms();
  const absences = usePersistentAbsences();
  const settings = useCleaningSettings();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() =>
          calculateUser(persUsers, rooms, cleanings, absences, settings)
        }
      >
        Calculate Cleaning User
      </Button>
      <Dialog open={showUser} onClose={closeDialog}>
        <DialogTitle>Cleaning users:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {users.length === 0 ? 'No users found' : users.join(', ')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalculateCleaningUser;
