import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useCalcluateUser } from '../stores/calculateUserStore';
import { useUsersStore } from '../stores/usersStore';

const CalculateCleaningUser = () => {
  const { showUser, closeDialog, calculateUser, user } = useCalcluateUser();
  const users = useUsersStore((state) => state.users);

  return (
    <div>
      <Button variant="contained" onClick={() => calculateUser(users)}>
        Calculate Cleaning User
      </Button>
      <Dialog open={showUser} onClose={closeDialog}>
        <DialogTitle>Cleaning user:</DialogTitle>
        <DialogContent>
          <DialogContentText>{user?.name ?? 'No user found'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalculateCleaningUser;
